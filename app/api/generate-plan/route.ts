type RequestBody = {
    name: string;
    goal: string;
    skills: string;
    resume: string;
    comfort: string;
    sponsors: string[];
  };
  
  const sponsorNotes: Record<
    string,
    {
      focus: string;
      reason: string;
      opener: string;
      questions: string[];
      projectIdea: string;
    }
  > = {
    AWS: {
      focus: "cloud systems, AI services, backend infrastructure",
      reason:
        "AWS is a strong stop if you want to understand how real apps scale and how AI products are deployed.",
      opener:
        "I’m learning full-stack development and AI tools. What is a small AWS project that would show I understand cloud basics?",
      questions: [
        "What AWS service should a student learn first if they want to build AI-backed apps?",
        "What makes an early-career cloud project look realistic instead of just tutorial-based?",
        "How do teams decide when to use serverless versus a traditional backend?",
      ],
      projectIdea:
        "Build a small app that uploads notes, summarizes them, and stores results using AWS services.",
    },
  
    Pulumi: {
      focus: "infrastructure as code, cloud engineering, developer platforms",
      reason:
        "Pulumi is useful if you want to talk about how teams manage cloud infrastructure without doing everything manually.",
      opener:
        "I’ve deployed apps before, but I’m new to infrastructure as code. How should a student start learning it without getting overwhelmed?",
      questions: [
        "What is a beginner-friendly infrastructure-as-code project?",
        "What mistakes do new developers make when deploying cloud apps?",
        "How much cloud knowledge should a junior developer have before learning Pulumi?",
      ],
      projectIdea:
        "Create a one-command deployment setup for a simple Next.js or Node app.",
    },
  
    Elastic: {
      focus: "search, observability, logs, analytics",
      reason:
        "Elastic is worth visiting if you want to learn how teams debug, search, and understand large systems.",
      opener:
        "I’ve built apps, but I’m still learning how teams monitor them after deployment. What should I learn first?",
      questions: [
        "What logs or metrics should every beginner backend project track?",
        "How can a student show observability skills in a portfolio project?",
        "What is the difference between search and observability from an engineering point of view?",
      ],
      projectIdea:
        "Add searchable logs or analytics to a project dashboard.",
    },
  
    Render: {
      focus: "hosting, deployment, backend services, developer experience",
      reason:
        "Render is useful if you want to talk about shipping projects and making deployed apps reliable.",
      opener:
        "I’m trying to make my portfolio projects feel more production-ready. What should I improve after deploying an app?",
      questions: [
        "What makes a deployed student project stand out?",
        "What deployment mistakes do beginners usually make?",
        "How should I explain deployment work on my resume?",
      ],
      projectIdea:
        "Deploy a full-stack app with environment variables, API routes, and a clean README.",
    },
  
    Expo: {
      focus: "React Native, mobile apps, cross-platform development",
      reason:
        "Expo is a strong match if you already know React and want to branch into mobile apps.",
      opener:
        "I know React and Next.js. What changes when moving from web apps to mobile apps with Expo?",
      questions: [
        "What is a good first Expo project for someone with React experience?",
        "What mobile development concepts surprise web developers the most?",
        "How can I make a React Native project look polished enough for a portfolio?",
      ],
      projectIdea:
        "Turn ConferenceWingman into a mobile conference companion app.",
    },
  
    Vapi: {
      focus: "voice AI, conversational agents, real-time AI",
      reason:
        "Vapi is useful if you want to understand voice agents and real-time AI product design.",
      opener:
        "I’ve seen chat-based AI apps, but voice AI feels different. What makes a good voice agent actually useful?",
      questions: [
        "What is harder about voice AI compared to chat AI?",
        "How do teams test whether a voice agent is giving a good user experience?",
        "What is a simple voice AI project a student could build in a weekend?",
      ],
      projectIdea:
        "Add a voice-based practice mode where students rehearse networking conversations.",
    },
  
    Apify: {
      focus: "web automation, scraping, data collection, agents",
      reason:
        "Apify is central to this project because it helps gather sponsor research and turn public web data into useful context.",
      opener:
        "I’m using Apify in my hackathon project to research conference sponsors. What is the best way to make web data useful without overwhelming the user?",
      questions: [
        "What makes a good Apify Actor use case?",
        "How should developers clean or summarize scraped web data before using it in an app?",
        "What are common mistakes when building web automation projects?",
      ],
      projectIdea:
        "Create a sponsor research pipeline that finds company pages and turns them into networking talking points.",
    },
  
    CopilotKit: {
      focus: "AI features inside apps, copilots, agent interfaces",
      reason:
        "CopilotKit is helpful if you want to build AI into an app workflow instead of making a separate chatbot.",
      opener:
        "I’m trying to make my app feel like a useful workflow tool, not just a chatbot. What makes an AI feature actually helpful?",
      questions: [
        "What is the difference between a copilot and a regular chatbot?",
        "Where do AI features fit best inside a user interface?",
        "How can a student avoid building an AI wrapper that feels generic?",
      ],
      projectIdea:
        "Add an in-app assistant that helps refine networking notes and follow-up messages.",
    },
  
    Auth0: {
      focus: "authentication, identity, security",
      reason:
        "Auth0 is a good stop if you want to understand secure login and user identity in real apps.",
      opener:
        "I’ve added basic login before, but I want to understand what professional teams care about with authentication.",
      questions: [
        "What authentication mistakes do beginners make most often?",
        "What should I know about OAuth before applying for backend or full-stack roles?",
        "How can I describe authentication work clearly on a resume?",
      ],
      projectIdea:
        "Add login so each attendee can save their own conference notes securely.",
    },
  
    Cloudflare: {
      focus: "edge computing, performance, security, web infrastructure",
      reason:
        "Cloudflare is valuable if you want to learn how apps stay fast, safe, and reliable on the web.",
      opener:
        "I’m interested in full-stack apps. What should I learn about performance and security beyond just writing React code?",
      questions: [
        "What is a simple way to understand edge computing?",
        "What performance issue should every beginner web developer know how to fix?",
        "How do security and performance connect in modern web apps?",
      ],
      projectIdea:
        "Add caching, rate limiting, or edge deployment to a student project.",
    },
  
    Uber: {
      focus: "large-scale engineering, product systems, reliability",
      reason:
        "Uber is useful if you want to understand how large engineering teams build and maintain complex systems.",
      opener:
        "I’m early in my career and trying to understand what engineering looks like at large scale. What should I focus on now?",
      questions: [
        "How do junior engineers contribute to large production systems?",
        "What fundamentals matter most for working on high-scale products?",
        "What project would show strong backend or systems thinking?",
      ],
      projectIdea:
        "Build a simple real-time tracking or dispatch-style app to practice system design basics.",
    },
  
    Warp: {
      focus: "developer tools, terminal workflows, AI productivity",
      reason:
        "Warp is a great booth if you care about developer experience and tools that make engineers faster.",
      opener:
        "I use the terminal a lot for projects, but I’m still learning better workflows. What habits make developers faster?",
      questions: [
        "What makes a developer tool feel good instead of frustrating?",
        "How should students improve their terminal and Git workflow?",
        "What is a good developer-tool project for a portfolio?",
      ],
      projectIdea:
        "Build a small CLI that helps students create project notes, commits, or README drafts.",
    },
  
    Box: {
      focus: "file workflows, content storage, collaboration, Box AI",
      reason:
        "Box is central to this project because the final field guide and follow-up notes are saved into a Box workspace.",
      opener:
        "I’m using Box as the storage workspace for my hackathon project. What makes a file-based workflow useful for teams?",
      questions: [
        "What are strong use cases for storing AI-generated documents in Box?",
        "How do teams organize files so they stay useful after a project ends?",
        "What would make my Box workflow stronger from a product perspective?",
      ],
      projectIdea:
        "Save each conference field guide and recruiter note directly into Box as a living workspace.",
    },
  };
  
  function cleanApifyText(raw: string) {
    return raw
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\([^)]*\.(png|jpg|jpeg|svg|webp)[^)]*\)/gi, "")
      .replace(/logo/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);
  }
  
  async function getApifySponsorResearch(goal: string, skills: string) {
    const token = process.env.APIFY_TOKEN;
  
    if (!token) {
      return [
        "Apify was not connected for this run, so the app used the built-in sponsor guide.",
      ];
    }
  
    try {
      const actorId = "apify~rag-web-browser";
  
      const input = {
        query: `CascadiaJS 2026 sponsor pages for AWS, Expo, Elastic, CopilotKit, Apify, Box. Summarize useful talking points for a student interested in ${goal} with skills ${skills}. Do not include image names or logo text.`,
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
          "Apify actor was called, but the app used the built-in sponsor guide as backup.",
        ];
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        return [
          "Apify returned no readable results, so the app used the built-in sponsor guide as backup.",
        ];
      }
  
      return data.slice(0, 5).map((item: Record<string, unknown>, index: number) => {
        const url =
          typeof item.url === "string"
            ? item.url
            : typeof item["Page URL"] === "string"
            ? item["Page URL"]
            : "";
  
        const title =
          typeof item.title === "string"
            ? item.title
            : typeof item["Page title"] === "string"
            ? item["Page title"]
            : "Sponsor research result";
  
        const rawText = String(
          item.text || item.content || item.markdown || item.description || ""
        );
  
        const text = cleanApifyText(rawText) || "Sponsor page found and included.";
  
        return `${index + 1}. ${title}${url ? `\n   Source: ${url}` : ""}\n   Note: ${text}`;
      });
    } catch {
      return [
        "Apify actor was called, but the app used the built-in sponsor guide as backup.",
      ];
    }
  }
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
  
    const attendeeName = body.name?.trim() || "Conference attendee";
    const goal =
      body.goal?.trim() ||
      "software engineering internship or early-career tech role";
    const skills =
      body.skills?.trim() || "web development, AI tools, and software projects";
    const comfort =
      body.comfort?.trim() || "I want a simple plan before talking to people.";
    const resume = body.resume?.trim() || "No extra resume background was added.";
  
    const companies = (body.sponsors || [])
      .filter((company) => sponsorNotes[company])
      .slice(0, 7);
  
    const apifyResearch = await getApifySponsorResearch(goal, skills);
  
    const priorityCompanies = companies.slice(0, 3);
    const secondaryCompanies = companies.slice(3);
  
    const companySection = companies
      .map((company, index) => {
        const info = sponsorNotes[company];
  
        return `${index + 1}. ${company}
  
  Focus:
  ${info.focus}
  
  Why stop here:
  ${info.reason}
  
  Your opener:
  "${info.opener}"
  
  Ask these:
  - ${info.questions[0]}
  - ${info.questions[1]}
  - ${info.questions[2]}
  
  Mini follow-up note:
  Person:
  Role:
  Advice:
  Next step:
  
  Portfolio idea from this booth:
  ${info.projectIdea}`;
      })
      .join("\n\n---\n\n");
  
    const plan = `
  CONFERENCEWINGMAN FIELD GUIDE
  
  Attendee: ${attendeeName}
  Goal: ${goal}
  Skills to highlight: ${skills}
  Networking comfort: ${comfort}
  
  Built with:
  - Apify: sponsor research and conference context
  - Box: saved guide, notes, and follow-up workspace
  
  TODAY'S GAME PLAN
  
  Start with these three booths:
  ${priorityCompanies.map((company) => `- ${company}`).join("\n")}
  
  Then visit if time:
  ${
    secondaryCompanies.length > 0
      ? secondaryCompanies.map((company) => `- ${company}`).join("\n")
      : "- No secondary booths selected"
  }
  
  Rule for the day:
  Have fewer conversations, but make them better. A good 4-minute conversation with a follow-up note is more valuable than collecting ten stickers and forgetting every name.
  
  APIFY RESEARCH SNAPSHOT
  
  ${apifyResearch.join("\n\n")}
  
  BOOTH GUIDE
  
  ${companySection}
  
  YOUR 30-SECOND INTRO
  
  Hi, I’m ${attendeeName}. I’m interested in ${goal}. I’ve been working with ${skills}, and I’m here to learn how real teams build web, AI, and developer tools. I’m especially trying to understand what projects or skills would make me stronger for early-career roles.
  
  IF YOU GET NERVOUS, SAY THIS
  
  "Can I ask a beginner-friendly question? I’m trying to understand what your company builds and what students should learn if they want to work in this space."
  
  AFTER EACH CONVERSATION
  
  Copy this into your Box note:
  
  Company:
  Person:
  What they work on:
  One useful thing they said:
  Follow-up needed:
  LinkedIn sent? Yes / No
  
  LINKEDIN MESSAGE
  
  Hi [Name], it was great meeting you at CascadiaJS. I appreciated your advice about [specific topic]. I’m continuing to build my skills in ${skills}, and I’d love to stay connected.
  
  BOX WORKSPACE
  
  Save this guide in Box before the conference day starts. During the event, update it with names, advice, and follow-up tasks. After the conference, Box becomes your record of who you met and what to do next.
  
  BACKGROUND NOTES
  
  ${resume}
  `;
  
    return Response.json({ plan });
  }