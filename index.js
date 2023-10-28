const _serviceProvider = document.getElementById("serviceProvider")
const _username = document.getElementById("username")
const _password = document.getElementById("password")
const _name = document.getElementById("name")
const _from = document.getElementById("from")
const _to = document.getElementById("to")
const _cc = document.getElementById("cc")
const _bcc = document.getElementById("bcc")
const _subject = document.getElementById("subject")
const _text = document.getElementById("text")
const _html = document.getElementById("html")
const _file = document.getElementById("file")
const _submit = document.getElementById("submit")

_submit.addEventListener("click", () => {

    const transporter = {
        service: _serviceProvider.value,
        auth: {
            user: _username.value,
            pass: _password.value
        }
    }

    const mailOptions = {
        from: {
            name: _name.value,
            address: _from.value
        },
        to: _to.value,
        cc: _cc.value,
        bcc: _bcc.value,
        subject: _subject.value,

        text: _text.value,
        html: _html.value
    }

    fetch("./api/send", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transporter: transporter,
            mailOptions: mailOptions
        })
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    }).catch(err => {
        console.log("ERROR", err)
    })
})