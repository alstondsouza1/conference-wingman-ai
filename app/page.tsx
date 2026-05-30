"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  MessageSquare,
  Save,
  Search,
  Users,
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
  const [boxStatus, setBoxStatus] = useState("");

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function generatePlan() {
    setLoading(true);
    setBoxStatus("");

    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    a.download = "conference-wingman-field-guide.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function saveToBox() {
    setBoxStatus("Saving to Box...");

    const response = await fetch("/api/save-to-box", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = await response.json();

    if (data.success) {
      setBoxStatus(`Saved to Box: ${data.fileName}`);
    } else {
      setBoxStatus("Box save failed. Check your Box token or folder ID.");
      console.log(data);
    }
  }

  return (
    <main className="min-h-screen bg-[#070b14] px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4">
          <h1 className="text-xl font-black">ConferenceWingman</h1>
          <p className="hidden text-sm text-slate-400 md:block">
            Apify Research · Box Storage · CascadiaJS
          </p>
        </nav>

        <header className="mb-8 rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-12">
          <p className="mb-5 inline-block rounded-full bg-sky-400 px-4 py-2 text-sm font-black text-slate-950">
            Cascadia AI Hackathon 2026
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
                Plan your conference before you arrive.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Build a simple field guide with sponsor research, booth
                priorities, conversation starters, and Box follow-up storage.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
              <p className="mb-4 text-sm font-black uppercase tracking-widest text-sky-300">
                Workflow
              </p>
              <WorkflowItem text="Apify researches sponsor pages" />
              <WorkflowItem text="Guide creates booth strategy" />
              <WorkflowItem text="Box saves notes and follow-ups" />
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <FeatureCard
            icon={<Users />}
            title="Profile"
            text="Add your goals and background."
          />
          <FeatureCard
            icon={<Search />}
            title="Research"
            text="Use Apify sponsor context."
          />
          <FeatureCard
            icon={<MessageSquare />}
            title="Questions"
            text="Get natural booth openers."
          />
          <FeatureCard
            icon={<FileText />}
            title="Box"
            text="Save the guide directly."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
              Step 1
            </p>
            <h2 className="mt-2 text-3xl font-black">Build your profile</h2>
            <p className="mt-2 text-slate-400">
              This shapes your conference plan.
            </p>

            <div className="mt-7 space-y-5">
              <Field label="Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Alston Dsouza"
                  className="input-style"
                />
              </Field>

              <Field label="Conference goal">
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
                  placeholder="Comfortable, but I want a clear plan first."
                  className="input-style"
                />
              </Field>

              <Field label="Projects or background">
                <textarea
                  name="resume"
                  value={form.resume}
                  onChange={updateField}
                  placeholder="BAS Software Development student. Built full-stack apps..."
                  rows={6}
                  className="input-style resize-none"
                />
              </Field>

              <button
                onClick={generatePlan}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 py-4 text-lg font-black text-slate-950 transition hover:bg-sky-300 disabled:bg-slate-700 disabled:text-slate-400"
              >
                {loading ? "Building guide..." : "Build Field Guide"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
              Step 2
            </p>
            <h2 className="mt-2 text-3xl font-black">Use your guide</h2>
            <p className="mt-2 text-slate-400">
              Save it to Box and update it after conversations.
            </p>

            {!plan ? (
              <div className="mt-7 rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-8">
                <p className="text-xl font-black">Your guide will appear here.</p>
                <p className="mt-3 leading-7 text-slate-400">
                  It will include booth priorities, different openers for each
                  sponsor, useful questions, follow-up notes, and Box saving.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-7 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-3xl border border-slate-800 bg-[#050814] p-6 text-sm leading-7 text-slate-100 md:text-base">
                  {plan}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <button
                    onClick={downloadPlan}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 font-black text-slate-950 hover:bg-slate-200"
                  >
                    <Download size={18} />
                    Download
                  </button>

                  <button
                    onClick={saveToBox}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-4 font-black text-white hover:bg-sky-600"
                  >
                    <Save size={18} />
                    Save to Box
                  </button>
                </div>

                {boxStatus && (
                  <p className="mt-3 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm text-slate-300">
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

function WorkflowItem({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-800 p-3">
      <CheckCircle2 className="text-sky-300" size={18} />
      <span className="text-sm text-slate-200">{text}</span>
    </div>
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
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 transition hover:border-sky-400/60">
      <div className="mb-3 text-sky-300">{icon}</div>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
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
      <span className="mb-2 block text-sm font-black text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}