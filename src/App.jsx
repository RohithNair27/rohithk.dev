import { Routes, Route } from 'react-router-dom';
import KaijuHome from './pages/KaijuHome';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import QaLab from './pages/QaLab';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<KaijuHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/qa-lab" element={<QaLab />} />
    </Routes>
  );
}
