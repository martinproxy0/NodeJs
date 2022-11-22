const express = require('express');
const router = express.Router();
const timeEntry = require('../services/time');

function pintReqAndRes(req, res) {
    console.log(req);
    console.log(res);
}

/* GET time records */
router.get('/', async function (req, res, next) {
    try {
        res.json(await timeEntry.getMultiple(req.query.page));
        pintReqAndRes(req,res);
    } catch (err) {
        console.error(`Error while getting time records `, err.message);
        next(err);
    }
});

/* POST time entry */
router.post('/', async function (req, res, next) {
    try {
        res.json(await timeEntry.create(req.body));
        pintReqAndRes(req,res);
    } catch (err) {
        console.error(`Error while creating time entry`, err.message);
        next(err);
    }
});

/* PUT time entry */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await timeEntry.update(req.params.id, req.body));
        pintReqAndRes(req,res);
    } catch (err) {
        console.error(`Error while updating time entry`, err.message);
        next(err);
    }
});


/* DELETE time entry */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await timeEntry.remove(req.params.id));
        pintReqAndRes(req,res);
    } catch (err) {
        console.error(`Error while deleting time entry`, err.message);
        next(err);
    }
});

module.exports = router;