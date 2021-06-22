import express from 'express'
import { ObjectId } from 'mongodb'
import repo from '../repository/repository'
const router = express.Router()

// workaround solution for silence reject
// ref: https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware
const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const db = await repo.open()
    const cursor = await db.find({}, {
      projection: {
        id: 1,
        name: 1,
        orders: 1
      }
    })
    const rawData = await cursor.toArray()
    const respData = rawData.map(ele => {
      return {
        id: ele._id,
        name: ele.name,
        orders: ele.orders
      }
    })
    res.json(respData)
  })
)

router.patch(
  '/:id',
  async (req, res, next) => {
    const { orders, name } = req.body
    if (req.params.id === '' || req.params.id === null || req.params.id === undefined) {
      res.status(400).json({ error: 'need patient id' })
      return
    }

    if ((orders === null || orders === undefined) && (name === null || name === undefined)) {
      res.status(400).json({ error: 'need orders or name to do update' })
      return
    }
    next()
  },
  asyncHandler(async (req, res, next) => {
    const { orders, name } = req.body
    const { id } = req.params
    const data = Object.assign({},
      name ? { name } : null,
      orders ? { orders } : null)

    // try {
    const db = await repo.open()
    const filter = { _id: ObjectId(id) }
    const updateDocument = { $set: data }
    const result = await db.findOneAndUpdate(filter, updateDocument)
    const { ok } = result
    res.json({ ok })
  })
)

router.post(
  '/',
  async (req, res, next) => {
    const { data } = req.body
    if (data === null || data === undefined) {
      res.status(400).json({ error: 'need data array' })
      return
    }
    next()
  },
  asyncHandler(
    async (req, res, next) => {
      const db = await repo.open()
      const ret = await db.insertMany(req.body.data)
      const { ok = -1, n = 0 } = ret.result || {}
      res.json({ ok, n })
    })
)

export default router
