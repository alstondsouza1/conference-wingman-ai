"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

const sponsors = [
  "AWS",
  "Pulumi",
  "Elastic",
  "Render",
  "Expo",
  "Vapi",
  "Apify",
  "CopilotKit",
  "Auth0",
  "Cloudflare",
  "Uber",
  "Warp",
  "Box",
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    goal: "",
    skills: "",
    resume: "",
    comfort: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function generatePlan() {
    setLoading(true);

    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, sponsors }),
    });

    const data = await response.json();
    setPlan(data.plan);
    setLoading(false);
  }

  function downloadPlan() {
    const blob = new Blob([plan], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conference-wingman-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#060711] text-white">
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 shadow-2xl md:p-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                Cascadia AI Hackathon 2026
              </p>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                ConferenceWingman AI
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                A practical conference prep tool for students and early-career
                developers. It turns your background into a clear plan for who
                to meet, what to ask, and how to follow up.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-slate-400">
                Hackathon stack
              </p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-300" size={18} />
                  <span>Box for storing the final networking plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-300" size={18} />
                  <span>AWS/Kiro for development support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-300" size={18} />
                  <span>CascadiaJS sponsor data for recommendations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <FeatureCard
              icon={<UserRound className="text-cyan-300" />}
              title="Profile"
              text="Add your goal, skills, and resume notes."
            />
            <FeatureCard
              icon={<Building2 className="text-cyan-300" />}
              title="Sponsor Match"
              text="Find companies worth talking to first."
            />
            <FeatureCard
              icon={<MessageSquare className="text-cyan-300" />}
              title="Talk Tracks"
              text="Get questions and conversation starters."
            />
            <FeatureCard
              icon={<FileText className="text-cyan-300" />}
              title="Box File"
              text="Download the plan and save it to Box."
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-3xl border border-white/10 bg-black/25 p-6">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                <Briefcase className="text-cyan-300" />
                Attendee Details
              </h2>

              <div className="space-y-4">
                <FieldLabel label="Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Alston Dsouza"
                    className="input-style"
                  />
                </FieldLabel>

                <FieldLabel label="What are you looking for?">
                  <input
                    name="goal"
                    value={form.goal}
                    onChange={updateField}
                    placeholder="Software engineering internship, AI projects, full-stack roles..."
                    className="input-style"
                  />
                </FieldLabel>

                <FieldLabel label="Skills">
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={updateField}
                    placeholder="React, Next.js, Node.js, Java, Docker, AI tools..."
                    className="input-style"
                  />
                </FieldLabel>

                <FieldLabel label="Networking comfort level">
                  <input
                    name="comfort"
                    value={form.comfort}
                    onChange={updateField}
                    placeholder="Example: nervous, beginner, confident, looking for practice..."
                    className="input-style"
                  />
                </FieldLabel>

                <FieldLabel label="Resume / background">
                  <textarea
                    name="resume"
                    value={form.resume}
                    onChange={updateField}
                    placeholder="Paste a short resume summary, projects, internship experience, or class projects..."
                    rows={8}
                    className="input-style resize-none"
                  />
                </FieldLabel>

                <button
                  onClick={generatePlan}
                  disabled={loading}
                  className="w-full rounded-2xl bg-cyan-300 py-4 font-black text-slate-950 transition hover:bg-cyan-200 disabled:bg-slate-600 disabled:text-slate-300"
                >
                  {loading ? "Building your networking Brief..." : "Build My Brief"}
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-black/25 p-6">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="text-cyan-300" />
                Networking Brief
              </h2>

              {!plan && (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8">
                  <div className="mb-6 flex items-start gap-3">
                    <Target className="mt-1 text-cyan-300" />
                    <div>
                      <h3 className="font-bold">Your plan will appear here</h3>
                      <p className="mt-1 text-slate-400">
                        The output is written like a real prep sheet, not a
                        generic AI response.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <p>It will include:</p>
                    <ul className="list-inside list-disc space-y-2">
                      <li>Best sponsor booths to visit</li>
                      <li>Human conversation starters</li>
                      <li>Questions that do not sound awkward</li>
                      <li>A simple follow-up message</li>
                      <li>A Box-ready file for saving the plan</li>
                    </ul>
                  </div>
                </div>
              )}

              {plan && (
                <>
                  <div className="max-h-[650px] overflow-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-slate-950/80 p-6 leading-7 text-slate-100">
                    {plan}
                  </div>

                  <button
                    onClick={downloadPlan}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-black text-slate-950 hover:bg-slate-200"
                  >
                    <Download size={18} />
                    Download Brief for Box
                  </button>
                </>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}