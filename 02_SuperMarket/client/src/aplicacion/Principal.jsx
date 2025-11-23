import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';

import React, { useState, useEffect } from 'react';

import Barra from '../componentes/index/menus/Barra';
import Pie from "../componentes/index/menus/Pie";
import Categorias from '../componentes/index/menus/Categorias';
import Productos from '../componentes/index/carrusel/Productos';

export const compras = React.createContext();
export const modal = React.createContext();

export default function Principal()
{
    const [items, setItems] = useState([]);
    const [visible, setVisible] = useState(false);

    const [categorias, setCategorias] = useState([{}]);
    useEffect(() => {
        fetch("/categorias").
        then(res => res.json()).
        then(data => setCategorias(data));
    }, [categorias]);

    return (
        <>
            <compras.Provider value={[items, setItems]}>
                <modal.Provider value={[visible, setVisible]}>
                    <Barra/>
                    <section style={{ display: "flex", flexDirection: "row" }}>
                        <section className="bg-warning" style={{ width: "20%" }}>
                            <section style={{ position: "fixed", width: "20%" }}>
                                <Categorias />
                            </section>
                        </section>
                        <section style={{ width: "80%" }}>
                            <Accordion alwaysOpen defaultActiveKey={["0","1","2","3"]}>
                                {
                                    categorias.map((c, i) => {
                                        return (
                                            <>
                                                <section id={c.nombre}></section>
                                                <Accordion.Item eventKey={`${i}`}>
                                                    <Accordion.Header><h1>{c.nombre}</h1></Accordion.Header>
                                                    <Accordion.Body>
                                                        <Carousel variant="dark" indicators={false} interval={null}>
                                                            <Carousel.Item>
                                                                <section style={{ display: "flex" }}>
                                                                    <Productos categoria={c.nombre}/>
                                                                </section>
                                                            </Carousel.Item>
                                                            <Carousel.Item>
                                                                <section style={{ display: "flex" }}>
                                                                    <Productos categoria={c.nombre}/>
                                                                </section>
                                                            </Carousel.Item>
                                                        </Carousel>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </>
                                        );
                                    })
                                }
                            </Accordion>
                        </section>
                    </section>
                    <Pie/>
                </modal.Provider>
            </compras.Provider>
        </>
    );
};