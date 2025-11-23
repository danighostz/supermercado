const {readFile} = require("fs");
const { Sequelize } = require("sequelize");

class ClienteDB
{
    constructor()
    {
        // Credenciales de tu base PostgreSQL dentro de tu VM
        this.database_name = "supermarket";
        this.user_name = "victor";
        this.password = "1234";

        this.conexion = null;
        this.crearCliente();
    }

    async crearCliente()
    {
        const sequelize = new Sequelize(
            this.database_name,
            this.user_name,
            this.password,
            {
                host: "localhost",   // <-- Cambiado de ElephantSQL a local
                dialect: "postgres",
                port: 5432
            }
        );
        
        sequelize.authenticate()
        .then(() => console.log("La conexión se ha establecido con éxito."))
        .catch(err => console.error("No se puede conectar a la base de datos:", err));

        this.conexion = sequelize;
    }

    async cerrarCliente()
    {
        this.conexion.close()
        .then(() => console.log("Se ha cerrado la conexión a la base de datos."));
    }

    async crearTablas()
    {
        readFile('./database/crear_tablas.sql', 'utf8', async (error, sql) => {
            if (error) throw error;
            await this.conexion.query(sql)
        });
    }

    async llenarTablas()
    {
        readFile('./database/llenar_tablas.sql', 'utf8', async (error, sql) => {
            if (error) throw error;
            await this.conexion.query(sql)
        });
    }

    async getCategorias()
    {
        const sql = `select c.nombre from proyecto.categorias c`;

        let categorias = await this.conexion.query(sql);
        return categorias[0];
    }

    async getProductos(categoria)
    {
        const sql = `
        select p.imagen, p.nombre, p.descripcion, p.precio
        from proyecto.productos p, proyecto.categorias c
        where c.nombre = '${categoria}' and  p.idcategoria = c.id;
        `;

        const productos = await this.conexion.query(sql);
        return productos[0];
    }

    async getDepartamentos()
    {
        const sql = `select d.nombre from proyecto.departamentos d`;

        const departamentos = await this.conexion.query(sql);
        return departamentos[0];
    }

    async getMunicipios(departamento)
    {
        let sql = `
        with departamento as (select d.id from proyecto.departamentos d where d.nombre = '${departamento}')
        select m.nombre
        from departamento d, proyecto.municipios m
        where m.iddepartamento = d.id;
        `;

        let municipios = await this.conexion.query(sql);
        return municipios[0];
    }

    async getUsuarios()
    {
        let sql = `select * from proyecto.usuarios u;`;

        let query = await this.conexion.query(sql);
        return query[0];
    }

    async getUsuario(usuario, clave)
    {
        let sql = `
        select u.editor
        from proyecto.usuarios u
        where u.usuario = '${usuario}' and u.clave = '${clave}';
        `;
        
        let res = await this.conexion.query(sql);
        return res[0][0];
    }

    async postUsuario(usuario, clave, editor)
    {
        const sql = `
        do $$
        declare
            id boolean;
        begin
            select u.id into id from proyecto.usuarios u where u.usuario = '${usuario}';
            if id is null then
                insert into proyecto.usuarios (usuario,clave,editor) values ('${usuario}','${clave}',${editor});
            end if;
        end $$;
        `;

        const response = await this.conexion.query(sql);
        return response;
    }

    async postCategoria(categoria)
    {
        const sql = `insert into proyecto.categorias(nombre) values ('${categoria}');`;
        const response = await this.conexion.query(sql);
        return response;
    }

    async postProducto(categoria, nombre, descripcion, imagen, precio)
    {
        const sql = `
        insert into proyecto.productos(idcategoria, nombre, descripcion, imagen, precio) values
        ((select c.id from proyecto.categorias c where c.nombre = '${categoria}'), '${nombre}', '${descripcion}', '${imagen}', ${precio});
        `;
        const response = await this.conexion.query(sql);
        return response;
    }

    async setClave(usuario, clave)
    {
        const sql = `
        update proyecto.usuarios u
        set clave = '${clave}'
        where u.usuario = '${usuario}';
        `;

        const response = await this.conexion.query(sql);
        return response;
    }

    async deleteCategoria(categoria)
    {
        const sql = `
        delete from proyecto.categorias c
        where c.nombre = '${categoria}';
        `;

        const response = await this.conexion.query(sql);
        return response;
    }

    async deleteProducto(categoria, producto)
    {
        const sql = `
        delete from proyecto.productos p
        where p.idcategoria = (select c.id from proyecto.categorias c where c.nombre = '${categoria}')
        and p.nombre = '${producto}';
        `;

        const response = await this.conexion.query(sql);
        return response;
    }

    async getProducto(categoria, producto)
    {
        const sql = `
        select *
        from proyecto.productos p
        where p.nombre = '${producto}' and 
        p.idcategoria = (select c.id from proyecto.categorias c where c.nombre = '${categoria}');
        `;

        let productos = await this.conexion.query(sql);
        return productos[0];
    }
}

const cliente = new ClienteDB();

module.exports = {cliente};
