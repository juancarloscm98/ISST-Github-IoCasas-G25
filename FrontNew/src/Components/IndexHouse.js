import { MdLockOutline, MdSpaceBar } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import AddPersonsDoor from "./AddPersonsDoor";
function IndexHouse() {
  // const[state,setState]=useState("");
  const [locksUser, setLocksUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  const[showListPerson,setShowListPerson]=useState(false)
  const handleOpen = (e) => {
    console.log(e);
    console.log(e.state);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    if (e.state === "Open") {
      console.log(e.state);

      console.log(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&state=Closed",
        requestOptions
      );
      fetch(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&state=Closed",
        requestOptions
      );
      window.location.reload();
    } else if (e.state === "Closed") {
      console.log(e.state);

      console.log(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&state=Open",
        requestOptions
      );
      fetch(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&state=Open",
        requestOptions
      );
      window.location.reload();
    }
  };
  useEffect(() => {
    setAdmin(sessionStorage.getItem("userType") === "Propietario");

    //Al cargar el componente hacemos un fetch enviando el token del user, para luego en el servidor buscar las puertas que le pertenecen

    // axios.get("http://localhost:8080/api/records/locksUser",{token:sessionStorage.getItem("tokenUserRegistered")})
    fetch(
      "http://localhost:8080/api/records/locksUser?token=" +
        sessionStorage.getItem("tokenUserRegistered")
    )
      .then((res) => res.json())
      .then((data) => {
        //Solo quiero la información de las cerraduras, por lo que busco dentro de Lock
        const locks = data.map((e) => e.lockId);
        //Cargo los datos a la variable locksUser para usarla posteriormente
        setLocksUser(locks);
        console.log(locks);
        //INFO: para poder controlar si una puerta se abre y cierra, tenemos que controlarlas una a una
        //Habría que identificar de forma única(lockIdentifier) y que cuando clickes sobre el boton de abrir o cerrar
        //envía ese identificador al servidor y allí comprobar si esta abierta o no?????
      });
  }, []);
  return (
    <div>
      <Row className="justify-content-center">
        {locksUser?.map((e, index) => {
          //Recorro las cererrad
          return (
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Row>
                {!admin ? (
                  e.state === "Open" ? (
                    <Card.Body
                      style={{
                        background: "#D5F5E3",
                        color: "#2ECC71",
                        borderStyle: "solid",
                      }}
                    >
                      <Card.Title>{e.lockName.toUpperCase()}</Card.Title>

                      <Button
                        onClick={() => {
                          handleOpen(e);
                        }}
                        variant="outline-success"
                      >
                        <MdLockOutline />
                      </Button>
                    </Card.Body>
                  ) : (
                    <Card.Body
                      style={{
                        background: "#F5B7B1",
                        color: "#E74C3C",
                        borderStyle: "solid",
                      }}
                    >
                      <Card.Title>{e.lockName.toUpperCase()}</Card.Title>

                      <Button
                        onClick={() => {
                          handleOpen(e);
                        }}
                        variant="outline-danger"
                      >
                        <MdLockOutline />
                      </Button>
                    </Card.Body>
                  )
                ) : (
                  <>
                    <Card.Body style={{ borderStyle: "solid" }}>
                      <Card.Title>{e.lockName.toUpperCase()}</Card.Title>

                      <Button variant="outline-secondary" onClick={()=>setShowListPerson(true)}>
                        <MdGroupAdd />
                      </Button>
                      <Button variant="outline-secondary" style={{margin:"20px"}}>
                        <MdDelete />
                      </Button>
                    </Card.Body>
                    <Modal show={showListPerson} onHide={()=>setShowListPerson(false)}>
                        <AddPersonsDoor/>
                    </Modal>
                    
                  </>
                  
                )}
              </Row>
              
            </Card>
            
          );
          
        })}
        <Link to="/add" style={{ margin: "10px" }}>
                      <Button variant="dark">
                        Puerta nueva <MdAddHome></MdAddHome>
                      </Button>
                    </Link>
      </Row>
    </div>
  );
}

export default IndexHouse;
