import { Routes, Route, createContext } from "react-router-dom";
import Layout from "./Layout";
import Teachers from "./pages/teachers";
import Courses from "./pages/courses";
import StudyPrograms from "./pages/study-program";
import Students from "./pages/students";

function App() {

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/teachers" element={ <Teachers /> } />
          <Route path="/courses" element={ <Courses /> } />
          <Route path="/study-programs" element={<StudyPrograms />} />
          <Route path="/students" element={<Students />} />
        </Route>
      </Routes>
  );
}

export default App;
