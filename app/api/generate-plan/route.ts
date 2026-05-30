type RequestBody = {
    name: string;
    goal: string;
    skills: string;
    resume: string;
    sponsors: string[];
  };
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
  
    const { name, goal, skills, resume, sponsors } = body;
  
    const selectedCompanies = sponsors.slice(0, 6);
  
    const plan = `
  CONFERENCEWINGMAN AI PLAN
  
  Attendee
  ${name || "Conference attendee"}
  
  Career Goal
  ${goal || "Software engineering internship or early-career tech opportunity"}
  
  Skills
  ${skills || "No skills provided"}
  
  Best Companies to Meet
  
  ${selectedCompanies
    .map(
      (company, index) =>
        `${index + 1}. ${company}
  
  Why this is a good match:
  This sponsor connects with your interest in software engineering, AI, web development, developer tools, or cloud technology.
  
  Questions to ask:
  - What kinds of early-career or internship opportunities does your team offer?
  - What technical skills would make a student stand out to your company?
  - How is your team using AI, automation, or modern web technologies?
  - What advice would you give someone trying to break into this area?
  
  Conversation starter:
  Hi, I’m ${name || "a student developer"}. I’m interested in ${
          goal || "software engineering"
        } and I’m learning how companies like ${company} build real-world products. I’d love to hear what your team works on and what skills you recommend students focus on.`
    )
    .join("\n\n")}
  
  One-Minute Elevator Pitch
  
  Hi, I’m ${name || "a student developer"}. I’m interested in ${
      goal || "software engineering"
    } and have experience with ${
      skills || "web development, software projects, and AI tools"
    }. I’m attending CascadiaJS to learn from engineers, connect with companies, and find ways to grow as a developer.
  
  LinkedIn Follow-Up Message
  
  Hi, it was great meeting you at CascadiaJS. I enjoyed learning about your work and your advice for early-career developers. I’d love to stay connected and keep learning from your experience.
  
  Box Storage Note
  
  This plan can be downloaded and saved into Box as the attendee’s personal conference networking file.
  
  Resume / Background Used
  
  ${resume || "No resume text provided."}
  `;
  
    return Response.json({ plan });
  }