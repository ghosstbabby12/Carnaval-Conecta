import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventList from "./components/EventList"; // o la página que use para listar eventos
import EventPage from "./pages/EventPage";
import EditEventPage from "./pages/EditEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import { Chatbot } from "./components/Chatbot"; // importa tu chatbot aquí

function App() {
  return (
    <BrowserRouter>
      <Chatbot />  {/* Aquí para que siempre esté visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Home />} />
        <Route path="/eventos/:id" element={<EventPage />} />
        <Route path="/editar-evento/:id" element={<EditEventPage />} />
        <Route path="/crear-evento" element={<CreateEventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

