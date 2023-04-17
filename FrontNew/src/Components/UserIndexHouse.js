import { Card } from "react-bootstrap";
import Button from "react-bootstrap";
function UserIndexHouse(){
<Card.Body
                      style={{
                        background: "#D5F5E3",
                        color: "#2ECC71",
                        borderStyle: "solid",
                      }}
                    >
                      <Card.Title>{e.lockName.toUpperCase()}</Card.Title>

                      <Button
                        onClick={() => {
                          handleOpen(e);
                        }}
                        variant="outline-success"
                      >
                        <MdLockOutline />
                      </Button>
                    </Card.Body>
}