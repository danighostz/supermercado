import { NavLink } from "react-router-dom";
import { useState } from "react";

import Button from 'react-bootstrap/Button';

export default function Error()
{
    return (
        <section style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
            <br/><br/><h1>Error 404:</h1>
            <img src="https://www.globalsign.com/application/files/9516/0389/3750/What_Is_an_SSL_Common_Name_Mismatch_Error_-_Blog_Image.jpg" width="300px" style={{margin:"auto"}}/>
            <h3>Page not found in the server.</h3><br/><br/>
            <NavLink to="/principal">
                <Button variant="dark"><h3>Volver a la página principal</h3></Button>
            </NavLink>
        </section>
    );
};