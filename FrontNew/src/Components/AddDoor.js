import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
function AddDoor(){
    const[lockName,setLockName]=useState("");
    const MySwal = withReactContent(Swal);
    const handleSubmit=async(e)=>{
      
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lockName: lockName,
            }),
          };
          //Mando el token de el usuario que agrega esa puerta para crear la relacion en records
          fetch("http://localhost:8080/api/locks/lockRegister?tokenUser="+localStorage.getItem("tokenUserRegistered"),requestOptions)
          .then(res=>{
            if(res.status===400){
              MySwal.fire({
                icon: "error",
                title: "ooops",
                text: "La puerta ha sido agregada correctamente",
              });

            }else{
              MySwal.fire({
                icon: "success",
                title: "Puerta agregada con exito",
                text: "La puerta ha sido agregada correctamente",
              });
            }
          })
          
          setLockName("");

    }
    return(
        <div>
            <Form style={{ margin: "10px" }} onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={6}>
              <Form.Group className="mb-4">
                <Form.Label>Puerta nueva</Form.Label>
                <Form.Control
                  value={lockName}
                  onChange={(e) => {
                    setLockName(e.target.value);//Voy actualizando el valor de username
                  }}
                  placeholder="Nombre de la puerta"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
            <Button variant="dark"  onClick={handleSubmit}//llamo al metodo para su funcionalidad
            >
                Agregar
              </Button>
           
            </Col>
          </Row>
        </Container>
      </Form>
            <Button variant="dark" href="/indexHouse">Volver</Button>
        </div>

    )
}
export default AddDoor;