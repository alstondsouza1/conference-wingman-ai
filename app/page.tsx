"use client";

import { useState } from "react";
import { Sparkles, Building2, MessageSquare, UserRound } from "lucide-react";

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

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      body: JSON.stringify({
        ...form,
        sponsors,
      }),
    });

    const data = await response.json();
    setPlan(data.plan);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-cyan-400 font-semibold mb-2">
            Cascadia AI Hackathon 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ConferenceWingman AI
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Turn your resume into a personalized networking plan for tech
            conferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <UserRound className="text-cyan-400" />
              Attendee Profile
            </h2>

            <label className="block mb-4">
              <span className="text-sm text-slate-300">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Alston Dsouza"
                className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-300">Career Goal</span>
              <input
                name="goal"
                value={form.goal}
                onChange={updateField}
                placeholder="Software engineering internship"
                className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-300">Skills</span>
              <input
                name="skills"
                value={form.skills}
                onChange={updateField}
                placeholder="React, Node.js, Java, AI, Docker"
                className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block mb-5">
              <span className="text-sm text-slate-300">
                Resume / Background
              </span>
              <textarea
                name="resume"
                value={form.resume}
                onChange={updateField}
                placeholder="Paste your resume summary or experience here..."
                rows={7}
                className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <button
              onClick={generatePlan}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-950 font-bold py-3 rounded-xl transition"
            >
              {loading ? "Generating..." : "Generate My Conference Plan"}
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <Sparkles className="text-cyan-400" />
              AI Networking Plan
            </h2>

            {!plan && (
              <div className="space-y-4 text-slate-300">
                <div className="flex gap-3">
                  <Building2 className="text-cyan-400" />
                  <p>Find the best sponsors and companies to meet.</p>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="text-cyan-400" />
                  <p>Get questions, pitches, and follow-up messages.</p>
                </div>
              </div>
            )}

            {plan && (
              <>
                <div className="whitespace-pre-wrap text-slate-100 leading-7 bg-slate-950 border border-slate-800 rounded-xl p-4">
                  {plan}
                </div>

                <button
                  onClick={() => {
                    const blob = new Blob([plan], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "conference-wingman-plan.txt";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="mt-4 w-full bg-white text-slate-950 font-bold py-3 rounded-xl"
                >
                  Download Plan for Box
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}