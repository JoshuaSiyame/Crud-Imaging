const express = require("express");
const User = require("../model/index").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userAuth = require("../middlewares/userAuth");
const userRole = require("../middlewares/userRoles");

const router = express.Router();

// endpoints
router.get("/users-test", userAuth, (req, res)=>{
    try {
        res.status(200).send("Working");
    } catch (error) {
        console.error("Failed to test user endpoint", error);
        return res.status(400).send("Failed to test user endpoint");
    }
});

router.get("/users", userAuth, userRole, async (req, res)=>{
    try {
        // preview role if both middlewares have worked
        console.log("Role: ", req.role);
        
        // users
        const users = await User.findAll();

        // validate users presence
        if(users.length){
            res.status(200).send(users);
        }
    } catch (error) {
        console.error("Failed to get all users: ", error);
        return res.status(400).send("Failed to get users");
    }
});

router.post("/user", userAuth, async (req, res)=>{
    try {
        // get requested user by email
        const { email } = req.body;

        // assuming its a correct email address & not null
        if(email){
            const user = await User.findAll({ where: { email: email }});

            if(user){
                res.status(200).send(user);
            }
        };
    } catch (error) {
        console.error("Failed to fetch user with specified email address: ", error);
        return res.status(404).send("User with requested email not present");
    }
});

router.post("/new-user", async (req, res)=>{
    try {
        // object destructure
        const { first_name, last_name, email, password, role } = req.body;

        // assuming all variable are valid and not null
        // create password hash
        const salt_rounds = 12;
        const hash = await bcrypt.genSalt(salt_rounds);
        const password_hash = await bcrypt.hash(password, hash);

        // new user object
        const newUser = {
            first_name,
            last_name,
            email,
            // role, // by default this is client,
            password: password_hash
        };

        // preview new user Object
        console.log("New user: ", newUser);

        // save new user
        const savedUser = await User.create(newUser).save();

        if(savedUser){
            res.status(200).send("New user created")
        }
    } catch (error) {
        console.error("Failed to create new user: ", error);
        return res.status(500).send("Failed to create new user");
    }
});

router.post("/user-login", async (req, res)=>{
    try {
        // destructure user objects
        const { email, password } = req.body;

        // check for existing user
        const existingUser = await User.findOne({ email: email });

        if(!existingUser){
            return res.status(404).send("Incorrect email or password");
        }

        // validate user password
        const validPassword = await bcrypt.compare(password, existingUser.password)

        if(validPassword){
            // sign jwt
            const token = jwt.sign({ email: existingUser.email, role: existingUser.role }, 'your secret hash goes here')

            // store token in cookie
            res.cookie('token', token).send("Logged in");
        }
    } catch (error) {
        console.error("Failed to login requested user: ", error);
        return res.status(400).send("Failed to login")
    }
});

router.post("/user-logout", userAuth, async (req, res)=>{
    try {
        // clear token in cookie
        res.cookie('token', '').send("Logged out");
    } catch (error) {
        console.error("Failed to login requested user: ", error);
        return res.status(400).send("Failed to login")
    }
});

// delete account
router.delete("/delete-account", async (req, res)=>{
    try {
        // delete account based on submitted email address
        const { email } = req.body;

        const user = (await User.findOne({ where: { email: email }})).destroy();

        if(user){
            // delete the user
            res.status(201).send("Account deleted");
        }
    } catch (error) {
        console.error("Failed to delete account: ", error);
        return res.status(400).end("Failed to delete account");
    }
});

module.exports = router;