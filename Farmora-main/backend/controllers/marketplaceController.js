const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const seller = req.user.id;
    const product = await Product.create({ name, description, price, quantity, seller });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
