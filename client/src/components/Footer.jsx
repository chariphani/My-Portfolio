import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { profile } from "../data";

const icon =
  "flex h-11 w-11 items-center justify-center rounded-full bg-slate text-mist transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-sky hover:text-ink hover:shadow-[0_10px_20px_rgba(131,166,206,.4)]";

export default function Footer() {
  return (
    <footer className="border-t border-slate bg-navy px-6 py-8 text-center text-mist">
      <p className="mb-4">
        &copy; {new Date().getFullYear()} All Rights Reserved | Designed &amp;
        Developed by{" "}
        <span className="font-bold tracking-wide text-mauve">
          {profile.brand}
        </span>
      </p>

      <div className="flex justify-center gap-4">
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${profile.email}`}
          aria-label="Email"
          target="_blank"
          rel="noopener noreferrer"
          className={icon}
        >
          <FaEnvelope />
        </a>
        <a
          href={profile.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className={icon}
        >
          <FaLinkedin />
        </a>

        <a
          href={profile.github}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className={icon}
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
