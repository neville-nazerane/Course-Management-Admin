import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/teachers" element={<div>Teachers</div>} />
        <Route path="/courses" element={<div>Courses</div>} />
        <Route path="/students" element={<div>Students</div>} />
      </Route>
    </Routes>
  );
}

export default App;
