import "../../css/login/Login.css";

import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, NavLink } from 'react-router-dom';

import { Sesion } from "../../aplicacion/App";

export default function Carrito() {
    const navigate = useNavigate()
    const [sesion, setSesion] = useContext(Sesion);

    const [correo, setCorreo] = useState({value:"", bg:"white"});
    const [clave, setClave] = useState({ value: "", bg: "white" });
    const [error, setError] = useState(false);

    const [login, setLogin] = useState(false);
    const [ojo, setOjo] = useState({
        type: "password",
        src: "https://cdn-icons-png.flaticon.com/512/2710/2710718.png"
    });

    const cerrarLogin = () => setLogin(false);
    const abrirLogin = () => setLogin(true);

    const mostrarOjo = () => setOjo({
        type: "text",
        src: "https://cdn-icons-png.flaticon.com/512/159/159078.png"
    });

    const ocultarOjo = () => setOjo({
        type:"password",
        src:"https://cdn-icons-png.flaticon.com/512/2710/2710718.png"
    });

    const manejarOjo= () => {
        if (ojo.type === "password") mostrarOjo();
        else ocultarOjo();
    };

    const validarCorreo = (evento) => {
        let correoInput = evento.target.value;
        let patternCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!patternCorreo.test(correoInput)) setCorreo({ value: correo.value, bg:"#FFC2C2"});
        else setCorreo({ value: correo.value, bg: "white" });
    };

    const validarClave = (evento) => {
        let claveInput = evento.target.value;
        let patternClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!patternClave.test(claveInput)) setClave({ value: clave.value, bg: "#FFC2C2" });
        else setClave({ value: clave.value, bg: "white" });
    };

    const validarLogin = () => {
        if(correo.value !== "" && clave.value !== "")
        {
            fetch(`/usuarios/${correo.value}/${clave.value}`).
            then(res => res.json()).
            then(usuario => {
                console.log(usuario);
                setSesion({...sesion, login:true, admin:usuario.editor});
                navigate('/usuario');
            }).
            catch(err => {
                setError(true);
            });
        }
    };

    const enviarCorreo = () => {
        alert(`Clave de respado enviada al correo: <${correo.value}>`);
        fetch(`/recuperar/${correo.value}`);
    };
    
    return (
        <>
            <Button variant="dark" onClick={abrirLogin} style={{marginRight:"20px"}}>Login / Registrarse</Button>
            <Modal show={login} onHide={cerrarLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="login-fila">
                        <img className="login-imagen" src="https://icons.veryicon.com/png/o/miscellaneous/taiwu-network-icon-library/not-logged-in-1.png" />
                        <label for="correo">Correo Electronico: </label>
                        <input className="login-entrada" id="correo" type="text" value={correo.value} onChange={(evento) => setCorreo({ value: evento.target.value, bg: correo.bg})} onBlur={validarCorreo} style={{ backgroundColor: correo.bg }} />
                    </section>
                    <section className="login-fila">
                        <img className="login-imagen" src="https://cdn-icons-png.flaticon.com/512/1/1213.png" />
                        <label for="clave">Contraseña: </label>
                        <input className="login-entrada login-clave" id="clave" type={ojo.type} value={clave.value} onChange={(evento) => setClave({ value: evento.target.value, bg: clave.bg})} onBlur={validarClave} style={{ backgroundColor:clave.bg}}/>
                        <Button className="login-ojo" variant="light" onClick={manejarOjo}>
                            <img className="login-imagen" src={ojo.src} />
                        </Button>
                    </section>
                    <section>
                        <Button className="login-iniciar" variant="dark" onClick={validarLogin}>Login</Button>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    {
                        error &&
                        <span style={{margin:"auto", color:"red"}}>
                            * El usuario ingresado no se encuentra registrado *
                        </span>
                    }
                </Modal.Footer>
                <Modal.Footer>
                    <section className="login-registrarse" style={{marginBottom:"15px"}}>
                        <span>Si no estas registrado</span>
                        <NavLink to="/registro">¡Registrate aqui!</NavLink>
                    </section>
                    <section className="login-registrarse">
                        <span>¿Olvidaste tu clave?</span>
                        <NavLink to="" onClick={enviarCorreo}>Recuperación por correo</NavLink>
                    </section>
                </Modal.Footer>
            </Modal>
        </>
    );
};