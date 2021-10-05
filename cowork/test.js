const express = require('express');

const app = express();

const testObjects = require('./testObject');

app.use(express.json());


app.get('/api/members/:id', (req, res) =>{
    const { id } = req.params;
    const member = testObjects.find((m) => m.id === Number(id));
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({message:'There is no such member'});
    }
});


app.listen(3000, () => {
    console.log('server is listening');
});