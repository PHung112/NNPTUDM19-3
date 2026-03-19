var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventory');

/* GET all inventories */
router.get('/', async function (req, res) {
    try {
        let inventories = await inventoryController.GetAllInventories();
        res.send(inventories);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

/* GET inventory by ID */
router.get('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let inventory = await inventoryController.GetInventoryById(id);
        res.send(inventory);
    } catch (error) {
        res.status(404).send({
            message: error.message
        });
    }
});

/* GET inventory by product ID */
router.get('/product/:productId', async function (req, res) {
    try {
        let productId = req.params.productId;
        let inventory = await inventoryController.GetInventoryByProductId(productId);
        res.send(inventory);
    } catch (error) {
        res.status(404).send({
            message: error.message
        });
    }
});

/* POST add stock */
router.post('/add-stock', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: 'Product and quantity are required'
            });
        }
        let inventory = await inventoryController.AddStock(product, quantity);
        res.send(inventory);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

/* POST remove stock */
router.post('/remove-stock', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: 'Product and quantity are required'
            });
        }
        let inventory = await inventoryController.RemoveStock(product, quantity);
        res.send(inventory);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

/* POST reservation */
router.post('/reservation', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: 'Product and quantity are required'
            });
        }
        let inventory = await inventoryController.ReserveStock(product, quantity);
        res.send(inventory);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

/* POST sold */
router.post('/sold', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: 'Product and quantity are required'
            });
        }
        let inventory = await inventoryController.SoldStock(product, quantity);
        res.send(inventory);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

module.exports = router;
