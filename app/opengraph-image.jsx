import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { themeBackgrounds } from '../components/themeConstants'

/**
 * Link preview image (Open Graph) shown when the site is shared on LinkedIn,
 * Slack, iMessage, etc. Rendered to a static PNG at build time.
 */
export const dynamic = 'force-static'
export const alt = 'Calvin Le - Software engineer and technical educator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const photo = await readFile(path.join(process.cwd(), 'assets/photos/photo-light.jpg'))
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '0 96px',
          backgroundColor: themeBackgrounds.dark,
          backgroundImage: 'linear-gradient(135deg, rgba(144, 202, 249, 0.12) 0%, rgba(206, 147, 216, 0.18) 100%)',
          color: '#E3F2FD',
        }}
      >
        <img
          src={photoSrc}
          width={320}
          height={320}
          style={{ borderRadius: '50%', objectFit: 'cover', border: '6px solid #90CAF9' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, #90CAF9 0%, #CE93D8 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Calvin Le
          </div>
          <div style={{ fontSize: 36, marginTop: 20, lineHeight: 1.3 }}>
            Software engineer and technical educator
          </div>
          <div style={{ fontSize: 28, marginTop: 16, color: '#B0BEC5', lineHeight: 1.3 }}>
            Educator, engineer, powerlifter, and tinkerer of all kinds.
          </div>
          <div style={{ fontSize: 28, marginTop: 40, color: '#90CAF9' }}>
            calvinle.io
          </div>
        </div>
      </div>
    ),
    size
  )
}
