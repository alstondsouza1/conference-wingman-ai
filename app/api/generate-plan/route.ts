type RequestBody = {
    name: string;
    goal: string;
    skills: string;
    resume: string;
    comfort: string;
    sponsors: string[];
  };
  
  const sponsorNotes: Record<string, string> = {
    AWS: "cloud infrastructure, AI services, and scalable backend systems",
    Pulumi: "infrastructure as code, cloud engineering, and developer platforms",
    Elastic: "search, observability, logs, and data-heavy products",
    Render: "cloud hosting, backend deployment, and developer experience",
    Expo: "React Native, mobile apps, and cross-platform development",
    Vapi: "voice AI, conversational agents, and real-time AI products",
    Apify: "web automation, scraping, agents, and real-time web data",
    CopilotKit: "AI features inside real applications",
    Auth0: "identity, authentication, and app security",
    Cloudflare: "performance, web infrastructure, edge computing, and security",
    Uber: "large-scale systems and product engineering",
    Warp: "developer tools, terminals, and AI-assisted workflows",
    Box: "content storage, file workflows, collaboration, and Box AI",
  };
  
  async function getApifySponsorResearch(goal: string, skills: string) {
    const token = process.env.APIFY_TOKEN;
  
    if (!token) {
      return [
        "Apify token not configured yet. Using built-in CascadiaJS sponsor notes for the local demo.",
      ];
    }
  
    try {
      const actorId = "apify~rag-web-browser";
  
      const input = {
        query: `CascadiaJS 2026 sponsors AWS Pulumi Elastic Render Expo Vapi Apify CopilotKit Auth0 Cloudflare Uber Warp Box. Find short useful notes for a student interested in ${goal} with skills ${skills}.`,
        maxResults: 5,
      };
  
      const response = await fetch(
        `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
  
      if (!response.ok) {
        return [
          "Apify research was attempted, but the actor response was not available during this run. The app used local sponsor notes instead.",
        ];
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        return [
          "Apify research returned no items for this run. The app used local sponsor notes instead.",
        ];
      }
  
      return data
        .slice(0, 5)
        .map((item: Record<string, unknown>, index: number) => {
          const text =
            String(item.text || item.content || item.markdown || item.title || "")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 260) || "No readable summary returned.";
  
          return `${index + 1}. ${text}`;
        });
    } catch {
      return [
        "Apify research could not complete during this run. The app used local sponsor notes instead.",
      ];
    }
  }
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
  
    const attendeeName = body.name || "Conference attendee";
    const goal =
      body.goal || "software engineering internship or early-career tech role";
    const skills = body.skills || "web development, AI tools, and software projects";
    const comfort = body.comfort || "still getting comfortable with networking";
    const resume = body.resume || "No extra resume background was added.";
  
    const selectedCompanies = (body.sponsors || []).slice(0, 7);
    const apifyResearch = await getApifySponsorResearch(goal, skills);
  
    const plan = `
  ConferenceWingman Brief
  
  For: ${attendeeName}
  Goal: ${goal}
  Skills to highlight: ${skills}
  Networking comfort: ${comfort}
  
  How this brief was built
  
  - Sponsor list: CascadiaJS 2026 sponsor data
  - Research layer: Apify web research / actor workflow
  - Storage layer: Box download workflow for saving and updating the brief
  
  Apify research notes
  
  ${apifyResearch.join("\n")}
  
  Before walking into the venue
  
  Pick 3 companies first. Do not try to talk to everyone. Have one normal conversation, ask one useful question, and write down one follow-up note before moving on.
  
  Best booths to start with
  
  ${selectedCompanies
    .map((company, index) => {
      const note = sponsorNotes[company] || "modern software and developer tools";
  
      return `${index + 1}. ${company}
  
  Why this booth is worth visiting:
  ${company} connects with ${note}. This gives you a natural reason to ask about engineering work, student opportunities, and what skills matter.
  
  Easy opener:
  "Hi, I’m ${attendeeName}. I’m a student interested in ${goal}. I’ve been working with ${skills}. I’m trying to learn what teams like yours look for in early-career developers. Could I ask you one quick question?"
  
  Good questions:
  - What kind of work do interns or junior developers usually help with?
  - What skill would make a student stand out to your team?
  - What project would you recommend building to learn this area better?
  
  After the conversation, write this down:
  Person I met:
  Company:
  Best advice they gave:
  Follow-up action:
  `;
    })
    .join("\n")}
  
  One-minute intro
  
  Hi, I’m ${attendeeName}. I’m interested in ${goal}. I’ve been building projects with ${skills}, and I’m here at CascadiaJS to learn from engineers, meet companies, and understand how I can keep growing as a developer.
  
  LinkedIn follow-up
  
  Hi [Name], it was great meeting you at CascadiaJS. I appreciated your advice about [specific topic]. I’m continuing to build my skills in ${skills}, and I’d love to stay connected.
  
  Box workflow
  
  Download this brief and save it in Box. After each conversation, update the file with names, notes, and follow-up tasks.
  
  Background notes
  
  ${resume}
  `;
  
    return Response.json({ plan });
  }