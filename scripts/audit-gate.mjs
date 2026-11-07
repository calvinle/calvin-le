/**
 * Security gate: fails if shipped (non-dev) dependencies have any high or critical
 * advisory that isn't explicitly accepted in security/audit-allowlist.json.
 *
 * Usage:  node scripts/audit-gate.mjs <project-name> [directory]
 *   e.g.  node scripts/audit-gate.mjs website .
 *         node scripts/audit-gate.mjs functions functions
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const [project, directory = '.'] = process.argv.slice(2)
if (!project) {
  console.error('Usage: node scripts/audit-gate.mjs <project-name> [directory]')
  process.exit(2)
}

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const allowlist = JSON.parse(fs.readFileSync(path.join(repoRoot, 'security', 'audit-allowlist.json'), 'utf8'))
const accepted = new Set(
  allowlist.advisories.filter((a) => a.project === project).map((a) => `${a.package}|${a.id}`)
)

// npm audit exits non-zero when it finds anything, so read its output either way
let output
try {
  output = execFileSync('npm', ['audit', '--omit=dev', '--json'], { cwd: directory, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })
} catch (error) {
  output = error.stdout
}
const report = JSON.parse(output)
if (report.error) {
  console.error(`npm audit failed: ${report.error.summary || JSON.stringify(report.error)}`)
  process.exit(2)
}

const blocking = []
const allowed = []
const usedAllowlistEntries = new Set()
for (const [name, vulnerability] of Object.entries(report.vulnerabilities || {})) {
  for (const via of vulnerability.via) {
    if (typeof via !== 'object' || !['high', 'critical'].includes(via.severity)) continue
    const id = via.url.split('/').pop()
    const key = `${name}|${id}`
    const line = `${via.severity.toUpperCase()} ${name} ${id}: ${via.title}`
    if (accepted.has(key)) {
      allowed.push(line)
      usedAllowlistEntries.add(key)
    } else {
      blocking.push(line)
    }
  }
}

const stale = [...accepted].filter((key) => !usedAllowlistEntries.has(key))

console.log(`Security audit gate: ${project} (${directory})`)
allowed.forEach((line) => console.log(`  accepted  ${line}`))
stale.forEach((key) => console.log(`  note      allowlist entry no longer needed, please remove: ${key}`))

if (blocking.length) {
  blocking.forEach((line) => console.log(`  BLOCKING  ${line}`))
  console.log(`\n${blocking.length} high/critical advisory(ies) in shipped dependencies.`)
  console.log('Fix by upgrading (npm audit fix, or a major upgrade), or, only if unreachable,')
  console.log('add a reviewed entry with a reason to security/audit-allowlist.json.')
  process.exit(1)
}
console.log('  OK: no unaccepted high/critical advisories in shipped dependencies.')
