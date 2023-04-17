import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";

//Librería para alertas bonitas
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault(); // permite que no envíe los datos de forma predeterminada y se pueda manejar el evento
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const response = await fetch(
      "http://localhost:8080/api/users/login",
      requestOptions

    );
   

    const data = await response.json();

    //Compruebo que el token del usuario no sea ni null ni este vacío
    if (data.token !== null && data.token !== "") {
      //Creo en la memoria loca los siguientes parametro para usarlos luego en la barra de navegacion
      sessionStorage.setItem("tokenUserRegistered", data.token);
      sessionStorage.setItem("boolUserRegistered", "true");//Lo usaremos para identificar al usuario loggeado
      sessionStorage.setItem("usernameUserResigestered", data.username);
      console.log(sessionStorage.getItem("boolUserRegistered"))
      sessionStorage.setItem("userType", data.usertype);
      //Recargo la pagina
      return window.location.reload()
    } else {
        //En caso de que el token no concuerde, el parametro que identifica si esta registrado es null
      localStorage.setItem("boolUserRegistered", "false");
      //Muestra por pantalla una alerta
      MySwal.fire({
        icon: "error",
        title: "Usuario no registrado",
        confirmButtonText: 'Vale',
        text: "El usuario no existe",
      }).then(()=>{
        setUsername("")
        setPassword("")
      });
    }
    
  
  };

  return (
    <div className="App">
      <Form style={{ margin: "10px" }} onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={6}>
              <Form.Group className="mb-4">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);//Voy actualizando el valor de username
                  }}
                  placeholder="Nombre de usuario"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);//Voy actualizando el valor de la contraseña
                  }}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button variant="dark"  onClick={handleSubmit}//llamo al metodo para su funcionalidad
            >
                Aceptar
              </Button>
           
              
              <Card.Body>
                <Card.Link href="/register">Registrarse</Card.Link>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
