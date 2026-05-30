export async function POST(request: Request) {
    const body = await request.json();
  
    const { name, goal, skills, resume, sponsors } = body;
  
    const topCompanies = sponsors.slice(0, 5);
  
    const plan = `
  ConferenceWingman AI Networking Plan
  
  Attendee:
  ${name || "Conference attendee"}
  
  Career Goal:
  ${goal || "Software engineering opportunity"}
  
  Skills:
  ${skills || "Not provided"}
  
  Top Companies to Meet:
  ${topCompanies
    .map(
      (company: string, index: number) =>
        `${index + 1}. ${company}
  Reason: This company connects with your interest in software, AI, web development, or cloud technology.
  Questions to ask:
  - What kinds of early-career opportunities do you offer?
  - What skills do your teams value most in junior developers?
  - How is your team using AI or modern web technologies?`
    )
    .join("\n\n")}
  
  Elevator Pitch:
  Hi, I'm ${name || "a student developer"}. I'm interested in ${
      goal || "software engineering"
    } and have experience with ${skills || "web development and AI"}. I'm attending CascadiaJS to learn, meet engineers, and explore opportunities where I can contribute and grow.
  
  LinkedIn Follow-Up Message:
  Hi, it was great meeting you at CascadiaJS. I enjoyed learning about your work and would love to stay connected. I'm currently exploring software engineering opportunities and continuing to build projects in AI and full-stack development.
  
  Resume Notes:
  ${resume || "No resume text provided."}
  `;
  
    return Response.json({ plan });
  }