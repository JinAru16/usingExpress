const express = require('express');

const app = express(); // express로 만든 객체는 app이라고 관습적으로 이름을 붙임

const members = require('./members');

app.get('/api/members', (req, res) =>{
    const { team } = req.query;
    if (team) {
        const teamMembers = members.filter((m) => m.team === team);
        res.send(teamMembers);
    } else {
        res.send(members);
    }
});

app.get('/api/members/:id', (req, res) =>{
    const { id } = req.params;
    const member = members.find((m) => m.id === Number(id));
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({message:'There is no such member'});
    }
});


app.listen(3000, () => {
    console.log('Server is listening...');
});