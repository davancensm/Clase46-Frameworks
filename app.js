const koa = require("koa")
const session = require("koa-session")
const dotenv = require("dotenv")
const passport = require("passport")
const mongoose = require("mongoose")
const koaBody = require("koa-body")
const render = require("koa-ejs")
const path = require("path")
const { logConsole, logError } = require("./src/services/users.services.js")
const { router } = require("./src/router/users.routes.js")

dotenv.config()

const app = new koa()
app.use(koaBody())

const URL = process.env.URL
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 30000
    }
},app))
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) return ("Unable to Connect")
    logConsole.info("Connect to DB")
})

app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes())

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
})
app.use(async(ctx)=>{
    await ctx.render("index")
})
const PORT = process.env.PORT ||3000
const server = app.listen(PORT,()=>{
    console.log(`Server run on PORT: ${PORT}`)
})
server.on("Error",(err)=>{
    console.log(err)
})