const passport = require("passport")
const Router = require("koa-router")
const { isAuth } = require("../services/users.services.js")
const { getHome, getInvalidPassword, getLogin, getLogout, getProfile, getSignup, getUserExist, postLogin, postSignup } = require("../controllers/users.controller.js")

const router = new Router({
    prefix:"/"
})

router.get('/', getHome)

router.get('/signup', getSignup)

router.get('/login', getLogin)

router.get('/profile', isAuth, getProfile)

router.get('/logout', isAuth, getLogout)

router.get('/userExist', getUserExist)

router.get('/invalidPassword', getInvalidPassword)

router.post("/signupForm", passport.authenticate('signup', {
    failureRedirect: '/invalidPass',
}), postSignup)
router.post("/loginForm", passport.authenticate("login", {
    failureRedirect: "/userExists",
}), postLogin)

module.exports = { router }