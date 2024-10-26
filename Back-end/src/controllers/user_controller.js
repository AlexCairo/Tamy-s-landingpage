const jwt = require('jsonwebtoken');
const { SECRET_KEY, TOKEN_EXPIRES } = require("../../config");

const controller = {
    async login(req,res){
        try {
            const { user, password } = req.body;
            const result = user === process.env.USER_LOGIN && password ===  process.env.PASSWORD_LOGIN;
            if(result){
                const payload = {
                    user,
                    password
                }
                const token = jwt.sign(payload, SECRET_KEY, {
                    expiresIn: TOKEN_EXPIRES
                });
                res.json({"token":token});
            } else {
                throw new Error;
            }
        } catch (error) {   
            res.status(500).send("Error al iniciar sesión");
        }
    }
}

module.exports = controller;