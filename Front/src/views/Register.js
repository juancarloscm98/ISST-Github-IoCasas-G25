import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { HashLoader } from "react-spinners";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Usuario");
  const [loading,setLoading]=useState(false);
  
  const MySwal = withReactContent(Swal);

  const activeLoadSpinner=()=>{
   setLoading(true);

  }
  const disableLoadSpinner=()=>{
    setLoading(false)

  }
  const register = () => {
    //Creo la configuracion del fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //Defino el body de la petición
      body: JSON.stringify({
        usertype: userType,
        username: username,
        password: password, //envio encriptada el parámetro de la contraseña
      }),
    };

    fetch("http://localhost:8080/api/users/register", requestOptions).then(
      (res) => {
        //Miro si la peticion devuelve un 400 o no
        if (res.status === 400) {
          //Uso una libreria extenera llamada SweetAlert 2, cuando el codigo es 400 se ejecuta el fire
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario ya existe!",
          });
          setUsername("");
          setPassword("");
        } else {
          //En caso diferente de 400, Manda mensaje de exito
          MySwal.fire({
            icon: "success",
            title: "Usuario creado con exito",
            text: "El usuario se ha creado correctamente!",
          });
          setUsername("");
          setPassword("");
        }
      }
    );
  };
  //Aqui defino las acciones que hago al darle al botón aceptar
  const handleSubmit = (e) => {
    activeLoadSpinner();
    register();
    disableLoadSpinner();
  };

  return (
    <div className="App">
      <Form style={{ margin: "100px" }}>
        <Row className="justify-content-center">
          <Col xs={4}>
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Nombre de usuario"
            />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Contraseña"
            />
            <label>Propietario</label>
            <Form.Check
              value={userType}
              onClick={() => {
                if (userType === "Usuario") {
                  setUserType("Propietario");
                } else {
                  setUserType("Usuario");
                }
              }}
            />
          </Col>
          <Row></Row>
        </Row>
      </Form>
      <Row>
        <Col>
          <Button variant="dark" href="/">
            Volver
          </Button>
        </Col>
        <Col>
          <Button variant="dark" onClick={handleSubmit}>
            Aceptar
          </Button>
        </Col>
      </Row>
      <HashLoader loading={loading} color="#36d7b7" />
    </div>
  );
}
