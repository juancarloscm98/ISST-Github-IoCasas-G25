import { MdLockOutline, MdSpaceBar } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link, json } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AddPersonsDoor from "./AddPersonsDoor";
import Swal from "sweetalert2";
function MyDoors() {
  const [locksUser, setLocksUser] = useState([]); //Cerraduras asignadas al user
  const [showListPerson, setShowListPerson] = useState(false);
  const [state, setState] = useState("Closed");
  const [lockId,setLockId]=useState();

  const deleteLock = async (lock) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lockId: lock.lockId,
        lockName: lock.lockName,
        lockIdentifier: lock.lockIdentifier,
        userId: lock.userId,
        dateOfRegister: lock.dateOfRegister,
      }),
    };
    Swal.fire({
      title: "¿Seguro que desea eliminar la cerradura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2A1D1B ",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8080/api/locks/delete", requestOptions);
        window.location.reload();
      }
    });
  };

  const getAdminLocks = () => {
    fetch(
      "http://localhost:8080/api/locks/user/locksAdmin?token=" +
        sessionStorage.getItem("tokenUserRegistered")
    )
      .then((res) => res.json())
      .then((data) => {
        //Cargo los datos a la variable locksUser para usarla posteriormente
        data.map((e) => (e.state = state));
        setLocksUser(data);
      });
  };

  useEffect(() => {
    
    getAdminLocks();
  }, []);
  return (
    <div>
      <Row className="justify-content-center">
        {locksUser?.map((e, index) => {
          //Recorro las cererrad
          return (
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Row>
                {
                  <>
                    <Card.Body style={{ borderStyle: "solid" }}>
                      <Card.Title>{e.lockName.toUpperCase()}</Card.Title>
                      <Link to={"/addPersonDoor/"+e.lockId}
                      >
                      <Button
                        variant="outline-secondary"  
                      >
                       
                        <MdGroupAdd />
                      </Button>
                      </Link>
                      <Button
                        variant="outline-secondary"
                        style={{ margin: "20px" }}
                        onClick={() => deleteLock(e)}
                      >
                        <MdDelete />
                      </Button>
                    </Card.Body>

                    <Modal
                      show={showListPerson}
                      onHide={() => setShowListPerson(false)}
                    >
                      
                      <AddPersonsDoor lockId={lockId} name={e.lockName}/>
                    </Modal>
                  </>
                }
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

export default MyDoors;
