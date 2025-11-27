const express = require("express");
const router = express.Router(); //creamos un mini-servidor
const fs = require("fs"); // permite leer/escribir
const path = require("path"); //para construir rutas de archivos

//Dir del json, __dirname(directorio actual)
const JSON_PATH = path.join(__dirname, "..", "jsons", "dl.json");

// Helper interno (solo para este archivo)
function leerJSON() {
  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8")); //Convierte esa cadena en un objeto JavaScript.
}
function escribirJSON(data) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8"); //escribimos en el archivo JSON_PATH
}

//req, solicitud del cliente al servidor
//res, lo que el servidor devuelve como respuesta
router.get("/", (req, res) => {
  try {
    const data = leerJSON();
    res.json(data); //envio el contenido en formate json
  } catch (err) {
    console.error("Error al leer el JSON:", err);
    res.status(500).json({ error: "No se pudo leer el archivo JSON" });
  }
});

router.get("/pos/:index", (req, res) => {
  try {
    const data = leerJSON(); // json en formato javascript
    const index = parseInt(req.params.index); //convierto el index a entero
    if (isNaN(index) || index < 0 || index >= data.items.length) {
      return res
        .status(400)
        .json({ error: "Índice fuera de rango o inválido" });
    }
    res.json(data.items[index]); //envio la respuesta en formate json
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar por posición" });
  }
});

router.post("/", (req, res) => {
  try {
    const data = leerJSON();
    const nuevo = req.body;
    if (!nuevo.nombre || !nuevo.titulo) {
      //obligatorio el nombre y titulo
      return res
        .status(400)
        .json({ error: "Faltan campos obligatorios (nombre, titulo)" });
    }
    //Busco que no exista el nombre
    const existe = data.items.some((item) => item.nombre === nuevo.nombre);

    if (existe) {
      return res
        .status(409)
        .json({ error: "Ya existe un modelo con ese nombre" });
    }

    data.items.push(nuevo); //Lo agrego al final del arreglo
    escribirJSON(data); //reescribo el json
    res.status(201).json({ mensaje: "Modelo agregado con éxito", nuevo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo guardar el nuevo modelo" });
  }
});

router.put("/:nombre", (req, res) => {
  try {
    const data = leerJSON();
    const nombre = req.params.nombre; //valor de :nombre
    const index = data.items.findIndex((item) => item.nombre === nombre); //busco en el arreglo items, si el nombre existe
    if (index === -1) {
      return res.status(404).json({ error: "Modelo no encontrado" });
    }
    data.items[index] = { ...data.items[index], ...req.body }; // lo actualizo
    escribirJSON(data); //reescribimos el json
    res.json({ mensaje: "Modelo actualizado", actualizado: data.items[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar el modelo" });
  }
});

router.delete("/:nombre", (req, res) => {
  try {
    const data = leerJSON();
    const nombre = req.params.nombre;
    const nuevoArray = data.items.filter((item) => item.nombre !== nombre); //creamos  un nuevo arreglo menos con :nombre
    if (nuevoArray.length === data.items.length) {
      return res.status(404).json({ error: "Modelo no encontrado" });
    }
    escribirJSON({ items: nuevoArray }); //Sobrescribe el archivo JSON con el nuevo arreglo, ya sin el modelo eliminado.
    res.json({ mensaje: "Modelo eliminado con éxito" }); //devuelve mensaje
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar el modelo" });
  }
});

module.exports = router;
