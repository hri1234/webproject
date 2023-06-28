var express = require('express');
var router = express.Router();

//router.use((req,res,next)=>{
  //if(req.session.usn!=undefined && req.session.role=='user')
  //next()
  //else
  //res.redirect('/login')
//})
 

router.get('/', function(req, res, next) {
  res.render('users',{'usn':req.session.usn});
});

module.exports = router;
