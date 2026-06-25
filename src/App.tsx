import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HeroBento } from "./components/HeroBento";
import { WorksGallery } from "./components/WorksGallery";
import { WorkModal } from "./components/WorkModal";
import { Footer } from "./components/Footer";
import { works, type Work } from "./data/works";

const heroWorks = works.filter((w) => w.isHero);

function App() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <div className="page">
      <Header />
      <HeroBento heroWorks={heroWorks} onSelect={setSelectedWork} />
      <WorksGallery works={works} onSelect={setSelectedWork} />
      <Footer />
      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}

export default App;
