import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function Registro()
{
    const navigate = useNavigate()
    const [info, setInfo] = useState({usuario:"", clave:"", claveCheck:"", editor:""});

    function alternatePass(id)
    {
        const pass = document.getElementById(id);
        const icon = document.getElementById("img-"+id);
        const eye = "https://cdn-icons-png.flaticon.com/512/159/159078.png";
        const crossed = "https://cdn-icons-png.flaticon.com/512/2710/2710718.png";

        pass.type = (pass.type === "text") ? "password" : "text";
        icon.src = (icon.src === eye)?crossed:eye;
    }

    function registrar()
    {
        if(info.claveCheck !== "" && info.clave === info.claveCheck)
        {
            fetch("/usuarios", {
                method:"POST", headers:{"Content-Type":"application/json"},
                body:JSON.stringify(info)
            });
            alert("Registro exitoso.");
            navigate("/principal");
        }
    }

    const validarCorreo = (evento) => {
        let correoInput = evento.target.value;
        let patternCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        document.getElementById("usuario").style.backgroundColor = (!patternCorreo.test(correoInput))?"#FFC2C2":"white";
    };

    const validarClave = (evento) => {
        let claveInput = evento.target.value;
        let patternClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        document.getElementById(evento.target.id).style.backgroundColor = (!patternClave.test(claveInput))?"#FFC2C2":"white";
    };

    const validarIgualdad = () => {
        document.getElementById("clave").style.backgroundColor = (info.clave !== info.claveCheck)?"#FFC2C2":"white";
        document.getElementById("claveCheck").style.backgroundColor = (info.clave !== info.claveCheck)?"#FFC2C2":"white";
    };

    return (
        <>
            <Modal show={true}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Registrate</h1>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section class="section-registro">
                        <img class="registro-imagen" src="https://icons.veryicon.com/png/o/miscellaneous/taiwu-network-icon-library/not-logged-in-1.png" />
                        <label for="usuario">Correo Electronico: </label>
                        <input id="usuario" class="registro-entrada" type="text" value={info.usuario} onChange={e => {
                            setInfo({...info, usuario: e.target.value})
                        }} onBlur={validarCorreo}/>
                    </section>
                    <section class="section-registro">
                        <img class="registro-imagen" src="https://cdn-icons-png.flaticon.com/512/39/39734.png"/>
                        <label for="clave">Contraseña: </label>
                        <input id="clave" type="password" class="registro-entrada registro-clave" value={info.clave} onChange={e => {
                            setInfo({...info, clave: e.target.value})
                        }} onBlur={validarClave}/>
                        <button type="button" class="registro-ojo" onClick={() => alternatePass('clave')}>
                            <img class="registro-imagen" id="img-clave" src="https://cdn-icons-png.flaticon.com/512/2710/2710718.png" />
                        </button>
                    </section>
                    <section class="section-registro">
                        <img class="registro-imagen" src="https://cdn-icons-png.flaticon.com/512/181/181534.png" />
                        <label for="claveCheck">Verificar Contraseña: </label>
                        <input id="claveCheck" class="registro-entrada registro-clave" type="password" value={info.claveCheck} onChange={e => {
                            setInfo({...info, claveCheck: e.target.value})
                        }} onBlur={(e) => {validarClave(e); validarIgualdad()}}/>
                        <button type="button" class="registro-ojo" onClick={() => alternatePass('claveCheck')}>
                            <img class="registro-imagen" id="img-claveCheck" src="https://cdn-icons-png.flaticon.com/512/2710/2710718.png"/>
                        </button>
                    </section>
                    <section class="section-registro">
                        <img class="registro-imagen" src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/admin-icon.png"/>
                        <label for="admin">Obtener privilegios de Admistrador</label>
                        <input id="admin" type="checkbox" class="registro-caja" checked={info.editor} onChange={e => {
                            setInfo({...info, editor: e.target.checked})
                        }}/>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (info.claveCheck !== "" && info.clave !== info.claveCheck) &&
                        <span style={{margin:"auto", color:"red"}}>* Las claves ingresadas no coinciden *</span>
                    }
                    <Button className="login-iniciar" variant="dark" onClick={registrar}>
                        Registrarme
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};