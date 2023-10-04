const express =  require('express');
const { getOrder, getSingleOrder, createOrder, updateOrderStatus, deleteOrder, totalSales } = require('../controllers/OrderController/OrderController');

const orderRoutes = express.Router();

orderRoutes.get('/orders', getOrder);
orderRoutes.post('/orders', createOrder)
orderRoutes.get('/orders/totalsales', totalSales)
orderRoutes.get('/orders/:id', getSingleOrder)
orderRoutes.put('/orders/:id', updateOrderStatus)
orderRoutes.delete('/orders/:id', deleteOrder)


module.exports = orderRoutes