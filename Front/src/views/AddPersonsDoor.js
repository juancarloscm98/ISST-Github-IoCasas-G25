import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import React from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";
export default function AddPersonsDoor(props) {
  //const [lockIdentifier,setLockIdentifier]= useState()
  let {lockId}=useParams();
  const [users, setUsers] = useState([]);

  const [usuarioAsignado, setUsuarioAsignado] = useState(null);
  const [selectedDateInicio, setSelectedDateInicio] = useState(null);
  const [selectedDateFin, setSelectedDateFin] = useState(null);
  const getAllUsers = () => {
    fetch(
      "http://localhost:8080/api/users/allUsers?token='" +
        sessionStorage.getItem("tokenUserRegistered") +
        "'"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  const handleChangesInicio = (date) => {
    setSelectedDateInicio(date);
   
  };
  const handleChangesFinish = (date) => {
    setSelectedDateFin(date);
  };
  const handleSelectedUser = (event) => {
    setUsuarioAsignado(event.value);
  };
  const selectorUsers = () => {
    const options = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      options.push({
        value: user.token,
        label: user.username,
      });
    }
    return options;
  };


  const createReserve = () => {
    const dI = new Date(selectedDateInicio._d.toString());
    const dayI = dI.getDate().toString().padStart(2,'0');
    const monthI = new Intl.DateTimeFormat('en-US', { month:'2-digit' }).format(dI);
    const yearI = dI.getFullYear().toString();
    const fechaInicio = `${dayI}-${monthI}-${yearI}`;
   
    console.log(fechaInicio);
    const dF = new Date(selectedDateFin._d.toString());
    const dayF = dF.getDate().toString().padStart(2,'0');
    const monthF = new Intl.DateTimeFormat('en-US', { month:'2-digit' }).format(dF);
    const yearF = dF.getFullYear().toString();
    const fechaFin = `${dayF}-${monthF}-${yearF}`;
    console.log(fechaFin);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },

    };

    console.log("http://localhost:8080/api/locks/user/reserve?lockId="+lockId+"&token=" + usuarioAsignado);

        fetch("http://localhost:8080/api/locks/user/reserve?lockId="+lockId+"&token=" + usuarioAsignado+"&fechaInicio="+fechaInicio+"&fechaFin="+fechaFin,requestOptions)
        .then((res=>{
          if(res.status===200){
            Swal.fire({
              title: 'Reserva realizada',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#000000',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {

                window.location.reload();
              }
            })
            

          }
        }));
  };

  useEffect(() => {
    getAllUsers();
    selectorUsers();
  }, []);

  return (
    <Container className="App"  style={{width:"50%"}}>
        <h1>Asignacion de reservas</h1>
      <Form style={{ margin: "20px" }}>
        
        <Container>
          <Form.Label>Usuarios</Form.Label>
          <Select onChange={handleSelectedUser} options={selectorUsers()} />

          <Row>
            
              <Form.Label>Fecha de inicio</Form.Label>
              <Datetime
                selected={selectedDateInicio}
                onChange={(date) => handleChangesInicio(date)}
                inputProps={{ placeholder: "Seleccione fechas" }}
              />
          
              <Form.Label>Fecha de fin</Form.Label>
              <Datetime
                selected={selectedDateFin}
                onChange={(date) => handleChangesFinish(date)}
                inputProps={{ placeholder: "Seleccione fechas" }}
              />
           
          </Row>
        <Row>
            <Col>
          <Button style={{margin:"20px"}} variant="dark" onClick={() => createReserve()}>
            Guardar
          </Button>
          </Col>
          <Col>
          <Button style={{margin:"20px"}}  variant="dark" href="/myDoors">
                Volver
          </Button>
          </Col>
          
          </Row>
        </Container>
      </Form>
    </Container>
  );
}
