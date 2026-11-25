import { useEffect, useRef, useState } from "react";

/* Scroll reveal with 3D flip-in */
export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShow(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, perspective: 900 }}
      className={`transition-all duration-700 ${show ? "opacity-100 translate-y-0 [transform:rotateX(0)]" : "opacity-0 translate-y-10 [transform:rotateX(25deg)]"} ${className}`}
    >
      {children}
    </div>
  );
}

/* Mouse-follow 3D tilt */
export function Tilt({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(10px)`;
  };
  const leave = () =>
    (ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)");
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

/* Typewriter */
export function Typed({ strings }) {
  const [text, setText] = useState("");
  const s = useRef({ i: 0, c: 0, del: false });
  useEffect(() => {
    let t;
    const tick = () => {
      const st = s.current,
        word = strings[st.i];
      st.c += st.del ? -1 : 1;
      setText(word.slice(0, st.c));
      let wait = st.del ? 25 : 55;
      if (!st.del && st.c === word.length) {
        st.del = true;
        wait = 1400;
      } else if (st.del && st.c === 0) {
        st.del = false;
        st.i = (st.i + 1) % strings.length;
        wait = 400;
      }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [strings]);
  return (
    <span>
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}

/* Pink particle network canvas */
export function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current,
      ctx = cv.getContext("2d");
    const colors = ["#83A6CE", "#C48CB3", "#E5C9D7", "#83A6CE"];
    let w,
      h,
      raf,
      mouse = { x: -999, y: -999 };
    const resize = () => {
      w = cv.width = cv.offsetWidth;
      h = cv.height = cv.offsetHeight;
    };
    resize();
    const n = Math.min(110, Math.floor(window.innerWidth / 12));
    const ps = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.c;
        ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j],
            d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.shadowBlur = 0;
            ctx.strokeStyle = `rgba(131,166,206,${0.25 * (1 - d / 120)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 160) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(196,140,179,${1 - dm / 160})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const mm = (e) => {
      const r = cv.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", mm);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* Vertical timeline used by Experience + Education */
export function Timeline({ items }) {
  return (
    <div className="relative ml-4 border-l-[3px] border-sky/40 pl-8">
      {items.map((it, i) => (
        <Reveal
          key={it.title}
          delay={i * 100}
          className="relative mb-10 last:mb-0"
        >
          <span className="absolute -left-[45px] top-5 h-5 w-5 rounded-full border-[3px] border-ink bg-mauve shadow-[0_0_0_4px_#83A6CE]" />
          <Tilt max={5} className="card3d">
            <h3 className="text-xl font-bold text-sky">{it.title}</h3>
            <span className="text-sm font-medium text-mauve">{it.sub}</span>
            <p className="mt-3 leading-7 text-mist/80">{it.text}</p>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
