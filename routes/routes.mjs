import { loginRequiredMiddleware } from '../middlewares/auth.mjs'
import { RouterSet } from '../lib/routerset.mjs'
import { MenuSchema, FoodSchema, IngredientSchema, NutritionSchema, StepSchema, RecipeSchema } from '../models/Food.mjs';


const menuRouterSet = new RouterSet('menu', MenuSchema )
const foodRouterSet = new RouterSet('food', FoodSchema, loginRequiredMiddleware)
const ingredientRouterSet = new RouterSet('ingredient', IngredientSchema, loginRequiredMiddleware)
const nutritionRouterSet = new RouterSet('nutrition', NutritionSchema, loginRequiredMiddleware)
const stepRouterSet = new RouterSet('step', StepSchema, loginRequiredMiddleware)
const recipeRouterSet = new RouterSet('recipe', RecipeSchema, loginRequiredMiddleware)

export const menuRouter =  menuRouterSet.getRouter()
export const foodRouter =  foodRouterSet.getRouter()
export const ingredientRouter =  ingredientRouterSet.getRouter()
export const nutritionRouter =  nutritionRouterSet.getRouter()
export const stepRouter =  stepRouterSet.getRouter()
export const recipeRouter =  recipeRouterSet.getRouter()
