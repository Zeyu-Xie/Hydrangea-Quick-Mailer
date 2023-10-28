const nodemailer = require("nodemailer")
const express = require("express")
const opn = require("opn")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(express.static("./pages"))
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// 路由到网页
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
// 路由到发送
app.post("/api/send", (req, res) => {

    const transporter = nodemailer.createTransport({
        service: req.body.transporter.service,
        auth: {
            user: req.body.transporter.auth.user,
            pass: req.body.transporter.auth.pass
        }
    })
    const mailOptions = {
        from: {
            name: req.body.mailOptions.from.name,
            address: req.body.mailOptions.from.address
        },
        to: req.body.mailOptions.to,
        cc: req.body.mailOptions.cc,
        bcc: req.body.mailOptions.bcc,
        subject: req.body.mailOptions.subject,

        text: req.body.mailOptions.text,
        html: req.body.mailOptions.html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(404).send("ERROR", error)
            return
        }
        else {
            res.send("Success")
            return
        }
    })

})

app.listen(port, () => {
    console.log("Server Created")
    opn("http://localhost:3000")
})