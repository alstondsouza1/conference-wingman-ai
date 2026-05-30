"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Save,
  Search,
} from "lucide-react";

const events = [
  {
    name: "CascadiaJS 2026",
    sponsors:
      "AWS, Pulumi, Elastic, Render, Expo, Vapi, Apify, CopilotKit, Auth0, Cloudflare, Uber, Warp, Box",
  },
  {
    name: "Google I/O",
    sponsors:
      "Google, Firebase, Android, Chrome, Google Cloud, Gemini, Flutter",
  },
  {
    name: "Microsoft Build",
    sponsors:
      "Microsoft, Azure, GitHub, Copilot, LinkedIn, OpenAI, Power Platform",
  },
  {
    name: "Grace Hopper Celebration",
    sponsors:
      "Google, Microsoft, Amazon, Apple, Meta, Salesforce, AnitaB.org",
  },
  {
    name: "WiCyS Conference",
    sponsors:
      "Google, Microsoft, Cisco, CrowdStrike, Palo Alto Networks, AWS, Splunk",
  },
  {
    name: "University Career Fair",
    sponsors:
      "Local employers, recruiters, internship teams, software companies, IT departments",
  },
  {
    name: "Custom Event",
    sponsors: "",
  },
];

export default function Home() {
  const [form, setForm] = useState({
    eventName: events[0].name,
    sponsors: events[0].sponsors,
    name: "",
    goal: "",
    skills: "",
    comfort: "",
    resume: "",
  });

  const [guide, setGuide] = useState("");
  const [loading, setLoading] = useState(false);
  const [boxStatus, setBoxStatus] = useState("");

  function updateField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function updateEvent(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = events.find((event) => event.name === e.target.value);

    setForm({
      ...form,
      eventName: selected?.name || "",
      sponsors: selected?.sponsors || "",
    });

    setGuide("");
    setBoxStatus("");
  }

  async function buildGuide() {
    setLoading(true);
    setBoxStatus("");
    setGuide("");

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.plan) {
        setGuide(data.plan);
      } else {
        setGuide("Could not build the guide. Please check the server logs.");
      }
    } catch (error) {
      console.error("Build guide error:", error);
      setGuide("Something went wrong while building the guide.");
    }

    setLoading(false);
  }

  function downloadGuide() {
    const blob = new Blob([guide], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "conference-wingman-guide.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  async function saveToBox() {
    if (!guide) {
      setBoxStatus("Build a guide before saving to Box.");
      return;
    }

    setBoxStatus("Saving to Box...");

    try {
      const response = await fetch("/api/save-to-box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: guide,
        }),
      });

      const text = await response.text();

      let data: {
        success?: boolean;
        fileName?: string;
        message?: string;
        details?: unknown;
      } = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {
            success: false,
            message: "Server returned invalid JSON.",
          };
        }
      }

      if (response.ok && data.success) {
        setBoxStatus(`Saved to Box: ${data.fileName}`);
      } else {
        setBoxStatus(data.message || "Box save failed.");
        console.error("Box save error:", data);
      }
    } catch (error) {
      setBoxStatus("Box save failed. Check terminal for details.");
      console.error("Save to Box error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-5 py-7 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-7 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              ConferenceWingman
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Conference prep for students and early-career developers
            </p>
          </div>

          <p className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 md:block">
            Apify + Box
          </p>
        </nav>

        <header className="mb-7 rounded-[32px] bg-[#111827] p-8 text-white shadow-xl md:p-12">
          <p className="mb-5 inline-flex rounded-full bg-yellow-300 px-4 py-2 text-sm font-black text-slate-950">
            Works for any conference
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
                Pick an event. Get a plan. Save the follow-up.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Choose a conference or create your own. ConferenceWingman uses
                sponsor research to build a practical networking guide you can
                save into Box.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-4 text-sm font-black uppercase tracking-widest text-yellow-200">
                Demo workflow
              </p>

              <Workflow text="Choose an event or custom conference" />
              <Workflow text="Apify researches sponsor context" />
              <Workflow text="Generate questions and openers" />
              <Workflow text="Save the final guide into Box" />
            </div>
          </div>
        </header>

        <section className="mb-7 grid gap-4 md:grid-cols-3">
          <Feature
            icon={<CalendarDays />}
            title="Event selector"
            text="Use CascadiaJS, Google I/O, Microsoft Build, WiCyS, career fairs, or custom events."
          />

          <Feature
            icon={<Search />}
            title="Sponsor research"
            text="Apify gives the guide outside context instead of only using static text."
          />

          <Feature
            icon={<FileText />}
            title="Box workspace"
            text="Save the generated guide and update it after conversations."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Step 1
            </p>

            <h2 className="mt-2 text-3xl font-black">Build your event profile</h2>

            <p className="mt-2 text-slate-600">
              Select an event, adjust the sponsors, and add your background.
            </p>

            <div className="mt-7 space-y-5">
              <Field label="Select event">
                <select
                  name="eventName"
                  value={form.eventName}
                  onChange={updateEvent}
                  className="input-style"
                >
                  {events.map((event) => (
                    <option key={event.name} value={event.name}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Sponsors, companies, or event keywords">
                <textarea
                  name="sponsors"
                  value={form.sponsors}
                  onChange={updateField}
                  rows={4}
                  placeholder="Example: AWS, Box, Apify, Google, Microsoft..."
                  className="input-style resize-none"
                />
              </Field>

              <Field label="Your name">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Alston Dsouza"
                  className="input-style"
                />
              </Field>

              <Field label="Your goal">
                <input
                  name="goal"
                  value={form.goal}
                  onChange={updateField}
                  placeholder="Software internship, AI projects, full-stack roles..."
                  className="input-style"
                />
              </Field>

              <Field label="Skills to highlight">
                <input
                  name="skills"
                  value={form.skills}
                  onChange={updateField}
                  placeholder="React, Next.js, Node.js, Java, Docker..."
                  className="input-style"
                />
              </Field>

              <Field label="Networking comfort">
                <input
                  name="comfort"
                  value={form.comfort}
                  onChange={updateField}
                  placeholder="I want a clear plan before talking to people."
                  className="input-style"
                />
              </Field>

              <Field label="Projects or background">
                <textarea
                  name="resume"
                  value={form.resume}
                  onChange={updateField}
                  rows={5}
                  placeholder="BAS Software Development student. Built full-stack apps..."
                  className="input-style resize-none"
                />
              </Field>

              <button
                onClick={buildGuide}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 text-lg font-black text-white transition hover:bg-blue-800 disabled:bg-slate-300 disabled:text-slate-500"
              >
                {loading ? "Researching and building..." : "Build Field Guide"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Step 2
            </p>

            <h2 className="mt-2 text-3xl font-black">Use your guide</h2>

            <p className="mt-2 text-slate-600">
              Download it, save it to Box, and update it after every
              conversation.
            </p>

            {!guide ? (
              <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-[#f7f5ef] p-8">
                <p className="text-xl font-black">Your guide will appear here.</p>

                <p className="mt-3 leading-7 text-slate-600">
                  You will get event-specific sponsor research, priority booths,
                  custom openers, questions, and follow-up notes.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-7 max-h-[650px] overflow-auto whitespace-pre-wrap rounded-3xl border border-slate-200 bg-[#111827] p-6 text-sm leading-7 text-white md:text-base">
                  {guide}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <button
                    onClick={downloadGuide}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#111827] py-4 font-black text-white hover:bg-black"
                  >
                    <Download size={18} />
                    Download
                  </button>

                  <button
                    onClick={saveToBox}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 font-black text-white hover:bg-blue-800"
                  >
                    <Save size={18} />
                    Save to Box
                  </button>
                </div>

                {boxStatus && (
                  <p className="mt-3 rounded-xl bg-[#f7f5ef] px-4 py-3 text-center text-sm font-semibold text-slate-700">
                    {boxStatus}
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function Workflow({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
      <CheckCircle2 className="text-yellow-300" size={18} />
      <span className="text-sm text-slate-100">{text}</span>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 text-blue-700">{icon}</div>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}