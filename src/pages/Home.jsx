import { lazy, Suspense } from "react";
import Hero from "../sections/Hero";

/* Each section gets its OWN Suspense boundary so they load
   progressively — About shows as soon as its chunk arrives,
   without waiting for Skills/Projects/Contact to finish. */
const About    = lazy(() => import("../sections/About"));
const Skills   = lazy(() => import("../sections/Skills"));
const Projects = lazy(() => import("../sections/Projects"));
const Contact  = lazy(() => import("../sections/Contact"));

/* Lightweight placeholder that holds layout height while section loads */
const SectionLoader = () => <div className="min-h-[50vh] bg-black" aria-hidden />;

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero is eager — it's the first thing users see */}
      <Hero />

      {/* Each section has its own boundary for progressive hydration */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
}
