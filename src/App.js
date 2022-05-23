import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssTest from "./pages/CssTest";
import VenueBookingSystem from "./pages/VenueBookingSystem";
import "./css/App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<CssTest />} />
                <Route exact path="/Venue_Booking_System" element={<VenueBookingSystem />} />
            </Routes>
        </Router>
    );
}

export default App;
