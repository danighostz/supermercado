drop schema if exists proyecto cascade;

create schema proyecto;

create table proyecto.departamentos(
	id serial,
	nombre varchar,
	constraint pk_departamentos primary key(id)
);

create table proyecto.municipios(
	id serial,
	iddepartamento int,
	nombre varchar,
	constraint pk_municipios primary key(id),
	constraint fk_municipio_departamento foreign key(iddepartamento) references proyecto.departamentos(id)
);

create table proyecto.direcciones(
	id serial,
	idmunicipio int,
	direccion varchar,
	constraint pk_direcciones primary key(id),
	constraint fk_direccion_municipio foreign key(idmunicipio) references proyecto.municipios(id)
);

create table proyecto.sede(
	id serial,
	iddireccion int,
	nombre varchar,
	constraint fk_sede_direccion foreign key(iddireccion) references proyecto.direcciones(id)
);

create table proyecto.usuarios(
	id serial,
	usuario varchar,
	clave varchar,
	editor bool,
	constraint pk_usuarios primary key(id)
);

create table proyecto.domicilios(
	id serial,
	idusuario int,
	iddireccion int,
	constraint fk_domicilio_usuario foreign key(idusuario) references proyecto.usuarios(id),
	constraint fk_domicilio_direccion foreign key(iddireccion) references proyecto.direcciones(id)
);

create table proyecto.categorias(
	id serial,
	nombre varchar,
	constraint pk_categorias primary key(id)
);

create table proyecto.productos(
	id serial,
	idcategoria int,
	nombre varchar,
	descripcion varchar,
	imagen varchar,
	precio float,
	constraint pk_productos primary key(id),
	constraint fk_productos_categorias foreign key(idcategoria) references proyecto.categorias(id) on delete cascade
);

create table proyecto.facturas(
	id serial,
	idusuario int,
	total float,
	constraint pk_facturas primary key(id),
	constraint fk_facturas_usuarios foreign key(idusuario) references proyecto.usuarios(id)
);

create table proyecto.detalles(
	id serial,
	idfactura int,
	idproducto int,
	cantidad int,
	constraint pk_detalles primary key(id),
	constraint fk_detalles_facturas foreign key(idfactura) references proyecto.facturas(id),
	constraint fk_detalles_productos foreign key(idproducto) references proyecto.productos(id)
);