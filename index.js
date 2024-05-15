const express = require('express')

const port = 3760

const app = express()

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    return res.render('list', {
        list: todo
    })
})

let todo = [
    {
        srNo: 1,
        task: "Read A Book"
    },
    {
        srNo: 2,
        task: "Complete Assignments"
    },
    {
        srNo: 3,
        task: "Pay Electricity-Bill"
    }
]

app.post('/insertList', (req, res) => {
    const obj = {
        srNo: req.body.taskId,
        task: req.body.task
    };

    todo.push(obj);
    return res.redirect('back');
});

app.get('/deleteList', (req, res) => {
    let taskId = req.query.srNo;

    let filteredList = todo.filter((list) => {
        return list.srNo != taskId;
    });

    todo = filteredList;

    return res.redirect('back');
});

app.get('/editList' , (req,res)=>{
    let taskId = req.query.srNo;

    let filteredList = todo.filter((user)=>{
        return user.srNo == taskId
    })

    return res.render('edit' , {
        data: filteredList[0]
    })

})

app.post('/editList' , (req,res)=>{
 
    let filteredList = todo.filter((user)=>{
        if(user.srNo == req.body.editId){
            user.task = req.body.task
        }
        return user
    })

    res.redirect('/')
})

app.listen(port, (err) => {
    if (err) {
        console.log("Server Not Started in Port");
        return false
    }
    console.log("Server Started at http://localhost:" + port);
})