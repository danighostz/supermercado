import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Sesion } from "./App";

export default function Usuario()
{
    const [sesion, setSesion] = useContext(Sesion);
    return (
        <>
            <Modal show={true}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Bienvenido,</h1>
                    <h2>¿Qué deseas realizar hoy?</h2>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section class="section-usuario">
                        <NavLink to="/principal">
                            <Button variant="dark" style={{width:"100%"}}>
                                Ir a comprar productos
                            </Button>
                        </NavLink>
                        <NavLink to="/envio">
                            <Button variant="dark" style={{width:"100%"}}>
                                Configurar mis entregas
                            </Button>
                        </NavLink>
                        
                        {
                            sesion.admin &&
                            <NavLink to="/inventario">
                                <Button variant="dark" style={{width:"100%"}}>
                                    Administrar inventario
                                </Button>
                            </NavLink>
                        }
                    </section>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            
            
            
        </>
    );
};