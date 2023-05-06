import { MdLockOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
function MyBookings() {


  const [locksAdmin,setLocksAdmin]=useState([])//Cerraduras del administrador


  const updateState=(lock)=>{
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
   if(lock.state==="Closed"){
    fetch("http://localhost:8080/api/locks/user/changeState?lockId="+lock.lockId.lockId+"&state=Open",requestOptions)
   }else if(lock.state==="Open"){
    fetch("http://localhost:8080/api/locks/user/changeState?lockId="+lock.lockId.lockId+"&state=Closed",requestOptions)

   }
   
    
  }


  const insertRecord = async (lock) => {
    let state=""
    if(lock.state==="Closed"){
      state="Open"
    }else if(lock.state==="Open"){
      state="Closed";
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lockId: lock.lockId.lockId,
        lockName: lock.lockId.lockName,
        lockIdentifier: lock.lockId.lockIdentifier,
        dateOfRegister: lock.lockId.dateOfRegister,
      }),
    };
    fetch(
      "http://localhost:8080/api/records/record?userToken=" +
        sessionStorage.getItem("tokenUserRegistered") +
        "&state=" +
        state,
      requestOptions
    );
  };

  const handleOpen = (e) => {
      insertRecord(e);
      updateState(e);
      window.location.reload();
    
     
  };
  
  const getUserLocks=()=>{
    fetch(
      "http://localhost:8080/api/locks/user/locksUser?token=" +
        sessionStorage.getItem("tokenUserRegistered")
    )
      .then((res) => res.json())
      .then((data) => {
        setLocksAdmin(data);
        

        //INFO: para poder controlar si una puerta se abre y cierra, tenemos que controlarlas una a una
        //Habría que identificar de forma única(lockIdentifier) y que cuando clickes sobre el boton de abrir o cerrar
        //envía ese identificador al servidor y allí comprobar si esta abierta o no?????
      });

  }


  useEffect(() => {
    
    getUserLocks();

  
  }, []);
  return (
    <div>
      <Row className="justify-content-center">
        {locksAdmin?.map((e, index) => {
          return (
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Row>
                {
                  
                  e.state === "Open" ? (
                    <Card.Body
                      style={{
                        background: "#D5F5E3",
                        color: "#2ECC71",
                        borderStyle: "solid",
                      }}
                    >
                      <Card.Title>{e.lockId.lockName}</Card.Title>

                      <Button
                      style={{margin:"20px"}}
                        onClick={() => {
                          handleOpen(e);
                        }}
                        variant="outline-success"
                      >
                        
                        <MdLockOutline />
                      </Button>
                      <Card.Subtitle>Propietario: {e.userId.username}</Card.Subtitle>
                    </Card.Body>
                  ) : (
                    <Card.Body
                      style={{
                        background: "#F5B7B1",
                        color: "#E74C3C",
                        borderStyle: "solid",
                      }}
                    >
                      <Card.Title>{e.lockId.lockName}</Card.Title>
                      
                      <Button
                      style={{margin:"20px"}}
                        onClick={() => {
                          handleOpen(e);
                        }}
                        variant="outline-danger"
                      >
                        <MdLockOutline />
                      </Button>

                      <Card.Subtitle>Propietario: {e.userId.username}</Card.Subtitle>
                     

                    </Card.Body>
                    
                  )
                }
              </Row>
            </Card>
          );
        })}
        
      </Row>
    </div>
  );
}

export default MyBookings;
