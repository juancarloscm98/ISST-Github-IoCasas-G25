import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Login from "./Login";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Profile from "./Profile";
export default function NavbarComp() {
  const [showLogin, setShowLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showProfile, setShowProfile] = useState(false);
  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  useEffect(() => {
    console.log(sessionStorage.getItem("boolUserRegistered"));
    if (sessionStorage.getItem("boolUserRegistered") === "true") {
      setAdmin(sessionStorage.getItem("userType") === "Propietario");
      setLogged(true);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Button variant="dark">TechHouse</Button>
          </Link>

          <Nav className="me-auto">
            <Link to="booking">
              <Button variant="dark">Reservas</Button>
            </Link>
          </Nav>
          <Nav>
            {logged ? (
              <>
                 <Link to="myBookings">
                    <Button variant="dark">Mis reservas</Button>
                  </Link>
                  
                  <Link to="myDoors">
                    <Button variant="dark">Mis puertas</Button>
                  </Link>
                  
              </>
            ) : null}
          </Nav>
          <Nav className="d-flex">
            {logged ? (
              <Link>
                <Button variant="dark" onClick={handleShowProfile}>
                  {sessionStorage.getItem("usernameUserResigestered")}
                </Button>
              </Link>
            ) : (
              <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            )}
            <Modal show={showLogin} onHide={handleCloseLogin}>
              <Login />
            </Modal>
            <Modal show={showProfile} onHide={handleCloseProfile}>
              <Profile />
            </Modal>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
