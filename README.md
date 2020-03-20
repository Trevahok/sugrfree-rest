# SugrFree - Live life stresFree

SugrFree - Intended to be an AI-based recommendation engine. This repository contains a complete REST API generator for any given Joi object. Models used : 
- Menu - For Menucard of foods
- Food - Contains Recipes and details of a particular food.
- Recipe - Model for List of Recipes for each food. Contains a list of Steps.
- Step - Each step of a recipe is stored as a separate model to permit CRUD updates individually.
- Ingredient - Model to store Ingredient details.
- Nutrition - Nutrition value of each Ingredient. Can be summed up to find nutrition value of a food. 

### Need for REST API generator
---

REST APIs are very repetitive, they provide access to a DB object with some Validation, Authentication and Authorization.

     So my work is, essentially, write one Joi Schema to produce REST api with documentation is written automatically. One Joi Schema for : 

     - Input validation
     - Mongoose model
     - controllers
     - routes
     - routes for recursively generated endpoints for Embedded Document Lists
     - GUI interface to access data
     - documentation


*ToDo:* 

- AdminSet adds Toasty forms based admin view into the endpoints to add list, create, update and delete
- DocumentSet that generates documentation from RouterSet. 


### Usage : 
---

- Make your model in Joi and add validations.

```js

export const NutritionSchema = Joi.object({
    name: Joi.string().required(),
    calorie: Joi.number().required()

})

```

- Make RouterSet which in turn adds ControllerSet and EmbedControllerSet recursively.

```js
const nutritionRouterSet = new RouterSet('nutrition', NutritionSchema, loginRequiredMiddleware)

```
- Use Generated Router in main  `app`
```js 

app.use('/nutrition', nutritionRouter )

```

### Custom Framework Components
---

- controllerSet - CRUD updates to model 
- routerSet - adds routes to CRUD controllers 
- embedControllerSet - for embedded documents list in an object 
- embedRouterSet - for recursively generate endpionts for nested SubDocuments 
- custom JWT based auth framework
- custom Joi to Mongoose Schema conversion

* ToDo: 

- documentationSet - adds documentation to routes 
- adminSet - adds Toasty forms rendered UI for REST API CRUD updates.


### Tech Stack
----

- JWT - for custom auth framework
- custom controllerSet framework
- custom routerset framework
- custom Joi to Mongoose conversion
- Joi - for defining models and validation
- swagger - documentation of endpoints 
- express - base framework
- bcrypt - for storing hashed passwords
- morgan - for  request logging 
- cors - for CORS headers access 

- docker - for containerization
- kubernetes - for container orchestration
- GKE - google kubernetes engine for hosted kubernetes client


### ControllerSet
---

GET, POST, PUT and DELETE controllers and validation look exactly the same for every Model. To mitigate this, ControllerSet is introduced. All you need to give is one JoiSchema and it will be converted to Mongoose model and saved. 

Controllers | URL | Method| Notes
---| --- | --- | ---
listController   |  /   |  GET | Query parameter `query` is an object which is used for filtering and `fields` a string of comma-separated which is used for projection
createController | /    | POST
detailController | /:id | GET
updateController | /:id | PUT
deleteController | /:id  | DELETE

##### Minutiae 
- Query parameters are taken for filtering and projection by Mongoose.
     - `query` is an URL object that is used to filter query results available at List Endpoints.
     - `fields` is an comma-separated string which contains the fields to project.
- 
 

### EmbedControllerSet
---

If a schema has an embedded document, it will need special CRUD updates to access embedded documents from the URL and no other special methods.  

 If Nested Schema Array is nested inside each other, ControllerSet adds EmbedControllerSet recursively so that even the most innermost Schema has CRUD updates.

Controllers | URL | Method| Notes
---| --- | --- | ---
listController   | /model/:id/embedName/   |  GET 
createController | /model/:id/embedName/    | POST
detailController | /model/:id/embedName/:embedId | GET
updateController | /model/:id/embedName/:embedId | POST
deleteController | /model/:id/embedName/:embedId  | DELETE

*Example:*



##### Minutiae 


- Each controller is bound with a EmbedDocument whose name is given by `this.key` .
- Each controller is bound with a Joi Schema object referenced by `this.schema` .
- The instance for the Controller is provided by `req.instance` . 
- The mongooseArray object is accessed by `req.instance[this.key]` .
