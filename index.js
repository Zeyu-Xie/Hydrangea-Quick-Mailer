const nodemailer = require("nodemailer")
const express = require("express")
const opn = require("opn")
const path = require("path")

const app = express()
const port = 3000

// 路由部分

// 路由到网页
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
// 路由到发送
app.post("/api/send", (req, res) => {

    const transporter = {
        service: req.body.transporter.service,
        auth: {
            user: req.body.transporter.auth.user,
            pass: req.body.transporter.auth.pass
        }
    }
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
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(404).send("ERROR " + err)
            return
        }
        else {
            res.send("Successful")
            return
        }
    })
})

app.listen(port, () => {
    console.log("Successful")
})