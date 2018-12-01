import { Router } from 'express'

const router = new Router()

router.get('/:name?', (req, res) =>
  res.json({ hello: req.params.name || 'futaba' })
)

export default router
