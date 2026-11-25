import { useEffect, useState } from "react";
import { nav, profile } from "../data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let cur = "";
      nav.forEach((n) => {
        const el = document.getElementById(n.toLowerCase());
        if (el && el.getBoundingClientRect().top < 140) cur = n;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-10 ${scrolled ? "bg-navy/95 shadow-[0_10px_30px_rgba(0,0,0,.45)] backdrop-blur" : "bg-navy"}`}>
      <a href="#intro" className="text-2xl font-black text-mauve">{profile.brand}</a>

      <button onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}
        className="z-[60] flex flex-col gap-[5px] md:hidden">
        <span className={`h-[3px] w-[25px] rounded bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-[3px] w-[25px] rounded bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-[3px] w-[25px] rounded bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      <ul className={`fixed left-0 top-0 z-50 flex h-screen w-[70%] flex-col gap-6 bg-navy px-8 pt-24 transition-transform duration-300 md:static md:h-auto md:w-auto md:translate-x-0 md:flex-row md:items-center md:bg-transparent md:p-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {nav.map((n) => (
          <li key={n}>
            <a href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}
              className={`relative pb-1 font-medium transition-colors duration-300 hover:text-sky after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-sky after:transition-all after:duration-300 ${active === n ? "text-sky after:w-full" : "text-mist after:w-0 hover:after:w-full"}`}>
              {n}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
