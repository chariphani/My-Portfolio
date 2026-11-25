import { useState } from "react";
import { Reveal, Tilt } from "./ui";
import { profile } from "../data";

const API = import.meta.env.VITE_API_URL || "";
const field =
  "w-full rounded-2xl border-2 border-slate bg-ink/70 p-4 text-mist outline-none transition-all placeholder:text-sky/60 focus:border-sky focus:shadow-[0_0_0_4px_rgba(131,166,206,.3)]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus({
        type: "ok",
        text: "Message sent! I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "err", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section text-center">
      <h2 className="section-title !mb-3 gradient-text">Contact Me</h2>
      <p className="mb-10 text-mist/70">
        Have a project in mind or want to say hello? Feel free to contact me!
      </p>
      <Reveal>
        <Tilt max={3} className="card3d mx-auto max-w-[600px]">
          <form onSubmit={submit} className="flex flex-col gap-5">
            <input
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Your Name"
              required
              className={field}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              placeholder="Your Email"
              required
              className={field}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={change}
              placeholder="Your Message"
              rows="5"
              required
              className={`${field} resize-y`}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-sky to-mauve disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status.text && (
              <p
                role="status"
                className={`rounded-xl p-3 font-medium ${status.type === "ok" ? "bg-navy text-sky" : "bg-slate text-mist"}`}
              >
                {status.text}
              </p>
            )}
          </form>
        </Tilt>
      </Reveal>

      <p className="mt-10 text-mist/80">
        You can also contact me through{" "}
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${profile.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-mauve underline-offset-4 hover:underline"
        >
          Gmail
        </a>
        ,{" "}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-sky underline-offset-4 hover:underline"
        >
          LinkedIn
        </a>{" "}
        and{" "}
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-mauve underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
