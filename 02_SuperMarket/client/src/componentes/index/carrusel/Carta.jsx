import { useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { compras, modal } from "../../../aplicacion/Principal"

export default function Carta(props) // = [imagen, nombre, descripcion]
{
    const [items, setItems] = useContext(compras);
    const [visible, setVisible] = useContext(modal);

    const [boton, setBoton] = useState({
        texto: "Agg al carrito",
        variant: "dark"
    });

    const accion = () =>
    {
        if(boton.texto === "Agg al carrito")
        {
            setBoton({
                texto: "Ir al carrito",
                variant: "warning"
            });
            setItems([...items, props]);
        }
        else setVisible(true);
    }

    return (props.imagen && props.nombre && props.descripcion) ? (
        <Card className="tarjeta">
            <Card.Img className="tarjeta-imagen" variant="top" src={props.imagen}/>
            <Card.Body>
                <Card.Title>{props.nombre}</Card.Title>
                <Card.Text>{props.descripcion}</Card.Text>
                <Button className="tarjeta-boton" variant={boton.variant} onClick={accion}>{boton.texto}</Button>
            </Card.Body>
        </Card>
    ) : <Card className="tarjeta-vacia" />;
}