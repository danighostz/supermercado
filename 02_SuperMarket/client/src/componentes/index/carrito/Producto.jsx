import { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { compras } from "../../../aplicacion/Principal"

export default function Producto(props) // = [imagen, nombre, precio]
{
    const [items, setItems] = useContext(compras);

    const [cantidad, setCantidad] = useState(1);
    const eliminar = () => {
        const restantes = items.filter((p => p.nombre !== props.nombre));
        setItems(restantes);
    };
    const disminuir = () => (cantidad - 1 < 1) ? eliminar() : setCantidad(cantidad - 1);
    const aumentar = () => setCantidad(cantidad + 1);
    
    return (
        <Card className="producto">
            <Button className="producto-quitar" variant="danger" onClick={eliminar}>
                &#x2715;
            </Button>
            <img className="producto-imagen" src={props.imagen} />
            <section>
                <section>
                    <label className="producto-etiqueta">Producto:</label>
                    <label>{props.nombre}</label>
                </section>
                <section>
                    <label className="producto-etiqueta">Precio:</label>
                    <label>${props.precio}</label>
                </section>
            </section>
            <section className="producto-cantidad">
                <section>
                    <label className="producto-etiqueta">Subtotal:</label>
                    <label>${props.precio * cantidad}</label>
                </section>
                <section>
                    <Button variant="outline-dark" onClick={disminuir}>−</Button>
                    <label className="producto-etiqueta">Cantidad:</label><label> {cantidad}</label>
                    <Button variant="outline-dark" onClick={aumentar}>+</Button>
                </section>
            </section>
        </Card>
    );
};