require('dotenv').config();
const path = require('path');
const { Auth } = require('two-step-auth');
const User = require('./db');
const md5 = require('md5');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
    res.status(200).render('login');
});
app.post("/login", async(req, res) => {
    async function authenticate(emailId, usrId) {
        try {
            const result = await Auth(emailId, "TFA Tutorial");
            console.log(result.mail);
            console.log(result.OTP);
            console.log(result.success);
            if (result.success) {
                await User.findByIdAndUpdate(usrId, { "otp": result.OTP });
                res.status(303).redirect("/authWall/:" + usrId);
            }
            else
                res.status(500).end('server error');
        }
        catch (err) {
            console.error(err);
            res.status(500).end('server error');
        }
    }
    await User.find({ "email": req.body.mail }, '_id password').exec((err, result) => {
        if (md5(req.body.password) === result[0].password)
            authenticate(req.body.mail, result._id);
        else
            res.status(200).send("Password didn't match");
    });
});
app.get("/register", (req, res) => {
    res.status(200).render('register');
});
app.post("/register", async (req, res) => {
    try {
        const user = new User({
            email: req.body.mail,
            password: md5(req.body.password)
        });
        await user.save();
        res.status(303).redirect("/");
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
app.get("/authWall/:id", (req, res) => {
    res.status(200).render('auth-wall', {id: res.params.id});
});
app.post("/authWall/:id", async (req, res) => {
    await User.findById(req.params.id, 'otp', (err, result) => {
        if (err) {
            res.status(404).send('Not found !');
        }
        else {
            if (req.otp === result.otp)
                res.status(200).end('2 Factor Auth passed !');
        }
    });
});
// 404 response
app.get("/*", (rew, res) => {
    res.status(404).send();
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
})