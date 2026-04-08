import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { HeroCanvas } from './components/canvas/HeroCanvas';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { CertificationsAchievements } from './components/sections/CertificationsAchievements';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <HeroCanvas />
      
      <main className="relative z-10 w-full flex flex-col overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <CertificationsAchievements />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
