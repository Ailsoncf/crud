const knex = require('../database/connection')
const { update } = require('../database/connection')

module.exports = {
  async index(request, response) {
    const products = await knex('products').select('*')

    return response.json(products)
  },

  async store(request, response) {
    const { title, description } = request.body

    const product = {
      title,
      description,
    }

    await knex('products').insert(product)

    return response.json(product)
  },

  async show(request, response) {
    const { id } = request.params

    const product = await knex('products').where('id', id).first()

    return response.json(product)
  },

  async update(request, response) {
    const { id } = request.params

    const { title, description } = request.body

    const updatedProduct = {
      title,
      description,
    }

    await knex('products').where('id', id).update(updatedProduct)

    return response.json(updatedProduct)
  },

  async destroy(request, response) {
    const { id } = request.params

    await knex('products').where('id', id).delete()

    return response.send()
  },
}
