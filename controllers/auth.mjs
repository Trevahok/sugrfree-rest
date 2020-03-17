import { UserRegisterValidationSchema, UserLoginValidationSchema, User } from "../models/User.mjs";
import jwt from 'jsonwebtoken'

export var registerController = async (req, res) => {

    try {
        const { error } = await UserRegisterValidationSchema.validate(req.body )
        if (error) throw { error: error.details[0].message }

        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists) return  res.json({ error: "Email already exists." }).status(401)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        var instance = await user.save()
        res.json({ user: instance._id })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}

export var loginController = async (req, res) => {
    try {
        const { err } = await UserLoginValidationSchema.validate(req.body)
        if (err) return res.json({ error: err }).status(401)

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.json({ error: "No such user exists." }).status(401)

        const validpass = await user.passwordMatches(req.body.password)
        if (!validpass) return  res.json({ error: "Please enter the correct password." }).status(401)


        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
        return res.header('Authorization', token).json({ token: token })

    } catch (err) {

        console.log(err)
        res.sendStatus(500)

    }
}
