const Product = require('../models/products')
const { update } = require('../models/products')

module.exports = {
  async index(request, response) {
    const products = await Product.find()

    return response.json(products)
  },

  async show(request, response) {
    const { id } = request.params

    const product = await Product.findById({ _id: id })

    return response.json(product)
  },

  async store(request, response) {
    const { title, description } = request.body

    const product = await Product.create({
      title,
      description,
    })

    return response.status(201).json(product)
  },

  async update(request, response) {
    const { id } = request.params
    const { title, description } = request.body

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
      },
      { new: true }
    )

    return response.json(product)
  },

  async destroy(request, response) {
    const { id } = request.params

    await Product.findByIdAndRemove({ _id: id })

    response.json({ message: 'Product deleted.' })
  },
}
