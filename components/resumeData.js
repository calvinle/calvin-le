/**
 * Resume content, kept separate from layout so it's easy to update.
 * Source: CalvinLe_Resume.docx. Phone number intentionally omitted from the public site.
 */
export const resume = {
  name: 'Calvin Le',
  headline: ['Software Engineer', 'Full-Stack', 'Cloud-Native (GCP)', 'Engineering Enablement'],
  contact: [
    { label: 'calvinle0@proton.me', href: 'mailto:calvinle0@proton.me' },
    { label: 'linkedin.com/in/calvinle97', href: 'https://www.linkedin.com/in/calvinle97' },
    { label: 'calvinle.io', href: 'https://calvinle.io' },
  ],
  summary:
    'Software Engineer with 7+ years of experience building full-stack and cloud-native applications in Java, TypeScript/JavaScript, Python, and Go. Delivered microservices on Google Cloud Platform (Cloud Run, Pub/Sub, Cloud Tasks), CI/CD pipelines, and observability tooling in Agile teams at Oracle Health and The Home Depot. Raises team output through code review, testing standards, and mentorship: taught 50+ junior engineers at Oracle Health and mentored 10 engineers over four years at The Home Depot, 100% of whom received full-time offers.',
  skills: [
    { category: 'Languages', items: 'Java, JavaScript, TypeScript, Python, Go, Ruby, SQL, HTML/CSS' },
    { category: 'Frameworks & Testing', items: 'React, Spring Boot, Ruby on Rails, Pydantic, JUnit, Jest, pytest, RSpec, Ruff' },
    { category: 'Cloud & DevOps', items: 'Amazon Web Services (Lambda, API Gateway, Bedrock, IAM, SSM Parameter Store, CloudWatch), AWS SAM, Google Cloud Platform (Cloud Run, Pub/Sub, Cloud Tasks, Workflows), Firebase, Docker, GitHub Actions, Jenkins, CI/CD' },
    { category: 'Practices', items: 'Microservices, serverless architecture, event-driven architecture, REST API design and integration, schema validation, test-driven development, code review, Agile/Scrum, observability, version control (GitHub)' },
    { category: 'AI Engineering', items: 'Amazon Bedrock (structured outputs), prompt engineering, GitHub Copilot, Glean' },
    { category: 'Enablement & Leadership', items: 'Mentorship, technical instruction, onboarding, curriculum design, cross-functional collaboration' },
  ],
  experience: [
    {
      company: 'Snippet Sentry',
      location: 'Kansas City, MO (Remote)',
      roles: [
        {
          title: 'Software Engineer',
          dates: 'April 2026 - July 2026',
          bullets: [
            'Extended the compliance archiving platform to Signal, joining the existing WhatsApp, iMessage, and SMS integrations, so customers could meet audit and regulatory recordkeeping requirements, by capturing 10+ message types and activities, including replies, edits, quotes, media, reactions, deletions, and read receipts.',
            'Delivered consistent identity resolution and audit-trail completeness across supported channels by building TypeScript decryption and synchronization logic that retrieves Signal contacts and group-conversation metadata through the Signal API, pulling additional contact data whenever a profile key was available (after a user messaged or accepted a group invite).',
          ],
        },
      ],
    },
    {
      company: 'The Home Depot',
      location: 'Atlanta, GA (Remote)',
      roles: [
        {
          title: 'Software Engineer II, OrangeMethod Talent Pipeline',
          dates: 'July 2023 - January 2026',
          bullets: [
            'Informed the design of a unified, platform-wide observability dashboard for monitoring and alerting by evaluating testing environments and code-health tooling with 10+ cross-functional engineering teams, including SAP Retail/ERP, Orange Access, and Sidekick.',
            'Improved code quality and maintainability of full-stack Java and JavaScript curriculum codebases by refactoring and modernizing them to current engineering standards.',
            'Piloted GenAI-assisted engineering practices by authoring prompt engineering guides for unit testing and technical auditing workflows and delivering them in workshops to 5+ engineering teams.',
            'Standardized quality evaluation across 5 engineering cohorts by authoring technical assessment rubrics and structured code review criteria for Java, Go, Python, and JavaScript, aligned to industry and internal standards.',
            'Ramped new engineering hires on platform standards, engineering culture, and collaboration tooling by designing and delivering 5 two-day technical onboarding programs.',
            'Streamlined onboarding for junior engineers, leading managers to request team placements from later cohorts, by curating technology-stack-specific learning content.',
            'Mentored 10 engineers across both Software Engineer roles over four years (2-3 per cohort) on technical and collaborative best practices, with 100% receiving full-time offers.',
          ],
        },
        {
          title: 'Software Engineer I, OrangeMethod Talent Pipeline',
          dates: 'November 2021 - July 2023',
          bullets: [
            'Built a full-stack proof-of-concept application implementing CRUD operations, DOM event handling, and application state management.',
            'Strengthened software engineering fundamentals and production readiness for 11 engineers-in-training (2 directly mentored) by delivering live technical instruction with hands-on examples and mentoring to close knowledge gaps.',
          ],
        },
      ],
    },
    {
      company: 'Oracle Health',
      location: 'Kansas City, MO',
      roles: [
        {
          title: 'Associate Software Engineer, DevAcademy Instructor',
          dates: 'January 2021 - November 2021',
          bullets: [
            'Advanced production readiness for 50+ junior engineers across 5 cohorts, as their selected instructor, by reviewing pull requests weekly and running paired feedback sessions on code quality and collaboration.',
            'Prepared junior engineers to join production teams by onboarding them to Agile/Scrum methodology and unit testing practices.',
          ],
        },
        {
          title: 'Software Engineer I',
          dates: 'February 2019 - January 2021',
          bullets: [
            'Improved operational observability for DevAcademy staff by engineering Academy Analytics, a metrics dashboard that tracks long-term collaboration-tool usage trends using data from 4 infrastructure services.',
            'Automated weekly data collection for the dashboard by establishing a cron job that fetches data from the 4 infrastructure services and stores it with ActiveRecord (Ruby on Rails).',
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: 'words2macros',
      tech: 'Python, AWS Lambda, API Gateway, Bedrock',
      description:
        'Built a serverless API that turns plain-language meal descriptions into macronutrients, published at github.com/calvinle/words2macros. An LLM parses food items through Bedrock structured outputs while USDA data supplies every nutrient value, and Pydantic models validate each payload that crosses a trust boundary, re-prompting once and returning a 422 rather than letting unvalidated data reach the calculations. Deployed with AWS SAM: arm64 Lambda behind a throttled HTTP API, least-privilege IAM policies, the USDA key in SSM Parameter Store, and CloudWatch log retention; tested with pytest and linted with Ruff.',
    },
    {
      name: 'Smart Fitness Tracker',
      tech: 'TypeScript, Go, GCP',
      description:
        'Built a workout logger and stats aggregator as containerized Cloud Run microservices, using Workflows for orchestration, Pub/Sub for event-driven choreography, and Cloud Tasks for asynchronous processing.',
    },
    {
      name: 'calvinle.io',
      tech: 'Firebase',
      description:
        'Built and deployed a personal portfolio site that retrieves and persists competition data through the ClosePowerlifting API.',
    },
  ],
  education: 'Colorado State University, Bachelor of Computer Science, 2018',
  additional: [
    {
      title: 'Eagle Scout',
      bullets: [
        'Eagle Project - Funded and coordinated $1,100 for construction of local park kiosk, assigning tasks to volunteers and providing tools and instruction',
        '40 Merit Badges earned',
      ],
    },
  ],
}

export const RESUME_PDF_PATH = '/CalvinLe_Resume.pdf'
