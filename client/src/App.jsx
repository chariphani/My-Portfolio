import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {
  About,
  Experience,
  Skills,
  Education,
  Projects,
} from "./components/Sections";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
