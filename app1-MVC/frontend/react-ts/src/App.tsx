import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import SideBar from "./components/SideBar";

function Sections() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <main>
        <SideBar />
        <Sections />
      </main>
    </>
  );
}

export default App;
