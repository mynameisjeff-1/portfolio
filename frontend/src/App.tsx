import { useTheme } from "./hooks/useTheme";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Chat } from "./components/Chat";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Research } from "./components/Research";
import { Award } from "./components/Award";
import { Community } from "./components/Community";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { Grain } from "./components/Grain";

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Grain />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <h1 className="sr-only">Hamza Asim — AI Engineer</h1>
        <Hero />
        <Chat />
        <Experience />
        <Projects />
        <Research />
        <Award />
        <Community />
        <Skills />
      </main>
      <Footer />
    </>
  );
}

export default App;
