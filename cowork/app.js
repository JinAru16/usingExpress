const express = require('express');

const app = express(); // express로 만든 객체는 app이라고 관습적으로 이름을 붙임

const db = require('./models/');

const { Member } = db;

app.use(express.json()); // request가 rout handller에게 처리되기 전에 필요한 전처리를 하는 함수를 express에서는 미들웨어라고 함

app.get('/api/members', async (req, res) =>{
    const { team } = req.query;
    if (team) {
        const teamMembers = await Member.findAll({ where: { team } });
        res.send(teamMembers);
    } else {
        const members = await Member.findAll();
        res.send(members);
    }
});
 


// 회원 정보를 찾는 메소드
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
        /*
        그리고 아니 그럼 res.send(member) 하면 트루를 리턴하라는거잖아 가 아니고
        그 트루로 나타난 객체를 내보내란 소리임.
        */

    } else { 
        res.status(404).send({message:'There is no member with the id!!'});
    }
});

app.post('/api/members', (req, res) => {
    const newMember = req.body;
    members.push(newMember);
    res.send(newMember);
});


// 회원 정보를 수정하는 put 리퀘스트
app.put('/api/members/:id', (req, res) => {
    const {id} = req.params;
    const newInfo = req.body;
    const member = members.find((m) => m.id === Number(id));
    if (member) {
        // object 객체에 keys를 사용하면 특정 객체의 모든 프로퍼티를 조회가능
        Object.keys(newInfo).forEach((prop) => {
            member[prop] = newInfo[prop];
        });
        res.send(member);
    } else {
        res.status(404).send({ message : 'There is no member with the Id'})
    }
});


// 회원 정보를 삭제하는 delete 리퀘스트
app.delete('/api/members/:id', (req, res) => {
    const { id } = req.params;
    const membersCount = members.length;
    members = members.filter((member) => member.id !== Number(id));
    /*
    입력한 id 이외의 id들을 갖고있는 객체들만 추린다는 뜻. 
    */
    if (members.length < membersCount) {
        res.send({ message: 'Deleted'});
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
});


app.listen(3000, () => {
    console.log('Server is listening...');
    
}); 


/*
package.json파일에 script:{
    "start": node app.js
} 를 등록하면 터미널에 npm start로 간단하게 서버 실행 가능

그리고 npm에서 직접 지정한 명령어 말고 내가 임의로 지정한 명령어들
가령 dev같은건 앞에 run을 붙여줘야함. ex : npm run dev이렇게 
*/