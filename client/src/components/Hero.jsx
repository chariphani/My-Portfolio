import { Particles, Typed } from "./ui";
import { profile } from "../data";

export default function Hero() {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
    >
      <Particles />
      {/* floating 3D blobs */}
      <div className="absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-sky/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 animate-float rounded-full bg-mauve/25 blur-3xl [animation-delay:2s]" />

      <div className="relative z-10 flex flex-col items-center text-center [perspective:1000px]">
        <div className="relative mb-10 animate-pop">
          <div className="absolute -inset-3 animate-spin3d rounded-full bg-[conic-gradient(from_0deg,#0D1E4C,#83A6CE,#C48CB3,#E5C9D7,#0D1E4C)]" />
          <div className="absolute -inset-3 animate-spin3d rounded-full bg-[conic-gradient(from_0deg,#0D1E4C,#83A6CE,#C48CB3,#E5C9D7,#0D1E4C)] blur-xl opacity-60" />
          <img
            src={profile.image}
            alt="Developer profile"
            className="relative h-[180px] w-[180px] rounded-full border-[6px] border-ink object-cover shadow-[0_25px_50px_rgba(0,0,0,.55)] md:h-[250px] md:w-[250px]"
          />
        </div>

        <h1 className="min-h-[3.5rem] text-3xl font-black md:min-h-[4.5rem] md:text-6xl">
          <span className="gradient-text">
            <Typed strings={profile.typed} />
          </span>
        </h1>
        <p className="mt-4 text-lg text-mist/80">Welcome to my portfolio</p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <a href="#projects" className="btn bg-sky">
            View My Work
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-mauve"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
