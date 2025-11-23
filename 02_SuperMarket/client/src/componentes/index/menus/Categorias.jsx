import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function Categorias() {
    const [categorias, setCategorias] = useState([{}]);
    useEffect(() => {
        const asyncUseEffect = async () => {
        await fetch("/categorias").
        then(res => res.json()).
        then(data => setCategorias(data));
        };
        asyncUseEffect();
    }, [categorias]);
    
    return (
        <>
            {categorias.map(e => {
                return (
                    <Button className="categorias-boton" variant="dark" href={`#${e.nombre}`}>
                        {e.nombre}
                    </Button>
                );
            })}
        </>
    );
};