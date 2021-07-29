import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

const router = Router()

/* GET users listing. */
router.get('/login', isLoggedIn, profileCtrl.getUsername)
router.post('/set', isLoggedIn, profileCtrl.setUsername)

router.get('/verify', isLoggedIn, (req, res, next) => {
  res.render('verify.ejs')
})

router.post('/verify', isLoggedIn, profileCtrl.verify)

router.get('/:id', isLoggedIn, profileCtrl.getProfile)

// router.put('/username')
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}

export {
  router
}
