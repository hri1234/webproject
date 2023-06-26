var express = require('express');
const indexmodel = require('../model/indexmodel');
var router = express.Router();


/* GET home page. */
router.use('/login',(req,res,next)=>{
  if(req.session.usn!=undefined)
  req.session.destroy()
  next()
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/work',(req ,res ,next)=>{
  res.render('work',{title:'express'})
})

router.get('/reg',(req, res, next)=>{
  res.render('reg',{title:'regeistration seccsesfully'})
})
router.post('/reg',(req,res,next)=>{
  console.log(req.body)
  indexmodel.registration(req.body,(result)=>{
    res.render('login',{title:'express'})
  });
});

router.get('/login',(req,res,next)=>{
  res.render('login',{title:'express'})
});
router.post('/login',(req,res,next)=>{
  console.log(req.body);
  indexmodel.loginCheck(req.body,(result)=>{
    if(result.length)
    {
      // to store user details in session
       req.session.susn=result[0].usn
       req.session.srole=result[0].role
       if(result[0].role=='admin')
       {
        req.flash('msg','login unsucesfully')
        res.redirect("/admin" )
       }
        else
      if(result[0].role=='user'){
        res.redirect("/users")
      }
      }else{
        res.render('login',{title:'Express'})
      }
  });
});

//For authentication and back button destory and manage users code is
router.use('/login',(req,res,next)=>{
  if(req.session.susn!=undefined)
  req.session.destroy()
  next()
})

router.get('/about',(req,res,next)=>{
  res.render('about',{title:'express'})
})

router.get('/massage',(req,res,next)=>{
  res.render('massage',{title:'express'})
})
router.post('/massage',(req,res,next)=>{
  console.log(req.body);
  indexmodel.massage(req.body,(result)=>{
    res.render('index',{title:'express'})
  });
});
module.exports = router;
