const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employeeController");
const upload = require("../middleware/upload");

const authenticate = require('../middleware/authentication')

/**
 * @swagger
 * components:
 *  schemas:
 *      employee:
 *          type: object
 *          required:
 *              -name
 *              -phone
 *              -email
 *              -age
 *              -designation
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the employees
 *              email:
 *                  type: string
 *                  description: email of the employees
 *              phone:
 *                  type: string
 *                  description: phone of the employees
 *              age:
 *                  type: number
 *                  description: age of the employees
 *              designation:
 *                  type: string
 *                  description: designation of the employees
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      employeePut:
 *          type: object
 *          required:
 *              -name
 *              -phone
 *              -email
 *              -age
 *              -designation
 *          properties:
 *              employeeId:
 *                  type: string
 *                  description: id is always unique to the employees
 *              name:
 *                  type: string
 *                  description: name of the employees
 *              email:
 *                  type: string
 *                  description: email of the employees
 *              phone:
 *                  type: string
 *                  description: phone of the employees
 *              age:
 *                  type: number
 *                  description: age of the employees
 *              designation:
 *                  type: string
 *                  description: designation of the employees
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      employeeGet:
 *          type: object
 *          required:
 *              -employeeId
 *          properties:
 *              employeeId:
 *                  type: string
 *                  description: name of the employees
 */

/**
 * @swagger
 * /api/employee:
 *  get:
 *      summary: Returns all the records
 *      security:
 *          - Bearer: []
 *      tags: [employees]
 *      responses:
 *          '200':
 *              description: Success
 *              content: 
 *                  application/json:
 *                   shcema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/employee'
 *          '204':
 *              description: no-content found
 *   
 *          '400':
 *              description: bad request
 */
router.get("/", authenticate, EmployeeController.indexData);

/**
 * @swagger
 * /api/employee/show:
 *  post:
 *      summary: Returns a record specified the id in the body
 *      security:
 *          - Bearer: []
 *      tags: [employees]
 *      requestBody: 
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/employeeGet'
 *      responses:
 *          '200':
 *              description: the list of employee
 *              content: 
 *                  application/json:
 *                   schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/employee'
 *          '204':
 *              description: no-content found
 *   
 *          '400':
 *              description: bad request
 */
router.post("/show", authenticate, EmployeeController.showData);
// for normal uploadation
// router.post("/store",authenticate,EmployeeController.storeData);

// for multiple file uploadation

/**
 * @swagger
 * /api/employee/store:
 *  post:
 *      summary: stores the employee in the database
 *      security:
 *          - Bearer: []
 *      tags: [employees]
 *      description: this api is used to insert data into database
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/employee'
 *      responses:
 *          '201':
 *              description: Added succesfully
 *   
 *          '406':
 *              description: not Acceptable --occures while u make any mistake in parameters or passing the data
 */
// router.post("/store", authenticate, upload.array('avtar[]'), EmployeeController.storeData);

// for single file uploadation
router.post("/store",authenticate,upload.single('avtar'),EmployeeController.storeData);

/**
 * @swagger
 * /api/employee/update:
 *  put:
 *      summary: Updates a particular record
 *      security:
 *          - Bearer: []
 *      tags: [employees]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/employeePut'
 *      responses:
 *          '201':
 *              description: employee updated
 *          '304':
 *              description: NOT_ACCEPTABLE
 */
router.put("/update", authenticate, EmployeeController.updateData);


/**
 * @swagger
 * /api/employee/delete:
 *  delete:
 *      summary: Hard delete the records
 *      security:
 *          - Bearer: []
 *      tags: [employees]
 *      requestBody: 
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/employeeGet'     
 *      responses:
 *          '200':
 *              description: the record has been deleted successfully
 */
router.delete("/delete", authenticate, EmployeeController.deleteData);


/**
 * @swagger
 * /api/employee/customPagination:
 *  get:
 *   summary: can get the data according to the pagination
 *   tags: [employees]
 *   parameters:
 *    - in: query
 *      name: page
 *      required: true
 *      schema: 
 *          type: integer
 *    - in: query
 *      name: limit
 *      required: true
 *      schema: 
 *          type: integer
 *   responses:
 *      200: 
 *          description: Sucessfull
 *          content: 
 *             application/json:
 *                items:
 *                    $ref: '#/components/schemas/employee'      
*/
router.get("/customPagination", EmployeeController.customPagination);


/**
 * @swagger
 * /api/employee/sortRecs:
 *  get:
 *   summary: can sort the records in ascending order with the name columns
 *   tags: [employees]
 *   responses:
 *      200: 
 *          description: Sucessfull
 *          content: 
 *             application/json:
 *                items:
 *                    $ref: '#/components/schemas/employee'    
 *       
*/
router.get("/sortRecs", EmployeeController.sortRecs);

/**
 * @swagger
 * /api/employee/sortWithPagination:
 *  get:
 *   summary: can get the data according to the pagination and can sort as well
 *   tags: [employees]
 *   parameters:
 *    - in: query
 *      name: page
 *      required: true
 *      schema: 
 *          type: string
 *    - in: query
 *      name: limit
 *      required: true
 *      schema: 
 *          type: string
 *    - in: query
 *      name: sort
 *      required: true
 *      schema: 
 *          type: string
 *    - in: query
 *      name: sortOrder
 *      required: true
 *      schema: 
 *          type: string
 *   responses:
 *      200: 
 *          description: Sucessfull
 *          content: 
 *             application/json:
 *                items:
 *                    $ref: '#/components/schemas/employee'     
 *      400: 
 *          description: Sucessfull
*/
router.get("/sortWithPagination", EmployeeController.sortWithPagination);

/**
 * @swagger
 * /api/employee/searchRec:
 *  get:
 *   summary: can get the data by searching
 *   tags: [employees]
 *   parameters:
 *    - in: query
 *      name: searchBy
 *      required: true
 *      schema: 
 *          type: string
 *    - in: query
 *      name: search
 *      required: true
 *      schema: 
 *          type: string
 *   responses:
 *      200: 
 *          description: Sucessfull
 *          content: 
 *             application/json:
 *                items:
 *                    $ref: '#/components/schemas/employee'    
 *      204: 
 *          description: no record found
*/
router.get("/searchRec", EmployeeController.searchRec);

module.exports = router;
