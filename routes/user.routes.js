const express = require("express")
//const { connection } = require("./db");
const userRouter = express.Router()
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



userRouter.post("/register", async (req, res) => {
    const { email, pass, location, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({ email, pass: hash, location, age })
            await user.save();
            res.status(200).send({ "msg": "Registration has been done!" })
        })

    }
    catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})
userRouter.post("/login", async (req, res) => {
    //  res.send("login has been done");
    const { email, pass } = req.body;

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            //  res.send({ "msg": "login successfully", "token": jwt.sign({ name: "batman" }, 'bruce') }) 
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({"msg":"Login successfull!","token":jwt.sign({"userID":user._id},"masai")})
                } else {
                    res.status(400).send({ "msg": err.message })
                }
            })
        } else {
            res.send("login failed");
        }

        //await user.Save();
        //res.send("login has been done");
    }
    catch (err) {
        res.send({ "msg": err.message })
    }
})

// userRouter.get("/details", (req, res) => {
//     const { token } = Headers.Authorization;
//     jwt.verify(token, 'bruce', (err, decoded) => {
//         decoded ? res.send("user details") : res.send({ "msg": "login required" });
//     })


//     if (token) {
//         res.send("user details")
//     } else {
//         res.send("access denied");
//     }
// })


module.exports = {
    userRouter
}