const express =  require("express");
const helmet = require("helmet");
const producto_rutas = require( "./src/routes/products_routes.js");
const about_rutas = require("./src/routes/about_route.js");
const user_rutas = require("./src/routes/user_route.js");
const cors = require("cors");

require ("dotenv").config()

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'))
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json({}));

app.use('/api',producto_rutas);
app.use('/api',about_rutas);
app.use('/api/user',user_rutas);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


