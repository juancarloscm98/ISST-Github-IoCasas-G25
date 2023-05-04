import './css/App.css';
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Login from "./views/Login";
import Index from "./views/Index";
import Register from "./views/Register";
import IndexHouse from "./views/IndexHouse";
import 'bootstrap/dist/css/bootstrap.min.css';
import Doors from "./views/Doors";
import AddDoor from "./views/AddDoor";
import Bookings from "./views/Bookings";
import NavbarComp from "./views/NavbarComp";
import Profile from "./views/Profile";
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
