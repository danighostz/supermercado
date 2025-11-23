const { cliente } = require("./cliente");
const { enviarCorreo, randomPassword } = require("./mailer/emisor");

const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ------- GETs -------
app.get("/categorias", async (req, res) => {
  try {
    const data = await cliente.getCategorias();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

app.get("/productos/:categoria", async (req, res) => {
  try {
    const data = await cliente.getProductos(req.params.categoria);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get("/productos/:categoria/:producto", async (req, res) => {
  try {
    const data = await cliente.getProducto(
      req.params.categoria,
      req.params.producto
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

app.get("/departamentos", async (req, res) => {
  try {
    const data = await cliente.getDepartamentos();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error al obtener departamentos" });
  }
});

app.get("/municipios/:departamento", async (req, res) => {
  try {
    const data = await cliente.getMunicipios(req.params.departamento);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error al obtener municipios" });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const data = await cliente.getUsuarios();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Recuperar contraseña
app.get("/recuperar/:usuario", async (req, res) => {
  try {
    const clave = randomPassword();
    await cliente.setClave(req.params.usuario, clave);
    enviarCorreo(req.params.usuario, clave);
    res.json({ clave });
  } catch (err) {
    res.status(500).json({ error: "Error al recuperar clave" });
  }
});

// Login
app.get("/usuarios/:usuario/:clave", async (req, res) => {
  try {
    const data = await cliente.getUsuario(req.params.usuario, req.params.clave);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// ------- POSTs -------
app.post("/usuarios", async (req, res) => {
  try {
    const info = req.body;
    const response = await cliente.postUsuario(info.usuario, info.clave, info.editor);
    res.json({ message: "Inserción realizada", response });
  } catch (err) {
    res.status(500).json({ error: "Inserción cancelada" });
  }
});

app.post("/categorias", async (req, res) => {
  try {
    const info = req.body;
    const response = await cliente.postCategoria(info.categoria);
    res.json({ message: "Inserción realizada", response });
  } catch (err) {
    res.status(500).json({ error: "Inserción cancelada" });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const info = req.body;
    const response = await cliente.postProducto(
      info.categoria,
      info.nombre,
      info.descripcion,
      info.imagen,
      info.precio
    );
    res.json({ message: "Inserción realizada", response });
  } catch (err) {
    res.status(500).json({ error: "Inserción cancelada" });
  }
});

// ------- DELETE -------
app.delete("/categorias/:categoria", async (req, res) => {
  try {
    const response = await cliente.deleteCategoria(req.params.categoria);
    res.json({ message: "Eliminación realizada", response });
  } catch (err) {
    res.status(500).json({ error: "Eliminación cancelada" });
  }
});

app.delete("/categorias/:categoria/:producto", async (req, res) => {
  try {
    const response = await cliente.deleteProducto(
      req.params.categoria,
      req.params.producto
    );
    res.json({ message: "Eliminación realizada", response });
  } catch (err) {
    res.status(500).json({ error: "Eliminación cancelada" });
  }
});

// ------- Start server -------
app.listen(5000, "0.0.0.0", () =>
  console.log("Servidor activo en el puerto 5000.")
);
