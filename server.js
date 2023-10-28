const nodemailer = require("nodemailer")
const express = require("express")
const opn = require("opn")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(express.static("."))
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const corsOptions = {
    origin: '*', // 允许的来源
    optionsSuccessStatus: 200 // 一些浏览器可能会发送预检请求（OPTIONS），这里指定成功的状态码
};

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

    let code = 200
    let r = ""
    let ok = true

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            code = 404
            r = "ERROR" + error
            ok = false
        }
        else {
            code = 200
            r = "Success"
            ok = true
        }
    })

    res.status(code).send(r)

})

app.listen(port, () => {
    console.log("Server Created")
    opn("http://localhost:3000")
})