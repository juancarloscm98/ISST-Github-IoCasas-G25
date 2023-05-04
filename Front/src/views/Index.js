import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../Assets/1366_2000.jpeg"
import ioCasas from "../Assets/Captura de pantalla 2023-04-12 a las 0.18.06.png"
import { useState,useEffect } from "react";
export default function Index(){

    const[logged,setLogget]=useState(false);
    useEffect(()=>{
        console.log(sessionStorage.getItem("boolUserRegistered"));
        if(sessionStorage.getItem("boolUserRegistered")==="true"){

            setLogget(true);
        }
    },[])
    return(
<div>
            <div style={{ background: "#FDFDFD" }}>
                <Row className="justify-content-center">
                    <Col xs={12}>
                    
                    <img height={"400px"} width={"50%"} src={ioCasas} />
                   
                    </Col>
                    
                    <Row className="justify-content-center">
                
               {
                logged?(<h2>Bienvenido!!</h2>):(<Card border="light" style={{width: '40rem', margin: "10%",padding:"0px"}}>
                <h3>¿Aún no te has registrado en nuestra web?</h3>
                <h4>Regístrate cuanto antes!!</h4>
                <Col xs={12} className="end">

                <Button href="/register"  variant="dark">Darse de alta</Button>
                </Col>
                
            </Card>)
               }
                
          
                </Row>
                </Row>
                
                
            </div>
            <div>
            <footer>

  <div className="text-center p-3" style={{ background: "#FDFDFD" }}>
    © 2023
  
  </div>
 
</footer>
        </div>
        </div>
    
    );
}
