"use client";

import { useState } from "react";
import {
  Sparkles,
  Building2,
  MessageSquare,
  UserRound,
  Download,
  FileText,
  Target,
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
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    goal: "",
    skills: "",
    resume: "",
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
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-8 shadow-2xl">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                Cascadia AI Hackathon 2026
              </p>
              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                ConferenceWingman AI
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                A networking copilot that turns your background into a clear
                conference plan: who to meet, what to ask, and how to follow up.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Built with</p>
              <p className="font-semibold text-cyan-300">
                Box + AWS/Kiro + CascadiaJS sponsor data
              </p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <FileText className="mb-3 text-cyan-300" />
              <h3 className="font-bold">Input your profile</h3>
              <p className="mt-2 text-sm text-slate-400">
                Add your goals, skills, and resume background.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Target className="mb-3 text-cyan-300" />
              <h3 className="font-bold">Match with sponsors</h3>
              <p className="mt-2 text-sm text-slate-400">
                Get a focused plan for companies and people to meet.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Download className="mb-3 text-cyan-300" />
              <h3 className="font-bold">Save to Box</h3>
              <p className="mt-2 text-sm text-slate-400">
                Download your plan and store it in Box for later.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                <UserRound className="text-cyan-300" />
                Attendee Profile
              </h2>

              <div className="space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <input
                  name="goal"
                  value={form.goal}
                  onChange={updateField}
                  placeholder="Career goal, example: Software engineering internship"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <input
                  name="skills"
                  value={form.skills}
                  onChange={updateField}
                  placeholder="Skills, example: React, Node.js, Java, AI"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <textarea
                  name="resume"
                  value={form.resume}
                  onChange={updateField}
                  placeholder="Paste resume summary, projects, or background here..."
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <button
                  onClick={generatePlan}
                  disabled={loading}
                  className="w-full rounded-xl bg-cyan-400 py-3 font-black text-slate-950 transition hover:bg-cyan-300 disabled:bg-slate-600"
                >
                  {loading ? "Building your plan..." : "Generate Networking Plan"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="text-cyan-300" />
                Your Conference Plan
              </h2>

              {!plan && (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-slate-300">
                  <div className="mb-5 flex gap-3">
                    <Building2 className="text-cyan-300" />
                    <p>Recommended companies will appear here.</p>
                  </div>
                  <div className="flex gap-3">
                    <MessageSquare className="text-cyan-300" />
                    <p>Questions and follow-up messages will appear here.</p>
                  </div>
                </div>
              )}

              {plan && (
                <>
                  <div className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 leading-7 text-slate-100">
                    {plan}
                  </div>

                  <button
                    onClick={downloadPlan}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-black text-slate-950 hover:bg-slate-200"
                  >
                    <Download size={18} />
                    Download Plan for Box
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}