import { Reveal, Tilt, Timeline } from "./ui";
import {
  about,
  experience,
  skills,
  education,
  projects,
  profile,
} from "../data";

export function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title gradient-text">About Me</h2>
      <Reveal>
        <Tilt max={4} className="card3d space-y-5 text-lg">
          <p>
            Hi, I'm <span className="font-black text-sky">{profile.name}</span>,{" "}
            {about[0]}
          </p>
          <p>{about[1]}</p>
          <p>{about[2]}</p>
        </Tilt>
      </Reveal>
    </section>
  );
}

export const Experience = () => (
  <section id="experience" className="section">
    <h2 className="section-title gradient-text">Experience</h2>
    <Timeline items={experience} />
  </section>
);

export const Education = () => (
  <section id="education" className="section">
    <h2 className="section-title gradient-text">Education</h2>
    <Timeline items={education} />
  </section>
);

export function Skills() {
  return (
    <section id="skills" className="section text-center">
      <h2 className="section-title gradient-text">My Skills</h2>
      <ul className="flex flex-wrap justify-center gap-4 [perspective:800px]">
        {skills.map((s, i) => (
          <Reveal key={s} delay={i * 40}>
            <li className="cursor-pointer list-none rounded-2xl border border-sky/30 bg-navy px-5 py-3 font-medium text-mist shadow-[0_6px_0_#26415E] transition-all duration-300 hover:-translate-y-2 hover:rotate-[-3deg] hover:border-sky hover:bg-sky hover:text-ink hover:shadow-[0_10px_0_#C48CB3]">
              {s}
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section text-center">
      <h2 className="section-title gradient-text">My Projects</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 80}
            className={p.wide ? "md:col-span-2" : ""}
          >
            <Tilt
              max={12}
              className="card3d flex h-full flex-col justify-between hover:shadow-[0_30px_60px_-15px_rgba(131,166,206,.3)]"
            >
              <div style={{ transform: "translateZ(30px)" }}>
                <h3 className="mb-4 text-2xl font-bold text-sky">{p.title}</h3>
                <p className="mb-6 leading-7 text-mist/80">{p.text}</p>
              </div>
              <div
                className="flex flex-wrap justify-center gap-4"
                style={{ transform: "translateZ(40px)" }}
              >
                {p.demo ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !px-6 !py-2 bg-sky"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="rounded-full bg-slate px-6 py-2 font-semibold text-mist">
                    Coming soon
                  </span>
                )}
                {p.code && (
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !px-6 !py-2 bg-mauve"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
