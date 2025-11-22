// ===============================================
// server.js — API REST completa con Express
// ===============================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT = __dirname;

// DEFINIMOS LA RUTA A LA CARPETA PUBLIC
// Aquí le decimos que la carpeta pública está dentro de la raíz
const PUBLIC_PATH = path.join(ROOT, "public"); 

// La carpeta jsons sigue estando en la raíz (fuera de public), lo cual es correcto por seguridad
const JSON_PATH = path.join(ROOT, "jsons", "dl.json");
// ===============================================
// Middleware
// ===============================================

// CAMBIO CLAVE: Ahora servimos los archivos estáticos desde PUBLIC_PATH
// Antes tenías ROOT, lo que exponía todo tu código. Ahora solo se ve lo de 'public'.
app.use(express.static(PUBLIC_PATH));

app.use(express.json()); // Para leer JSON del body

// Helper para leer el JSON (Esto queda igual)
function leerJSON() {
  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
}

// Helper para escribir el JSON (Esto queda igual)
function escribirJSON(data) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
}

// ===============================================
// RUTAS DE LA API (GET, POST, PUT, DELETE)
// ===============================================
// (Toda esta sección queda IDÉNTICA a tu código anterior, 
//  porque la lógica de la API no cambia por mover los HTML)

app.get("/api/dl", (req, res) => {
  try {
    const data = leerJSON();
    res.json(data);
  } catch (err) {
    console.error("Error al leer el JSON:", err);
    res.status(500).json({ error: "No se pudo leer el archivo JSON" });
  }
});

app.get("/api/dl/pos/:index", (req, res) => {
  try {
    const data = leerJSON();
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= data.items.length) {
      return res.status(400).json({ error: "Índice fuera de rango o inválido" });
    }
    res.json(data.items[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar por posición" });
  }
});

app.post("/api/dl", (req, res) => {
  try {
    const data = leerJSON();
    const nuevo = req.body;
    if (!nuevo.nombre || !nuevo.titulo) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, titulo)" });
    }
    data.items.push(nuevo);
    escribirJSON(data);
    res.status(201).json({ mensaje: "Modelo agregado con éxito", nuevo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo guardar el nuevo modelo" });
  }
});

app.put("/api/dl/:nombre", (req, res) => {
  try {
    const data = leerJSON();
    const nombre = req.params.nombre;
    const index = data.items.findIndex(item => item.nombre === nombre);
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

app.delete("/api/dl/:nombre", (req, res) => {
  try {
    const data = leerJSON();
    const nombre = req.params.nombre;
    const nuevoArray = data.items.filter(item => item.nombre !== nombre);
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


// ENDPOINTS DEL ML

// Definimos la ruta al archivo UNICO de ML (si no la pusiste aún)
const JSON_ML_PATH = path.join(ROOT, "jsons", "ml.json");

// ===============================================
// RUTAS DE MACHINE LEARNING (Leyendo todas del mismo archivo)
// ===============================================

// 1. Endpoint para "Tipos de Aprendizaje"
// Lee el archivo entero, pero devuelve SOLO la lista 'items'
app.get("/api/ml/tipos", (req, res) => {
  try {
    const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
    const data = JSON.parse(rawData);
    res.json(data.items); // <--- AQUÍ está el truco: enviamos solo items
  } catch (err) {
    res.status(500).json({ error: "Error al leer tipos de aprendizaje" });
  }
});

// 2. Endpoint para "Casos de Uso"
// Lee el mismo archivo, pero devuelve SOLO la lista 'items2'
app.get("/api/ml/casos", (req, res) => {
  try {
    const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
    const data = JSON.parse(rawData);
    res.json(data.items2); // <--- Enviamos items2
  } catch (err) {
    res.status(500).json({ error: "Error al leer casos de uso" });
  }
});

// 3. Endpoint para "Ventajas y Desventajas"
// Lee el mismo archivo, pero devuelve SOLO la lista 'items3'
app.get("/api/ml/ventajas", (req, res) => {
  try {
    const rawData = fs.readFileSync(JSON_ML_PATH, "utf8");
    const data = JSON.parse(rawData);
    res.json(data.items3); // <--- Enviamos items3
  } catch (err) {
    res.status(500).json({ error: "Error al leer ventajas" });
  }
});

//FIN ENDPOINTS DEL ML

// ===============================================
// Ruta raíz: / → devuelve index.html
// ===============================================
app.get("/", (_req, res) => {
  // CAMBIO IMPORTANTE:
  // Ahora buscamos el index.html DENTRO de la carpeta public
  res.sendFile(path.join(PUBLIC_PATH, "index.html")); 
});

// ===============================================
// Iniciar el servidor
// ===============================================
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});