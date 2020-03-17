## SugrFree - Live life stresFree

SugrFree - An AI-based 

### Todo Framework

REST APIs are very repetitive, they provide access to a DB object with some User Validation, Authentication and Authorization.

So my plan is, essentially, write one Joi Schema, REST api with documentation is written automatically. One Joi Schema for : 
     - routes
     - documentation
     - controllers
     - mongodb model
     - Input validation
     - GUI interface to access data

- Write a Joi validation schema. 
- Generate Mongoose Model from Joi.
- Generate ControllerSet with CRUD operations namely List, Create , Update and Delete Controllers.
- Generate routes for `/` , `/:id` from the ControllerSet for each method. 
- If the Schema has an Embedded Document, Embedded Document controllerset is added. 
- And/or Schema has an Embedded Document List, Embedded Document List controllerset is added.
- Routerset adds routes for the above and documentation for the routes too. 

- AdminSet adds Toasty forms based admin view into the endpoints to add list, create, update and delete


### Framework Components
---

- controllerSet - CRUD updates 
- routerSet - adds routes to CRUD controllers 
- embeddedDocumentListControllerSet - for embedded documents list in an object 
- documentationSet - adds documentation to routes 
- adminSet - adds Toasty forms rendered UI for REST API

### Tech Stack
----

- JWT - for custom auth framework
- custom controllerSet framework
- swagger - documentation of endpoints 
- express - base framework
- bcrypt - for storing hashed passwords
- docker - for containerization
- kubernetes - for container orchestration
- GKE - google kubernetes engine for hosted kubernetes client


### ControllerSet
---

GET, POST, PUT and DELETE controllers and validation look exactly the same for every Model. To mitigate this, ControllerSet is introduced. All you need to give is one JoiSchema and it will be converted to Mongoose model and saved. 

Controllers | URL | Method| Notes
---| --- | --- | ---
listController   |  /   |  GET | Query parameters are used for querying
createController | /    | POST
detailController | /:id | GET
updateController | /:id | PUT
deleteController | /:id  | DELETE

### EmbeddedDocumentControllerSet
---

If a schema has an embedded document, it will need special CRUD updates. 

Controllers | URL | Method| Notes
---| --- | --- | ---
listController   | /model/embeddedDocument/   |  GET 
createController | /model/embeddedDocument/    | POST
detailController | /:id | GET
updateController | /:id | POST
deleteController | /:id  | DELETE



### EmbeddedDocumentListControllerSet
---

If a schema has an embedded document, it will need special CRUD updates. 
Controllers | URL | Method| Notes
---| --- | --- | ---
listController   |  /   |  GET | Query parameters are used for querying
createController | /    | POST
detailController | /:id | GET
updateController | /:id | POST
deleteController | /:id  | DELETE

