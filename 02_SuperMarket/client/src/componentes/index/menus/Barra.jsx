import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Carrito from '../carrito/Carrito';
import Login from "../../login/Login";

export default function Barra() {
    return (
        <>
            <Navbar fixed="top" bg="warning" variant="ligth">
                <Container>
                    <Navbar.Brand href="#" className="barra-titulo">
                        <img className="barra-logo" src="https://cdn-icons-png.flaticon.com/512/107/107831.png"/>
                        SuperMarket
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Login/>
                            <Carrito/>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section style={{padding:"48px"}}></section>
        </>
    );
};