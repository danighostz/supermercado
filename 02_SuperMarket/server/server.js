const {cliente} = require("./cliente");
const {enviarCorreo, randomPassword} = require("./mailer/emisor");

const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get("/categorias", async (req, res) => {
    res.json(await cliente.getCategorias())
});
app.get("/productos/:categoria", async (req, res) => {
    res.json(await cliente.getProductos(req.params.categoria));
});

app.get("/productos/:categoria/:producto", async (req, res) => {
    res.json(await cliente.getProducto(req.params.categoria, req.params.producto));
});

app.get("/departamentos", async (req, res) => {
    res.json(await cliente.getDepartamentos())
});
app.get("/municipios/:departamento", async (req, res) => {
    res.json(await cliente.getMunicipios(req.params.departamento))
});

app.get("/usuarios", async (req, res) => {
    const response = await cliente.getUsuarios();
    res.json(response);
});

app.get("/recuperar/:usuario", async (req, res) => {
    const clave = randomPassword();
    await cliente.setClave(req.params.usuario, clave);
    enviarCorreo(req.params.usuario, clave);
    res.json({clave});
});

app.get("/usuarios/:usuario/:clave", async (req, res) =>
{
    res.json(await cliente.getUsuario(req.params.usuario, req.params.clave));
});

app.post("/usuarios", async (req, res) => {
    const info = req.body;
    try
    {
        const response = await cliente.postUsuario(info.usuario, info.clave, info.editor);
        console.log("Insercion realizada");
    }
    catch(err){ console.log("Insercion cancelada"); }
});

app.post("/categorias", async (req, res) => {
    const info = req.body;
    try
    {
        const response = await cliente.postCategoria(info.categoria);
        console.log("Insercion realizada");
    }
    catch(err)
    { console.log("Insercion cancelada"); }
});

app.post("/productos", async (req, res) => {
    const info = req.body;
    try
    {
        const response = await cliente.postProducto(info.categoria, info.nombre, info.descripcion, info.imagen, info.precio);
        console.log("Insercion realizada");
    }
    catch(err)
    { console.log("Insercion cancelada"); }
});

app.delete("/categorias/:categoria", async (req, res) => {
    try
    {
        const response = await cliente.deleteCategoria(req.params.categoria);
        console.log("Eliminacion realizada");
    }
    catch(err)
    { console.log("Eliminacion cancelada"); }
});

app.delete("/categorias/:categoria/:producto", async (req, res) => {
    try
    {
        const response = await cliente.deleteProducto(req.params.categoria, req.params.producto);
        console.log("Eliminacion realizada");
    }
    catch(err)
    { console.log("Eliminacion cancelada"); }
});

app.listen(5000, () => console.log("Servidor activo en el puerto 5000."))