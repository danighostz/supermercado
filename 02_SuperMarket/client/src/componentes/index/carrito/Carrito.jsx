import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Producto from './Producto';
import { compras, modal } from "../../../aplicacion/Principal";

export default function Carrito()
{
    const [productos, setProductos] = useContext(compras);
    const [visible, setVisible] = useContext(modal);
    
    const cerrarCarrito = () => setVisible(false);
    const abrirCarrito = () => setVisible(true);
    const vaciarCarrito = () => setProductos([]);

    return (
        <>
            <Button variant="dark" onClick={abrirCarrito}>
                Ir al carrito
                <label className="modal-productos">{productos.length}</label>
            </Button>
            <Modal show={visible} onHide={cerrarCarrito}>
                {productos.length > 0 ?
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Carrito de compras</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {productos.map((e) => <Producto {...e} />)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={vaciarCarrito} style={{ width: "100%" }}>Vaciar el carrito</Button>
                            <Button variant="warning" onClick={cerrarCarrito} style={{ width: "100%" }}>Configurar el método de pago</Button>
                        </Modal.Footer>
                    </> :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Carrito de compras</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-vacio">
                            <h2>Tu carrito se encuentra vacio.</h2>
                            <img src="https://cdn-icons-png.flaticon.com/512/1/1393.png" width="100px"/>
                            <h2>Agrega algun producto para poder visualizarlo aqui.</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={cerrarCarrito} style={{ width: "100%" }}>Continuar comprando</Button>
                        </Modal.Footer>
                    </>
                }
            </Modal>
        </>
    );
};