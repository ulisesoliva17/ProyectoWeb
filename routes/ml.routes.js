const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const JSON_ML_PATH = path.join(__dirname, "..", "jsons", "ml.json");


// 1. Endpoint para "Tipos de Aprendizaje"
// devuelve SOLO la lista 'items'
router.get("/tipos", (req, res) => {
    try {
      const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
      const data = JSON.parse(rawData);
      res.json(data.items); //enviamos solo items
    } catch (err) {
      res.status(500).json({ error: "Error al leer tipos de aprendizaje" });
    }
  });
  
  // 2. Endpoint para "Casos de Uso"
  //devuelve SOLO la lista 'items2'
  router.get("/casos", (req, res) => {
    try {
      const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
      const data = JSON.parse(rawData);
      res.json(data.items2); //Enviamos items2
    } catch (err) {
      res.status(500).json({ error: "Error al leer casos de uso" });
    }
  });
  
  // 3. Endpoint para "Ventajas y Desventajas"
  // Devuelve SOLO la lista 'items3'
  router.get("/ventajas", (req, res) => {
    try {
      const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
      const data = JSON.parse(rawData);
      res.json(data.items3); //Enviamos items3
    } catch (err) {
      res.status(500).json({ error: "Error al leer ventajas" });
    }
  });

module.exports = router;