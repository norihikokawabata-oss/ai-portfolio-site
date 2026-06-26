import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Works } from "./components/Works";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="page">
      <Header />
      <Hero />
      <About />
      <Works />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
