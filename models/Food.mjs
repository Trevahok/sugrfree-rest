import Joi from '@hapi/joi'
import constants from '../constants.mjs'


export const NutritionSchema = Joi.object({
    name: Joi.string().required(),
    calorie: Joi.number().required()

})
export const IngredientSchema = Joi.object({
    name: Joi.string().max(100).required(),
    nutrients: Joi.array().items(NutritionSchema)
})

export const StepSchema = Joi.object({
 ingredients: Joi.array().items(IngredientSchema),
 stepNo: Joi.number().required().min(1).max(100),
 description : Joi.string().max(1000),

})

export const RecipeSchema = Joi.object({
    author: Joi.string().required().min(3).max(100),
    steps: Joi.array().items(StepSchema).default([]),
    totalCookTime: Joi.number().optional()
})

export const FoodSchema = Joi.object({
    name: Joi.string().required(),
    cuisine: Joi.string().required().valid( ...constants.cuisines ).default('other'),
    recipes: Joi.array().items(RecipeSchema).default([])

})

export const MenuSchema = Joi.object({
    title: Joi.string().required(),
    foods: Joi.array().items(FoodSchema),
    author: Joi.string().required(),
})