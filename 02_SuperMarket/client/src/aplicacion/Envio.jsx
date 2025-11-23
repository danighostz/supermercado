import "../css/index/Envio.css"

import React, { useState, useEffect } from 'react';

export default function Envio()
{
    const [departamentos, setDepartamentos] = useState([{}]);
    const [municipios, setMunicipios] = useState([{}]);
    const [sedes, setSedes] = useState([{}]);
    const [domicilios, setDomicilios] = useState([{}]);

    useEffect(() => {
        fetch("/departamentos").
        then(res => res.json()).
        then(data => setDepartamentos(data));
    }, [departamentos]);

    function nuevoEnvio()
    {
        const add = document.getElementById("agregar").checked;
        document.getElementById("agregar-envio").style.display = add ? "initial":"none";
    }

    function seleccionMetodo()
    {
        document.getElementById("continuar").disabled = false;
    }

    function confirmarLugar()
    {
        let opcion = document.getElementById("metodo").value;
        let opuesto = (opcion === "envio")?"reclamo":"envio";

        document.getElementById(`metodo-${opcion}`).style.display = "initial";
        document.getElementById(`metodo-${opuesto}`).style.display = "none";
    }

    function seleccionarDepartamento(e)
    {
        fetch(`/municipios/${e.target.value}`).
        then(res => res.json()).
        then(data => setMunicipios(data));
    }

    return (
        <>
            <section>
                <h1>Configura la entrega de tus productos</h1>
                <label for="metodo">¿Como deseas reclamar tus productos?</label>
                <select id="metodo" size="2" onChange={confirmarLugar}>
                    <option value="" hidden></option>
                    <option value="envio">Envio a domicilio</option>
                    <option value="reclamo">Reclamar en establecimiento</option>
                </select>
            </section>

            <section id="metodo-reclamo">
                <label for="envio">Selecciona alguna de nuestras sedes:</label>
                <select id="envio" size={sedes.length} onChange={seleccionMetodo}>
                    {
                        sedes.map(s => <option value={s.nombre}>{s.nombre}</option>)
                    }
                </select>
            </section>

            <section id="metodo-envio">
                <label for="envio">Selecciona un domicilio configurado previamente:</label>
                <select id="envio" size={domicilios.length} onChange={seleccionMetodo}>
                    {
                        domicilios.map(d => <option value={d.nombre}>{d.nombre}</option>)
                    }
                </select>
                <section>
                    <label for="agregar">¿Deseas añadir otro domicilio de envio?</label>
                    <input id="agregar" type="checkbox" onChange={nuevoEnvio}/>
                </section>

                <section id="agregar-envio">
                    <h1>Agregar nuevo domicilio de envio</h1>
                    <section>
                        <label for="departamento">Departamento:</label>
                        <select id="departamento" onChange={seleccionarDepartamento}>
                            <option value="" hidden></option>
                            {
                                departamentos.map(d => <option value={d.nombre}>{d.nombre}</option>)
                            }
                        </select>

                        <label for="municipio">Municipio:</label>
                        <select id="municipio">
                            <option value="" hidden></option>
                            {
                                municipios.map(m => <option value={m.nombre}>{m.nombre}</option>)
                            }
                        </select>
                    </section>
                    <section>
                        <label for="direccion">Direccion:</label>
                        <input id="direccion" type="text"/>

                        <label for="telefono">Telefono de contacto:</label>
                        <input id="telefono" type="text"/>
                    </section>
                    <button type="button" onclick="">Agregar a la lista</button>
                </section>
            </section>

            <button id="continuar" disabled>Continuar</button>
        </>
    );
};