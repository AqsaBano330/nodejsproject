const express = require('express');
const mogoose = require('mongoose')
const app = express();
app.use(express.json());
const DbUrl = "mongodb+srv://aqsabano08:KXatR1K0n4a197Ay@expressjscluster.ejr3ztl.mongodb.net/?retryWrites=true&w=majority";
const User = require("./models/users")


mogoose.connect(DbUrl).
    then(() => console.log("Database Connected...")).
    catch((err) => console.log(err));


app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (error) {
        console.log("users"), 
        res.send("Something went wrong");
    }
});


app.post("/users", async (req, res) => {
    try {
        const userr = await User.create(req.body);
        res.json(userr);
    }
    catch (error) {
        console.log("users"), res.send("Something went wrong");

    }
});


app.delete("/users:id", async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findOneAndDelete(id);
        res.send("User Deleted Successfully");
    }
    catch (error) {
        console.log("users"), res.send("Something went wrong");

    }
});



// app.put("/:id", async (req, res) => {
//     const {id} = req.params;
//     try {

//         const userr = new User
//         const user = await User.findOneAndUpdate(id, req.body);
//         res.json(user);
//     }
//     catch (error) {
//         console.log("users"), res.send("Something went wrong");

//     }
// });


app.put("/users:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        const user = await User.findByIdAndUpdate(id , req.body);
        res.json(user);
    }
    catch (error) {
        console.error("Error updating user", error); 
        res.status(500).send("Something went wrong");
    }
});




app.listen(8000, () => {
    console.log(`Server is running on ${8000}`);
});