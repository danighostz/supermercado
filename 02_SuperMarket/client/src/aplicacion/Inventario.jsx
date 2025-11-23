import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Inventario()
{
    const [vision,  setVision] = useState({nuevaCategoria:false, nuevoProducto:false});
    const [info, setInfo] = useState({categoria:"", nombre:"", descripcion:"", imagen:"", precio:""});
    
    const [categorias, setCategorias] = useState([{}]);
    const [productos, setProductos] = useState([{}]);

    const [item, setItem] = useState({categoria:"", producto:""});

    useEffect(() => {
        fetch("/categorias").
        then(res => res.json()).
        then(data => setCategorias(data));
    }, [categorias]);

    const agregarCategoria = () => {
        console.log(info);
        fetch("/categorias", {
            method:"POST", headers:{"Content-Type":"application/json"},
            body:JSON.stringify(info)
        });
        setVision({...vision, nuevaCategoria:false});
        document.getElementById("accion").value = "";
        alert("Categoria agregada exitosamente.");
    };
    
    const agregarProducto = () => {
        console.log(info);
        fetch("/productos", {
            method:"POST", headers:{"Content-Type":"application/json"},
            body:JSON.stringify(info)
        });
        setVision({...vision, nuevoProducto:false});
        document.getElementById("accion").value = "";
        alert("Producto agregado exitosamente.");
    };

    const selectAccion = (e) => {
        if(e.target.value === "categoria")
        {
            setVision({...vision, nuevaCategoria:true, nuevoProducto:false});
            setInfo({categoria:""});
        }
        else
        {
            setVision({...vision, nuevaCategoria:false, nuevoProducto:true});
            setInfo({categoria:"", nombre:"", descripcion:"", imagen:"", precio:""});
        }
    };

    const seleccionarCategoria = (e) => {
        setItem({...item, categoria:e.target.value});
        fetch(`/productos/${e.target.value}`).
        then(res => res.json()).
        then(data => setProductos(data));
        console.log(info);
    };

    const eliminarItem = () => {
        if(item.producto === "")
        {
            fetch(`/categorias/${item.categoria}`, {method:"DELETE"});
        }
        else
        {
            fetch(`/categorias/${item.categoria}/${item.producto}`, {method:"DELETE"});
        }
        seleccionarCategoria({target:{value:item.categoria}});
        console.log(item);
    };

    return (
        <>
            <Modal size="lg" show={true}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Administrador de inventario</h1>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="section-inventario">
                        <label for="accion">¿Qué desea añadir?</label>
                        <select id="accion" className="inventario-entrada" onChange={selectAccion}>
                            <option value="" hidden></option>
                            <option value="categoria">Categoria</option>
                            <option value="producto">Producto</option>
                        </select>
                    </section>
                    <Modal.Footer></Modal.Footer>
                    {
                        vision.nuevaCategoria &&
                        <>
                            <section className="section-inventario">
                                <label for="nuevaCategoria">Nombre de categoria:</label>
                                <input id="nuevaCategoria" className="inventario-entrada" type="text" value={info.categoria} onChange={e => setInfo({...info, categoria:e.target.value})}/><br/>
                                <Button id="agregarCategoria" variant="dark" onClick={agregarCategoria}>
                                    Agregar categoria
                                </Button>
                            </section>
                            <Modal.Footer></Modal.Footer>
                        </>
                    }
                    {
                        vision.nuevoProducto &&
                        <>
                            <section>
                                <section className="section-inventario">
                                    <label for="categoria">Categoria de producto:</label>
                                    <select id="categoria" className="inventario-entrada" value={info.categoria} onChange={e => setInfo({...info, categoria:e.target.value})}>
                                        <option value="" hidden></option>
                                        {
                                            categorias.map(c => <option value={c.nombre}>{c.nombre}</option>)
                                        }
                                    </select>
                                    <label for="nuevoProducto">Nombre de producto:</label>
                                    <input id="nuevoProducto" className="inventario-entrada" type="text" value={info.nombre} onChange={e => setInfo({...info, nombre:e.target.value})}/>
                                </section>
                                <section className="section-inventario">
                                    <label for="precio">Precio de producto:</label>
                                    <input id="precio" type="number" className="inventario-entrada" min="0" value={info.precio} onChange={e => setInfo({...info, precio:e.target.value})}/>
                                    <label for="cantidad">Cantidad:</label>
                                    <input id="cantidad" type="number" className="inventario-entrada" min="1"/>
                                </section>
                                <section className="section-inventario">
                                    <label for="descripcion">Descripcion de producto:</label>
                                    <input id="descripcion" type="text" className="inventario-entrada" value={info.descripcion} onChange={e => setInfo({...info, descripcion:e.target.value})}/>
                                    <label for="imagen">Imagen del producto:</label>
                                    <input id="imagen" type="text" className="inventario-entrada" value={info.imagen} onChange={e => setInfo({...info, imagen:e.target.value})}/>
                                    <Button id="agregarProducto" variant="dark" onClick={agregarProducto}>
                                        Agregar producto
                                    </Button>
                                </section>
                            </section>
                            <Modal.Footer></Modal.Footer>
                        </>
                    }
                </Modal.Body>
                <Modal.Body>
                    <Modal.Footer></Modal.Footer>
                    <section className="section-inventario">
                        <h1>Previsualización de Inventario</h1>
                    </section>
                    <Modal.Footer></Modal.Footer>
                    <section className="section-inventario" style={{display:"flex", alignItems:"center"}}>
                        <label for="invCategorias">Categorias: </label>
                        <select id="invCategorias" className="inventario-entrada" onChange={seleccionarCategoria}>
                            <option value="" hidden></option>
                            {
                                categorias.map(c => <option value={c.nombre}>{c.nombre}</option>)
                            }
                        </select>
                        <label for="invProductos">Productos: </label>
                        <select id="invProductos" className="inventario-entrada" onChange={(e) => {
                            setItem({...item, producto:e.target.value});
                        }}>
                            <option value=""></option>
                            {
                                productos.map(p => <option value={p.nombre}>{p.nombre}</option>)
                            }
                        </select>
                        <Button variant="danger" onClick={eliminarItem}>
                            Eliminar
                        </Button>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    );
};