import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Carrito from '../carrito/Carrito';
import Login from "../../login/Login";

export default function Barra() {
    return (
        <>
            <section style={{ padding: "33px" }}></section>
            <Navbar fixed="bottom" bg="warning" variant="ligth">
                <Container >
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Text>
                            <h5 style={{color:"black"}}>Created by | Levir Hernandez | Jhonatan Hernandez | Darien Castañeda | Juan Atehortua</h5>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="https://www.facebook.com/" target="_blank">
                                <img className="pie-redes" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" />
                            </a>
                            <a href="https://twitter.com/" target="_blank">
                                <img className="pie-redes" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Twitter_Logo.png" />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank">
                                <img className="pie-redes" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" />
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};