import Loader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import ZoomSection from "./components/ZoomSection";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";

export default function Page() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Nav />
      <main>
        <div id="top">
          <Hero />
        </div>
        <div id="about">
          <About />
          <ZoomSection />
        </div>
        <div id="work">
          <Projects />
        </div>
        <div id="stack">
          <Stack />
        </div>
        <div id="resume">
          <Resume />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Cursor />
    </>
  );
}
