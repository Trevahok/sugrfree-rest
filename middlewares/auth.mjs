import jwt from 'jsonwebtoken'

export const loginRequiredMiddleware = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: "Unauthorized access" })

    try {
        const verfied = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verfied
        next()

    } catch (err) {
        res.status(401).json({ error: "Invalid Token " })

    }
}
export const permissionRequiredMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.header('Authorization')
        if (!token) return res.status(401).json({ error: "Unauthorized access" })

        try {
            const verfied = jwt.verify(token, process.env.SECRET_KEY)
            req.user = verfied
            if (verified.role === role )
                next()
            else return res.status(401).json({ error: "Insufficient permissions. Role required: " + role  })

        } catch (err) {
            return res.status(401).json({ error: "Invalid Token " })

        }
    }
}