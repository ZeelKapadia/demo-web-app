const express = require("express");
const router = express.Router()


const AuthController = require("../controllers/AuthController")
/** 
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              -name
 *              -mobile
 *              -email
 *              -password
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the user
 *              email:
 *                  type: string
 *                  description: email of the user
 *              mobile:
 *                  type: string
 *                  description: mobile  of the user
 *              password:
 *                  type: string
 *                  description: password of the user
*/
/** 
 * @swagger
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              -username
 *              -password
 *          properties:
 *              username:
 *                  type: string
 *                  description: please enter your email at the place of username
 *              password:
 *                  type: string
 *                  description: password of the user
*/
/** 
 * @swagger
 * components:
 *  schemas:
 *      loginResponse:
 *          type: object
 *          required:
 *              -message
 *              -token
 *              -refreshToken
 *          properties:
 *              message:
 *                  type: string
 *                  description: name of the user
 *              token:
 *                  type: string
 *                  description: email of the user
 *              refreshToken:
 *                  type: string
 *                  description: mobile  of the user
*/
/** 
 * @swagger
 * components:
 *  schemas:
 *      refreshToken:
 *          type: object
 *          required:
 *              -refreshToken
 *          properties:
 *              refreshToken:
 *                  type: string
 *                  description: name of the user
*/

/**
 * @swagger
 *  /api/register:
 *   post:
 *      summary: Add new User
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/user'
 *      responses:
 *          '201':
 *              description: User registered successfully
 *              content: 
 *                  application/json:
 *                   schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/user'
 *          '400':
 *              description: Bad Request
*/
router.post('/register', AuthController.register)

/**
 * @swagger
 *  /api/login:
 *   post:
 *      summary: Verify the User
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/login'
 *      responses:
 *          '200':
 *              description: User Logged in Successfully 
 *              content: 
 *                  application/json:
 *                   schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/loginResponse'                    
 *          '204':
 *              description: User not exist
 *          '400':
 *              description: Bad Request       
 *          '417':
 *              description: Exception Failed       
*/
router.post('/login', AuthController.login)

/**
 * @swagger
 *  /api/refresh:
 *   post:
 *      summary: Token Refresher
 *      security:
 *          - Bearer: []
 *      description: please pass the refreshToken from the Login method to refresh your old token before it expires
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/refreshToken'
 *      responses:
 *          '200':
 *              description: Token has been refreshed
 *              content: 
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    items:
 *                      $ref: '#/components/schemas/loginResponse'
 *          '400':
 *              description: Bad Request
*/
router.post('/refresh', AuthController.refreshToken)

/**
 * @swagger
 *  /api/getAdminUser:
 *   get:
 *      summary: getting the UserData
 *      security:
 *          - Bearer: []
 *      tags: [User]
 *      responses:
 *          '200':
 *              description: found
 *              content: 
 *                  application/json:
 *                   schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/user'
 *          '204':
 *              description: No record found
*/
router.get('/getAdminUser',AuthController.getAdminUser)

router.get('/randomPass',AuthController.autoGeneratedPass)

module.exports = router