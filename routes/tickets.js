const express = require('express');
const router = express.Router();
const data = require('./../data/tickets');

router.get('/', async(req, res, next) => {
    const desarrollador_id = req.query.desarrollador_id ? parseInt(req.query.desarrollador_id) : ""
    const proyecto_id = req.query.proyecto_id ? parseInt(req.query.proyecto_id) : ""
    const tickets = await data.getTickets(desarrollador_id, proyecto_id)
    res.json(tickets);
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const ticket = await data.getTicket(id);
    res.json(ticket);
})

module.exports = router;