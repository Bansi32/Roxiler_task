const express = require("express");
const axios = require("axios");

const app = express();

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
        //console.log(data);
        data.map((dataUserId) => {
            delete dataUserId['userId'];
        });
        res.status(200).json({ data });
    }
    catch (e)
    {
        res.status(400).json({message:e.message});
    }
});

//get todos of particular user
app.get("/users/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
        //console.log(data);
        const userData  = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const result = userData.data;

        const filterData = data.filter((each) => {       //filtering the data 
            return each.userId == result.id
        });
        
        // data.map((eachUserId) => {
        //     if (eachUserId['userId'] == result.id)
        //     {
        //         result['todos']=eachUserId;
        //     }
        // });
        result['todos']=filterData;
        res.status(200).json({result});
    }
    catch (e) {
        res.status(400).json({message:e.message});
    }
    
});

//connect to the server
const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Connected to port ${PORT}`);
});