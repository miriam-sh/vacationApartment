
import Category from "../models/category.js"

export const getAll = (req, res) => {
    Category.find().populate({ path: 'apartments', select: '-__v -_id' })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { name } = req.body

    const c = new Category({ name })
    c.save()
        .then(c => {
            res.status(200).send(c)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}