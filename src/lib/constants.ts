export const LEFT_MARGIN_DEFAULT = 56;
export const RIGHT_MARGIN_DEFAULT = 56;

export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
    <h1>[Your Name]</h1>
    <p><strong>Email:</strong> [Your Email] | <strong>Phone:</strong> [Your Phone Number] | <strong>Location:</strong> [City, State]</p>
    <hr>

    <h2>Professional Summary</h2>
    <p>[Brief summary of your experience, skills, and career goals.]</p>

    <h2>Work Experience</h2>
    <h3>[Job Title] - [Company Name]</h3>
    <p><strong>[Start Date] - [End Date]</strong></p>
    <ul>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
    </ul>

    <h3>[Job Title] - [Company Name]</h3>
    <p><strong>[Start Date] - [End Date]</strong></p>
    <ul>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
    </ul>

    <h2>Education</h2>
    <h3>[Degree] - [University Name]</h3>
    <p><strong>[Graduation Year]</strong></p>

    <h2>Skills</h2>
    <ul>
        <li>[Skill 1]</li>
        <li>[Skill 2]</li>
        <li>[Skill 3]</li>
        <li>[Skill 4]</li>
    </ul>

    <h2>Certifications</h2>
    <ul>
        <li>[Certification Name] - [Issuing Organization] ([Year])</li>
        <li>[Certification Name] - [Issuing Organization] ([Year])</li>
    </ul>

    <h2>Projects</h2>
    <h3>[Project Name]</h3>
    <p>[Brief description of the project, technologies used, and your role.]</p>

    <h2>Languages</h2>
    <ul>
        <li>[Language 1] - [Proficiency Level]</li>
        <li>[Language 2] - [Proficiency Level]</li>
    </ul>

    <h2>References</h2>
    <p>Available upon request.</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Your Email]</p>
    <p>[Your Phone Number]</p>

    <p style="margin-top: 20px;">[Date]</p>

    <p>[Recipient's Name]</p>
    <p>[Recipient's Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: [Letter Subject]</h2>

    <p>Dear [Recipient's Name],</p>

    <p>[Opening paragraph: Introduce the purpose of the letter in a clear and concise manner.]</p>

    <p>[Body paragraphs: Provide relevant details, explanations, or context based on the subject of the letter.]</p>

    <p>[Closing paragraph: Summarize the key points, express gratitude, or mention any next steps.]</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Your Email]</p>
    <p>[Your Phone Number]</p>

    <p style="margin-top: 20px;">[Date]</p>

    <p>[Hiring Manager's Name]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: Application for [Job Title]</h2>

    <p>Dear [Hiring Manager's Name],</p>

    <p>I am excited to apply for the [Job Title] position at [Company Name]. With my background in [Your Relevant Skills/Experience], I am confident that I would be a valuable addition to your team.</p>

    <p>In my previous role at [Previous Company Name], I [describe a key achievement or responsibility relevant to the job]. This experience has provided me with the skills necessary to excel in this role.</p>

    <p>I am particularly drawn to this opportunity because [mention a specific reason related to the company or job role]. I am eager to contribute my expertise in [mention key skill] to help [Company Name] achieve its goals.</p>

    <p>I would welcome the opportunity to discuss how my skills and experience align with your needs. Please feel free to contact me at your earliest convenience to arrange an interview.</p>

    <p>Thank you for your time and consideration. I look forward to hearing from you soon.</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
    <p>[Your Name]</p>
    <p>[Your Position]</p>
    <p>[Your Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>
    
    <p style="margin-top: 20px;">[Date]</p>

    <p>[Recipient's Name]</p>
    <p>[Recipient's Position]</p>
    <p>[Recipient's Company Name]</p>
    <p>[Recipient's Company Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: [Letter Subject]</h2>

    <p>Dear [Recipient's Name],</p>

    <p>[Opening paragraph: Introduce the purpose of the letter clearly and concisely.]</p>

    <p>[Body paragraphs: Provide details, explanations, or supporting information relevant to the purpose of the letter.]</p>

    <p>[Closing paragraph: Summarize the main points and include any next steps or a call to action.]</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    <p>[Your Position]</p>
    <p>[Your Company Name]</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
    <h1>Project Proposal</h1>

    <h2>1. Introduction</h2>
    <p>Provide a brief introduction to the project, including its purpose and key objectives.</p>

    <h2>2. Project Scope</h2>
    <h3>2.1 Goals & Objectives</h3>
    <p>Outline the primary goals and objectives of the project.</p>

    <h3>2.2 Deliverables</h3>
    <p>List the expected deliverables, such as reports, software, or other outcomes.</p>

    <h3>2.3 Project Constraints</h3>
    <p>Define any limitations, constraints, or dependencies that may affect the project.</p>

    <h2>3. Timeline</h2>
    <table border="1">
        <tr>
            <th>Phase</th>
            <th>Estimated Completion</th>
        </tr>
        <tr>
            <td>Planning</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Execution</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Testing & Review</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Final Delivery</td>
            <td>[Date]</td>
        </tr>
    </table>

    <h2>4. Budget & Resources</h2>
    <p>Provide an estimated budget and a list of required resources for the project.</p>

    <h2>5. Risks & Mitigation</h2>
    <p>Identify potential risks and outline strategies to mitigate them.</p>

    <h2>6. Conclusion</h2>
    <p>Summarize the proposal and highlight the next steps.</p>

    <h2>7. Approval</h2>
    <p>Provide space for approval signatures.</p>

    <hr>

    <p><strong>Project Sponsor:</strong></p>
    <p><strong>Signature:</strong></p>
    <p><strong>Date:</strong></p>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
    <h1>Software Development Proposal</h1>

    <h2>1. Project Overview</h2>
    <p>Provide a brief description of the software project, including objectives and expected outcomes.</p>

    <h2>2. Scope of Work</h2>

    <h3>2.1 Features & Functionality</h3>
    <p>List key features and functionalities that will be included in the software.</p>

    <h3>2.2 Technology Stack</h3>
    <p>Mention the technologies, frameworks, and tools that will be used.</p>

    <h3>2.3 Deliverables</h3>
    <p>Outline the expected deliverables, such as documentation, source code, and deployment instructions.</p>

    <h2>3. Project Timeline</h2>
    <table border="1">
        <tr>
            <th>Milestone</th>
            <th>Estimated Completion</th>
        </tr>
        <tr>
            <td>Requirement Analysis</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Design & Prototyping</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Development Phase 1</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Testing & QA</td>
            <td>[Date]</td>
        </tr>
        <tr>
            <td>Deployment</td>
            <td>[Date]</td>
        </tr>
    </table>

    <h2>4. Cost Estimate</h2>
    <p>Provide a breakdown of estimated costs, including development, testing, and maintenance.</p>

    <h2>5. Terms & Conditions</h2>
    <p>Outline payment terms, project scope limitations, and other contractual details.</p>

    <h2>6. Acceptance</h2>
    <p>Provide space for the client's signature to confirm agreement.</p>

    <hr>

    <p><strong>Client Name:</strong></p>
    <p><strong>Signature:</strong></p>
    <p><strong>Date:</strong></p>
    `,
  },
];
