import { Routes, Route, createContext } from "react-router-dom";
import Layout from "./Layout";
import Teachers from "./pages/teachers";

function App() {

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/teachers" element={ <Teachers /> } />
          <Route path="/courses" element={<div>Courses</div>} />
          <Route path="/students" element={<div>Students</div>} />
        </Route>
      </Routes>
  );
}

export default App;
