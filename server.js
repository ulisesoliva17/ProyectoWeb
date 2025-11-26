const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Importamos las rutas
const dlRoutes = require("./routes/dl.routes");
const mlRoutes = require("./routes/ml.routes");

const PUBLIC_PATH = path.join(__dirname, "public");


app.use(express.static(PUBLIC_PATH));
app.use(express.json());


// ASIGNACIÓN DE RUTAS

//"Todo lo que empiece con /api/dl, mándalo al archivo dlRoutes"
app.use("/api/dl", dlRoutes);

// "Todo lo que empiece con /api/ml, mándalo al archivo mlRoutes"
app.use("/api/ml", mlRoutes);

// ===============================================
// Ruta raíz
// ===============================================
app.get("/", (_req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});