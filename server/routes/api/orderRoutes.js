const router = require('express').Router()
const { protect, admin } = require('../../middleware/authMiddleware')

const {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOneOrder,
    updateOrderToPaid,
    updateOrderToDelivered
} = require('../../controllers/orderController')

router.route('/').get(protect, admin, getAllOrders).post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:orderID').get(protect, admin, getOneOrder)
router.route('/:orderID/pay').put(protect, updateOrderToPaid)
router.route('/:orderID/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router