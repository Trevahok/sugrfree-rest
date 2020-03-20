import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import morgan from 'morgan'
import cors from 'cors'

import authRouter from './routes/auth.mjs'
import { menuRouter, foodRouter, ingredientRouter, nutritionRouter, stepRouter, recipeRouter}  from './routes/routes.mjs'

import swagger from 'swagger-ui-express'
import yaml from 'js-yaml'
import fs from 'fs'

dotenv.config()

const swaggerDocs = fs.readFileSync('./docs/index.yml', 'utf8');

mongoose.connect( 
    process.env.DB_CONNECT , 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    ()=>{
        console.log('db is connected')
    }
)

var app = express()

app.use(cors())
app.use( express.json() )
app.use(morgan('tiny'))


app.use('/user', authRouter )

app.use('/docs', swagger.serve, swagger.setup( yaml.safeLoad(swaggerDocs)));

app.get('/', (req, res ) => {
    return res.json({
        messsage: "Visit /docs for endpoint documentation."
    })
})

app.use('/food', foodRouter )
app.use('/ingredients', ingredientRouter )
app.use('/recipe', recipeRouter )
app.use('/nutrition', nutritionRouter )
app.use('/menu', menuRouter )
app.use('/step', stepRouter )

app.use((req, res, next) => {
    return res.status(404).send({ error: 'This Route '+req.url+' Not found.' });
});
app.listen(process.env.PORT || 8000)