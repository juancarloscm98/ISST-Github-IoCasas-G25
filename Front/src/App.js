import './css/App.css';
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Login from "./views/Login";
import Index from "./views/Index";
import Register from "./views/Register";
import MyDoors from "./views/MyDoors";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDoor from "./views/AddDoor";
import Bookings from "./views/Bookings";
import NavbarComp from "./views/NavbarComp";
import Profile from "./views/Profile";
import MyBookings from "./views/MyBookings"
import AddPersonsDoor from './views/AddPersonsDoor';
function App() {
    return (
        <div className="App">

            <header>
                <NavbarComp/>
            </header>


            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='myDoors' element={<MyDoors/>}/>
                <Route path='add' element={<AddDoor/>}/>
                <Route path='booking' element={<Bookings/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='profile' element={<Profile/>}/>
                <Route path='myBookings' element={<MyBookings/>}/>
                <Route path='addPersonDoor/:lockId' element={<AddPersonsDoor/>}/>
            </Routes>
        </div>
    );
}

export default App;
