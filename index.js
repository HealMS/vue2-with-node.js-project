let express = require("express")
let app = express()
let router = express.Router()

app.use("/fir", router)
app.get("/fir", (req, res) => {
    res.send("Hello World.")
})
router.get("/sec", (req, res) => {
    res.send("second.")
})
router.get("/thr", (req, res) => {
    res.send("third.")
})

let server = app.listen(3000, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`App is running at http://${host}:${port}`)
})