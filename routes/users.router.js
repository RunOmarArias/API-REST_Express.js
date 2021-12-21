const express = require('express');
const router = express.Router();

/* router.get('/', (req, res) => {
    res.json([
        {
            nombre: 'Omar Arias',
            cartera: 7000
        },
        {
            nombre: 'Oso Arias',
            cartera: 400
        }
    ]);
}); */

router.get('/', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({
            limit,
            offset
        });
    } else {
        res.send('No hay parametros');
    }
})

router.get('/:usersId/compras', (req, res) => {
    const { usersId } = req.params;
    res.json({
        "id": usersId,
        "compras": [
            {
                "id": 1,
                "product": "zapatos"
            },
            {
                "id": 2,
                "product": "playera"
            }
        ]
    });
});

module.exports = router;
