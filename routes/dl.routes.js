const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//Dir del json
const JSON_PATH = path.join(__dirname, "..", "jsons", "dl.json");

// Helper interno (solo para este archivo)
function leerJSON() {
  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
}
function escribirJSON(data) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
}


router.get("/", (req, res) => {
    try {
      const data = leerJSON();
      res.json(data);
    } catch (err) {
      console.error("Error al leer el JSON:", err);
      res.status(500).json({ error: "No se pudo leer el archivo JSON" });
    }
  });
  
  router.get("/pos/:index", (req, res) => {
    try {
      const data = leerJSON();
      const index = parseInt(req.params.index);
      if (isNaN(index) || index < 0 || index >= data.items.length) {
        return res
          .status(400)
          .json({ error: "Índice fuera de rango o inválido" });
      }
      res.json(data.items[index]);
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
  
      data.items.push(nuevo);
      escribirJSON(data);
      res.status(201).json({ mensaje: "Modelo agregado con éxito", nuevo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo guardar el nuevo modelo" });
    }
  });
  
  router.put("/:nombre", (req, res) => {
    try {
      const data = leerJSON();
      const nombre = req.params.nombre;
      const index = data.items.findIndex((item) => item.nombre === nombre);
      if (index === -1) {
        return res.status(404).json({ error: "Modelo no encontrado" });
      }
      data.items[index] = { ...data.items[index], ...req.body };
      escribirJSON(data);
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
      const nuevoArray = data.items.filter((item) => item.nombre !== nombre);
      if (nuevoArray.length === data.items.length) {
        return res.status(404).json({ error: "Modelo no encontrado" });
      }
      escribirJSON({ items: nuevoArray });
      res.json({ mensaje: "Modelo eliminado con éxito" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo eliminar el modelo" });
    }
  });

module.exports = router; 