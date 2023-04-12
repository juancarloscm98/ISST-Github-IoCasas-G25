import './css/App.css';
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Login from "./Components/Login";
import Index from "./Components/Index";
import Register from "./Components/Register";
import IndexHouse from "./Components/IndexHouse";
import 'bootstrap/dist/css/bootstrap.min.css';
import Doors from "./Components/Doors";
import AddDoor from "./Components/AddDoor";
import Bookings from "./Components/Bookings";
import NavbarComp from "./Components/NavbarComp";
import Profile from "./Components/Profile";
//hola soy pedroooddd
function App() {
    return (
        <div className="App">

            <header>
                <NavbarComp/>
            </header>


            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='indexHouse' element={<IndexHouse/>}/>
                <Route path='doors' element={<Doors/>}/>
                <Route path='add' element={<AddDoor/>}/>
                <Route path='booking' element={<Bookings/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='profile' element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
