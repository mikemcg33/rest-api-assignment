const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];

app.post('/users',(req, res) => {
    const { name, email } = req.body;
    if( !name || !email){
        return res.status(400).send("400 Bad Request");
    }
    const id = uuidv4();
    const user = { id, name, email };
    users.push(user);
    return res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(unique => unique.id == id );
    if(!user){
        return res.status(404).send("404 Not Found");
    }
    return res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    if( !name || !email){
        return res.status(400).send("400 Bad Request");
    }
    const { id } = req.params;
    const user = users.find(unique => unique.id == id );
    if(!user){
        return res.status(404).send("404 Not Found");
    }
    const userIndex = users.findIndex(unique => unique.id == id);
    users[userIndex] = { id, name, email };
    return res.status(200).json(users[userIndex]);
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(unique => unique.id == id );
    if(!user){
        return res.status(404).send("404 Not Found");
    }
    const userIndex = users.findIndex(unique => unique.id == id);
    users.splice(userIndex, 1);
    return res.status(204).send();
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing