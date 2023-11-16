const asyncHandler = require('../middleware/asyncHandler')
const { Order } = require('../models')
const { calcPrices } = require('../utils/calcPrices')

// @desc    Create new order
// route    POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items.')
    } else {
        const itemsFromDB = await Order.find({
            _id: { $in: orderItems.map((i) => i._id) }
        })

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemsFromDB) => itemsFromDB._id.toString() === itemFromClient._id
            )
            return {
                ...itemFromClient,
                book: itemFromClient._id,
                price: matchingItemFromDB.standardPrice,
                _id: undefined
            }
        })

        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calcPrices(dbOrderItems)

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

    try {
        res.send('add order items')
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Get all orders
// route    GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Get logged in user orders
// route    GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Get order by ID
// route    GET /api/orders/:orderID
// @access  Private
const getOneOrder = asyncHandler(async (req, res) => {
    try {
        const order = await Order
            .find({ user: req.params.orderID })
            .populate('user', 'name email')
        
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404)
            throw new Error('No order found with that ID.')
        }
        
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Update order to paid
// route    PUT /api/orders/:orderID/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    try {
        res.send('update order to paid')
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Update order to delivered
// route    PUT /api/orders/:orderID/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    try {
        res.send('update order to delivered')
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOneOrder,
    updateOrderToPaid,
    updateOrderToDelivered
}