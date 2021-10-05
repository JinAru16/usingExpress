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
    /*
    여기서 m이 뭐냐면 객체에서 a: x, b : y, 이런식으로 하잖슴? 여기서 a, b 즉 키를 의미함.
    키 중에서 id가 있을거잖아. :id 자리에 써준 숫자랑 (그게 Number(id)로 표기됨)
    members에 있는 id랑 같으면 True를 리턴하게 함.
    */

    
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({message:'There is no such member'});
    }
});

app.post('/api/members', (req, res) => {
    const newMember = req.body;
    members.push(newMember);
    re.send(newMember);
});



app.listen(3000, () => {
    console.log('Server is listening...');
    
}); 