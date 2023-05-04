import { Button, Container } from "react-bootstrap"
import { redirect } from "react-router-dom"
import { Card } from "react-bootstrap"
import Row from "react-bootstrap/Row";
export default function Profile(){
    function deleteLocalStorage(){
      sessionStorage.clear()
    //  sessionStorage.removeItem("boolUserRegistered")
      //  sessionStorage.removeItem("tokenUserRegistered")
        //sessionStorage.removeItem("usernameUserResigestered")
        window.location.reload() 
        
        
    }
    return(
        <div className="App">
            <Container>
            <Row className="justify-content-center">
            <Card
            border="light"
         
          className="mb-2"
        >
          
          <Card.Body>
            <Card.Header>
                INFORMACIÓN
            </Card.Header>
            <Card.Title> 
                 </Card.Title>
            <Card.Text>
              Nombre de usuario: {sessionStorage.getItem("usernameUserResigestered")}
            </Card.Text>
            <Card.Text>
              Tipo de usuario: {sessionStorage.getItem("userType")}
            </Card.Text>
            <Button variant="dark" href="/" onClick={deleteLocalStorage}>Desconectar</Button>
          </Card.Body>
        </Card>
        </Row>
           </Container>
        </div>
    )
}
