import { Button, Container } from "react-bootstrap"
import { redirect } from "react-router-dom"
import { Card } from "react-bootstrap"
import Row from "react-bootstrap/Row";
export default function Profile(){
    function deleteLocalStorage(){
        localStorage.removeItem("boolUserRegistered")
        localStorage.removeItem("tokenUserRegistered")
        localStorage.removeItem("usernameUserResigestered")
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
              Nombre de usuario: {localStorage.getItem("usernameUserResigestered")}
            </Card.Text>
            <Button variant="dark" href="/" onClick={deleteLocalStorage}>Desconectar</Button>
          </Card.Body>
        </Card>
        </Row>
           </Container>
        </div>
    )
}
