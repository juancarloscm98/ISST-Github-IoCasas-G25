import {MdLockOutline} from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function IndexHouse() {
    const[locksUser,setLocksUser]=useState([])

    useEffect(()=>{
        //Al cargar el componente hacemos un fetch enviando el token del user, para luego en el servidor buscar las puertas que le pertenecen
        fetch("http://localhost:8080/api/records/locksUser?token="+localStorage.getItem("tokenUserRegistered"))
        .then(res=>res.json())
        .then(data=>{
            //Solo quiero la información de las cerraduras, por lo que busco dentro de Lock        
            const locks=data.map((e)=>e.lockId)
            //Cargo los datos a la variable locksUser para usarla posteriormente
            setLocksUser(locks);
            console.log(locks);
           
        })
        
    },[])
    return (
        <div>
            
            
<Row className="justify-content-center">
    
           {locksUser?.map((e)=>{
            //Recorro las cererrad
            return(

                    <Card style={{width: '18rem', margin: "10px"}}>
                       <Row>
                        <Card.Body>
                            <Card.Title>{e.lockName.toUpperCase()}</Card.Title>
                            <Card.Text>
                              
                            </Card.Text>
                            <Button variant="dark" href="/doors"><MdLockOutline/></Button>
                        </Card.Body>
                        </Row>
                    </Card>
                
            
            )
           })}</Row>
          
           
        
                
                <Link to="/add">
                    <Button variant="dark">Puerta nueva <VscAdd></VscAdd></Button>
                </Link>


        </div>
    );
}

export default IndexHouse;