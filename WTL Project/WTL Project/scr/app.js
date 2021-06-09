const express =require('express');
const bcrypt = require("bcryptjs")


const path = require('path')
const app = express();
const hbs =require('hbs');
const {json} =require('express')
require("./db/cohn.js")
const Register =require('./model/registers');
const port=process.env.PORT||8000;
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const par_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path))
app.set("view engin","hbs");
app.set("views",template_path)



app.get('/',(req,res)=> {
    res.render('Home.hbs')
})
app.get('/register',(req,res)=> {
    res.render('form.hbs')
})
app.get('/login',(req,res)=> {
    res.render('login.hbs')
})
app.get('/About',(req,res)=> {
    res.render('aboutus.hbs')
})
app.get('/disc',(req,res)=> {
    res.render('disclaimer.hbs')
})
app.get('/tc',(req,res)=> {
    res.render('terms_conditions.hbs')
})

app.post('/submit', async(req,res)=> {
    try{

        const studentin =new Register({
            name:req.body.sname,
            dob:req.body.DOB,
            gender:req.body.gender,
            prn:req.body.PRN,
            email:req.body.email,
            mobilno:req.body.mobile,
            branch:req.body.branch,
            classl:req.body.cl,
            add:req.body.address,
            password:req.body.password,
            
        })
        console.log("cheak")
        // conver password to hashing

        const result=await studentin.save();
        res.status(201).render('index.hbs',{
            Name1:req.body.sname,
            
            Name3:req.body.email,
            Name4:req.body.mobile,
           
        })
        
      
    }catch(err){
        res.status(400).send(err);
    }
})

app.post('/login', async(req,res)=> {
    try{
       const Email= req.body.email;
       const Password=req.body.password;
       console.log(Password)



      const useremail=await Register.findOne({email:Email})

  
      const ismach=await bcrypt.compare(Password,useremail.password);



      if (ismach){
          res.status(201).render('index.hbs',{
            Name1:useremail.name,
            Name3:useremail.email,
            Name4:useremail.mobilno,
          })

      }else{

          res.send("password are not matching")

      }

    }catch(errr){
        res.status(400).sendFile('Invalid Email')
    }
})
app.listen(port,()=>{
    console.log(`appp run on ${port}`);

})
