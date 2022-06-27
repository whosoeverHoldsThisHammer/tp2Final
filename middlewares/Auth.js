require ("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header('Authorization');
    try {
        const user = jwt.verify(token, process.env.CLAVESECRETA);
        next();
    } catch (error) {
        res.status(401).send({err: error.message});
    }
}

module.exports = auth;