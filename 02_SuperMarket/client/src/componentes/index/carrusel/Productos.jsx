import {useState, useEffect} from "react"

import Carta from './Carta';

export default function Productos(props)
{
    const [productos, setProductos] = useState([{}]);
    useEffect(() => {
        fetch(`/productos/${props.categoria}`).
        then(res => res.json()).
        then(data => setProductos(data));
    }, [productos]);
    
    return (
        <>
            <Carta/>
            {
                productos.map(p => <Carta {...p}/>)
            }
            <Carta/>
        </>
    );
};