require('dotenv').config();
const mongoose = require('mongoose');
// connecting to db
const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ybdxn.mongodb.net/tfa-users?retryWrites=true&w=majority`;
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to DB');
}).catch((err) => {
    console.error(err);
});

// schema and model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        default: -1
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;