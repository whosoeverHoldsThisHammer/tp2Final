const express = require('express');
const router = express.Router();
const data = require('./../data/tickets');

router.get('/', async(req, res, next) => {
    const completado = req.query.completado ? req.query.completado : ""
    const criterio = req.query.criterio ? req.query.criterio : ""
    const orden = req.query.orden ? req.query.orden : ""

    const tickets = await data.getTickets(completado,criterio,orden)
    res.json(tickets);
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const ticket = await data.getTicket(id);
    res.json(ticket);
})

router.get('/desarrollador/:id', async(req, res) => {
    const id = req.params.id;
    const ticket = await data.getDevTickets(id);
    res.json(ticket);
})

module.exports = router;