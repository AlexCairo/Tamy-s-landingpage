const fs = require("node:fs");
const productSchema = require("../models/products_model.js");
const mime = require("mime-types");

const controller = {
  async getAllData(req, res) {
    try {
      const jsonData = await fs.promises.readFile(
        "./src/data/catalogo_productos.json",
        "utf8"
      );
      const data = JSON.parse(jsonData);
      res.json(data);
    } catch (error) {
      res.status(500);
    }
  },

  async addData(req, res) {
    try {
      const { codigoProducto } = req.body;
      const result = productSchema.validate(req.body);
      if (result.error) {
        throw new Error("Ocurrió un error al validar los datos");
      }
      const validatedData = result.value;

      const nuevoProducto = {
        id: crypto.randomUUID(),
        nombreProducto: validatedData.nombreProducto,
        precio: validatedData.precio,
        descripcion: validatedData.descripcion,
        categoria: validatedData.categoria,
        subCategoria: validatedData.subCategoria,
        codigoProducto: validatedData.codigoProducto,
        stock: validatedData.stock,
        descuento: validatedData.descuento,
      };

      if (req.file) {
        if (!req.file.mimetype.startsWith("image/")) {
          throw new Error("El archivo debe ser una imagen");
        }
        nuevoProducto.imagen = req.file.filename;
      }

      const dataJson = await JSON.parse(
        fs.readFileSync("./src/data/catalogo_productos.json", "utf8")
      );
      const productoExistente = dataJson.find(
        (producto) => producto.codigoProducto === codigoProducto
      );

      if (productoExistente) {
        if (req.file) {
          try {
            fs.unlinkSync("./public/images/" + nuevoProducto.imagen);
          } catch (err) {
            console.error(err);
          }
        }
        return res
          .status(400)
          .send({ message: "Este producto ya se encuentra en el catálogo" });
      }

      dataJson.push(nuevoProducto);
      fs.writeFileSync(
        "./src/data/catalogo_productos.json",
        JSON.stringify(dataJson, null, 2)
      );

      return res.status(201).send({ message: "Producto agregado con éxito" });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "Error al agregar producto" });
    }
  },

  async updateData(req, res) {
    const { id } = req.params;
    const {
      nombreProducto,
      precio,
      stock,
      descripcion,
      categoria,
      subCategoria,
      codigoProducto,
      descuento
    } = req.body;
    const imagen = req.file;
    const result = productSchema.validate(req.body);
    if (result.error) {
      const errores = result.error.details.map((error) => error.message);
      res
        .status(400)
        .send({ message: "Ocurrió un error al validar los datos", errores });
      return;
    }

    try {
      const dataJson = await fs.promises.readFile(
        "./src/data/catalogo_productos.json",
        "utf8"
      );
      const data = JSON.parse(dataJson);
      const productoActual = data.find((producto) => producto.id === id);
      if (!productoActual) {
        return res.status(404).json({ error: "No se encontró el producto" });
      }

      // Solo actualiza la imagen si se proporciona una nueva
      if (imagen) {
        // Elimina la imagen anterior solo si se está subiendo una nueva
        await fs.promises.unlink("./public/images/" + productoActual.imagen);
        productoActual.imagen = imagen.filename; // Actualiza la imagen
      }

      // Actualiza los demás campos
      productoActual.nombreProducto = nombreProducto;
      productoActual.precio = precio;
      productoActual.stock = stock;
      productoActual.categoria = categoria;
      productoActual.descripcion = descripcion;
      productoActual.subCategoria = subCategoria;
      productoActual.codigoProducto = codigoProducto;
      productoActual.descuento = descuento;

      await fs.promises.writeFile(
        "./src/data/catalogo_productos.json",
        JSON.stringify(data, null, 2)
      );
      res.status(200).send({ message: "Se actualizó de manera exitosa" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ocurrió un error al actualizar" });
    }
  },
  async deleteData(req, res) {
    const { id } = req.params;
    try {
      const dataJson = JSON.parse(
        fs.readFileSync("./src/data/catalogo_productos.json", "utf8")
      );
      const productoActual = dataJson.find((producto) => producto.id === id);
      if (!productoActual) {
        return res.status(404).json({ error: "No se encontró el producto" });
      }
      const imagen = productoActual.imagen;
      fs.unlinkSync("./public/images/" + imagen);
      const index = dataJson.indexOf(productoActual);
      dataJson.splice(index, 1);
      fs.writeFileSync(
        "./src/data/catalogo_productos.json",
        JSON.stringify(dataJson, null, 2)
      );
      res.status(200).send({ message: "El elemento se eliminó correctamente" });
    } catch (err) {
      console.log("Error =>", err);
      res
        .status(500)
        .send({ message: "Ocurrió un error al eliminar el producto" });
    }
  },
};

module.exports = controller;
