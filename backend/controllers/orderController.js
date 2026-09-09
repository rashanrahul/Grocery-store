const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'All' ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    // Validate items and check stock
    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.id} not found` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({
          error: `Not enough stock for ${product.name}`,
          available: product.stock,
        });
      }
    }

    // Calculate total
    let total = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.id);
      const itemTotal = product.price * item.qty;
      total += itemTotal;
      orderItems.push({
        id: product._id,
        name: product.name,
        nameSi: product.nameSi,
        qty: item.qty,
        price: product.price,
        unit: product.unit,
      });
    }

    // Get next order sequence
    const lastOrder = await Order.findOne().sort({ seq: -1 });
    const seq = lastOrder ? lastOrder.seq + 1 : 10025;
    const orderId = `FM-${seq}`;

    const order = new Order({
      seq,
      id: orderId,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      },
      items: orderItems,
      total,
      status: 'Pending',
    });

    await order.save();

    // Deduct stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.qty },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If cancelling, restore stock
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.id, {
          $inc: { stock: item.qty },
        });
      }
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: 'Pending' });
    const completed = await Order.countDocuments({ status: 'Completed' });
    
    const revenueResult = await Order.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({ total, pending, completed, revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};