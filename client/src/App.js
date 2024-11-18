// import logo from './logo.svg';
import './App.css';
import Navbar from "./Component/Navbar.js"
import Footer from './Component/Footer.js'
import SignupForm from './Component/SignupForm';
import BookingSystem from './Component/ParkingBooking.js';
function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Body/> */}
      <SignupForm/>
      <BookingSystem/>
      <Footer/>
      
    </div>
  );
}

export default App;
