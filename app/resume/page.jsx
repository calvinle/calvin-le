import { existsSync } from 'node:fs'
import path from 'node:path'
import Resume from '../../components/Resume'
import { RESUME_PDF_PATH } from '../../components/resumeData'

export const metadata = {
  title: 'Resume',
  description: "Resume of Calvin Le: software engineer with 7+ years of full-stack and cloud-native experience, and a track record of mentoring engineers.",
}

export default function ResumePage() {
  // Checked at build time: the download button only appears once the PDF is in public/
  const hasPdf = existsSync(path.join(process.cwd(), 'public', RESUME_PDF_PATH))
  return <Resume hasPdf={hasPdf} />
}
