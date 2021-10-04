const express = require('express');

const app = express(); // express로 만든 객체는 app이라고 관습적으로 이름을 붙임

const members = require('./members');

app.use(express.json()); // request가 rout handller에게 처리되기 전에 필요한 전처리를 하는 함수를 express에서는 미들웨어라고 함

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

app.post('/api/members', (req, res) => {
    const newMember = req.body;
    members.push(newMember);
    res.send(newMember);
});



app.listen(3000, () => {
    console.log('Server is listening...');
}); 