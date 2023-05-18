import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
