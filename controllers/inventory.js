let inventoryModel = require('../schemas/inventory')

module.exports = {
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            })
            await newInventory.save()
            return newInventory
        } catch (error) {
            throw error
        }
    },

    GetAllInventories: async function () {
        try {
            let inventories = await inventoryModel.find({
                isDeleted: false
            }).populate({
                path: 'product',
                select: 'title slug price description category images'
            })
            return inventories
        } catch (error) {
            throw error
        }
    },

    GetInventoryById: async function (id) {
        try {
            let inventory = await inventoryModel.findOne({
                _id: id,
                isDeleted: false
            }).populate({
                path: 'product',
                select: 'title slug price description category images'
            })
            if (!inventory) {
                throw new Error('Inventory not found')
            }
            return inventory
        } catch (error) {
            throw error
        }
    },

    GetInventoryByProductId: async function (productId) {
        try {
            let inventory = await inventoryModel.findOne({
                product: productId,
                isDeleted: false
            }).populate({
                path: 'product',
                select: 'title slug price description category images'
            })
            if (!inventory) {
                throw new Error('Inventory not found for this product')
            }
            return inventory
        } catch (error) {
            throw error
        }
    },

    AddStock: async function (productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('Quantity must be greater than 0')
            }
            let inventory = await inventoryModel.findOne({
                product: productId,
                isDeleted: false
            })
            if (!inventory) {
                throw new Error('Inventory not found')
            }
            inventory.stock += quantity
            await inventory.save()
            return inventory
        } catch (error) {
            throw error
        }
    },

    RemoveStock: async function (productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('Quantity must be greater than 0')
            }
            let inventory = await inventoryModel.findOne({
                product: productId,
                isDeleted: false
            })
            if (!inventory) {
                throw new Error('Inventory not found')
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock')
            }
            inventory.stock -= quantity
            await inventory.save()
            return inventory
        } catch (error) {
            throw error
        }
    },

    ReserveStock: async function (productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('Quantity must be greater than 0')
            }
            let inventory = await inventoryModel.findOne({
                product: productId,
                isDeleted: false
            })
            if (!inventory) {
                throw new Error('Inventory not found')
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock to reserve')
            }
            inventory.stock -= quantity
            inventory.reserved += quantity
            await inventory.save()
            return inventory
        } catch (error) {
            throw error
        }
    },

    SoldStock: async function (productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('Quantity must be greater than 0')
            }
            let inventory = await inventoryModel.findOne({
                product: productId,
                isDeleted: false
            })
            if (!inventory) {
                throw new Error('Inventory not found')
            }
            if (inventory.reserved < quantity) {
                throw new Error('Insufficient reserved stock')
            }
            inventory.reserved -= quantity
            inventory.soldCount += quantity
            await inventory.save()
            return inventory
        } catch (error) {
            throw error
        }
    }
}
