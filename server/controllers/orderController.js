const asyncHandler = require('../middleware/asyncHandler')
const { Order } = require('../models')

// @desc    Create new order
// route    POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
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
        res.send('get all orders')
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Get logged in user orders
// route    GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    try {
        res.send('get my orders')
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// @desc    Get order by ID
// route    GET /api/orders/:orderID
// @access  Private
const getOneOrder = asyncHandler(async (req, res) => {
    try {
        res.send('get order by id')
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