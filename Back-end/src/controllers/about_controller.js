const fs = require("node:fs")
const aboutSchema = require("../models/about_model");

const controller = {
    async getInfo(req,res){
        try {
            const jsonData = await fs.promises.readFile('./src/data/datos_empresa.json', 'utf8');
            const data = JSON.parse(jsonData);
            res.json(data);
        } catch (error) {
            console.log("ERROR =>",error);
            res.status(500)
        }
    },

    async editInfo(req,res){
        const { sobre_nosotros, contactos } = req.body;
        try {
            const result = aboutSchema.validate(req.body);
            if (result.error) {
                console.log("ERROR =>", result.error.details);
                res.status(400).send({ message: "Ocurrió un error  al validar los datos" });
                return;
              }
            const jsonData = await fs.promises.readFile('./src/data/datos_empresa.json', 'utf8');
            const data = JSON.parse(jsonData);
            data.sobre_nosotros = sobre_nosotros;            
            data.contactos = contactos;
            const newJson = JSON.stringify(data, null, 2);
            await fs.promises.writeFile('./src/data/datos_empresa.json', newJson);
            res.status(200).send({message : "Modificación realizada con éxito"})
        
        } catch (error) {    
            res.status(500).send({message : "Ocurrió un error, intente nuevamente"});            
        }
    }
}


module.exports = controller;