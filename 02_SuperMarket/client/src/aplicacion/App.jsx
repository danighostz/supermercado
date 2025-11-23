import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import "../css/index/Barra.css";
import "../css/index/Carrito.css";
import "../css/index/Carta.css";
import "../css/index/Categorias.css";
import "../css/index/Producto.css";
import "../css/index/Pie.css";
import "../css/index/Registro.css";
import "../css/index/Inventario.css";
import "../css/index/Usuario.css";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { createContext, useState } from "react";

import Principal from "./Principal";
import Inventario from "./Inventario";
import Usuario from "./Usuario";
import Registro from "./Registro";
import Error from "./Error";
import Envio from './Envio';

export const Sesion = createContext();

export default function App()
{
  const [sesion, setSesion] = useState({login:false, admin:false});
  return (
    <>
      <Sesion.Provider value={[sesion, setSesion]}>
        <BrowserRouter>
          <Routes>
            <Route path="principal" element={<Principal/>}/>
            <Route path="registro" element={<Registro/>}/>
            { sesion.login && <Route path="usuario" element={<Usuario/>}/>}
            { sesion.login && <Route path="envio" element={<Envio/>}/>}
            { sesion.login && sesion.admin && <Route path="inventario" element={<Inventario/>}/>}
            <Route path="/" element={<Navigate to="principal"/>}/>
            <Route path="/*" element={<Error/>}/>
          </Routes>
        </BrowserRouter>
      </Sesion.Provider>
    </>
  );
};