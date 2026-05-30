type RequestBody = {
    eventName: string;
    sponsors: string;
    name: string;
    goal: string;
    skills: string;
    resume: string;
    comfort: string;
  };
  
  function cleanText(raw: string) {
    return raw
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\([^)]*\.(png|jpg|jpeg|svg|webp)[^)]*\)/gi, "")
      .replace(/logo/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 250);
  }
  
  async function getApifyResearch(
    eventName: string,
    sponsors: string,
    goal: string,
    skills: string
  ) {
    const token = process.env.APIFY_TOKEN;
  
    if (!token) {
      return [
        "Apify token not configured. Using user-provided sponsor information.",
      ];
    }
  
    try {
      const actorId = "apify~rag-web-browser";
  
      const input = {
        query: `
        Conference: ${eventName}
        Sponsors: ${sponsors}
        Student goal: ${goal}
        Skills: ${skills}
  
        Find useful company context and networking talking points.
        `,
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
          "Apify research unavailable. Using sponsor list provided by user.",
        ];
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        return [
          "Apify research unavailable. Using sponsor list provided by user.",
        ];
      }
  
      return data.slice(0, 5).map((item: any, index: number) => {
        const title =
          item.title ||
          item["Page title"] ||
          "Conference research result";
  
        const url =
          item.url ||
          item["Page URL"] ||
          "";
  
        const note = cleanText(
          item.text ||
            item.content ||
            item.markdown ||
            item.description ||
            ""
        );
  
        return `${index + 1}. ${title}
  ${url ? `Source: ${url}` : ""}
  ${note}`;
      });
    } catch {
      return [
        "Apify research unavailable. Using sponsor list provided by user.",
      ];
    }
  }
  
  function buildCompanies(sponsors: string) {
    return sponsors
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 10);
  }
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
  
    const eventName =
      body.eventName || "Custom Conference";
  
    const sponsors =
      body.sponsors || "Conference Sponsors";
  
    const attendeeName =
      body.name || "Conference Attendee";
  
    const goal =
      body.goal ||
      "Software Engineering Internship";
  
    const skills =
      body.skills ||
      "React, Next.js, Java";
  
    const comfort =
      body.comfort ||
      "I want a plan before networking.";
  
    const resume =
      body.resume ||
      "No additional background provided.";
  
    const companies = buildCompanies(sponsors);
  
    const research = await getApifyResearch(
      eventName,
      sponsors,
      goal,
      skills
    );
  
    const boothGuide = companies
      .map((company, index) => {
        return `
  ${index + 1}. ${company}
  
  Suggested Opener:
  "Hi, I'm ${attendeeName}. I'm attending ${eventName} because I'm interested in ${goal}. Could I ask what technologies your team works with?"
  
  Questions:
  • What skills matter most for early-career candidates?
  • What projects stand out when reviewing resumes?
  • What advice would you give students entering this field?
  
  Notes:
  Person:
  Role:
  Advice:
  Follow-up:
  `;
      })
      .join("\n---------------------------------\n");
  
    const plan = `
  CONFERENCEWINGMAN FIELD GUIDE
  
  Event:
  ${eventName}
  
  Attendee:
  ${attendeeName}
  
  Goal:
  ${goal}
  
  Skills:
  ${skills}
  
  Networking Comfort:
  ${comfort}
  
  ====================================
  
  APIFY RESEARCH
  
  ${research.join("\n\n")}
  
  ====================================
  
  PRIORITY BOOTHS
  
  ${companies.slice(0, 3).map((c) => `• ${c}`).join("\n")}
  
  ====================================
  
  BOOTH GUIDE
  
  ${boothGuide}
  
  ====================================
  
  30 SECOND INTRO
  
  Hi, I'm ${attendeeName}. I'm interested in ${goal}.
  I've been working with ${skills}.
  I'm hoping to learn what skills and projects companies
  value most for students entering the industry.
  
  ====================================
  
  LINKEDIN FOLLOW-UP
  
  Hi [Name],
  
  It was great meeting you at ${eventName}.
  
  I appreciated your advice about [topic].
  
  I'm continuing to develop my skills in ${skills}
  and would love to stay connected.
  
  Thank you!
  
  ====================================
  
  BACKGROUND NOTES
  
  ${resume}
  `;
  
    return Response.json({
      success: true,
      plan,
    });
  }