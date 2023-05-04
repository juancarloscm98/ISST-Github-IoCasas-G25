import { MdLockOutline, MdSpaceBar } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AddPersonsDoor from "./AddPersonsDoor";
import Swal from "sweetalert2";
function IndexHouse() {
  const [locksUser, setLocksUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  const[showListPerson,setShowListPerson]=useState(false)
  const[showAdd,setShowAdd]=useState(false);


  const deleteLock=async(lock)=>{
    const requestOptions={
      method:"DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lockId: lock.lockId,
        lockName:lock.lockName,
        lockIdentifier:lock.lockIdentifier,
        userId:lock.userId,
        dateOfRegister:lock.dateOfRegister
    }),
    }
    Swal.fire({
      title:'¿Seguro que desea eliminar la cerradura?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#2A1D1B ',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result)=>{
      if(result.isConfirmed){
        fetch("http://localhost:8080/api/locks/delete",requestOptions);
        window.location.reload();
      }
     
    })
    
     
   

  }



  const handleOpen = (e) => {
    console.log(e);
    console.log(e.state);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    if (e.state === "Open") {
      fetch(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&userToken="+
          sessionStorage.getItem("tokenUserRegistered")+
          "&state=Closed",
        requestOptions
      );
      window.location.reload();
    } else if (e.state === "Closed") {
      fetch(
        "http://localhost:8080/api/locks/updateState?lockIdentifier=" +
          e.lockIdentifier +
          "&userToken="+
          sessionStorage.getItem("tokenUserRegistered")+
          "&state=Open",
        requestOptions
      );
      window.location.reload();
    }
  };
  useEffect(() => {
    setAdmin(sessionStorage.getItem("userType")==="Propietario");
    if(sessionStorage.getItem("userType") === "Propietario"){
      setShowAdd(true);
    }else{
      setShowAdd(false);
    }
    //Al cargar el componente hacemos un fetch enviando el token del user, para luego en el servidor buscar las puertas que le pertenecen

    fetch(
      "http://localhost:8080/api/locks/user/locksUser?token=" +
        sessionStorage.getItem("tokenUserRegistered")
    )
      .then((res) => res.json())
      .then((data) => {
       
        
        //Cargo los datos a la variable locksUser para usarla posteriormente
        setLocksUser(data);

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
                      <Card.Title>{e.lockName}</Card.Title>

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
                      <Card.Title>{e.lockName}</Card.Title>

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
                      <Button variant="outline-secondary" style={{margin:"20px"}} onClick={()=>deleteLock(e)}>
                        <MdDelete />
                      </Button>
                    </Card.Body>
                    <Modal show={showListPerson} onHide={()=>setShowListPerson(false)}>
                        <AddPersonsDoor/>
                    </Modal>
                    
                  </>
                  
                )
           
                
              
                }
              </Row>
              
            </Card>
            
          );
          
        })}
        {
          showAdd?(<Link   to="/add" style={{ margin: "10px" }}>
          <Button variant="dark">
            Puerta nueva <MdAddHome></MdAddHome>
          </Button>
        </Link>):(null)
        }
        
      </Row>
    </div>
  );
}

export default IndexHouse;
