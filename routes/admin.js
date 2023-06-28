var express=require('express')
var router=express.Router();
var url = require('url')
var path = require('path');
const adminmodel = require('../model/adminmodel');

router.use((req,res,next)=>{
    if  (req.session.usn!=undefined && req.session.role=='admin')
    next()
    else
    res.redirect('/login')
})

router.get('/', function(req, res, next) {
     console.log(req.session.usn)
    res.render('admin',{'username':req.session.usn});
});



router.get('/manageuser', function(req, res, next) {
    adminmodel.fatchusers(req.body,(result)=>{
        res.render('manageuser',{'userDetails':result});
    })
});

router.get('/manageuserstatus', function(req, res, next) {
    var p=url.parse(req.url,true).query
    adminmodel.manageuserstatus(p,(result)=>{
        console.log(result)
        res.redirect("/admin/manageuser")
    })
});

router.get('/addcategory',(req,res,next)=>{
    res.render('addcategory',{msg:'addcategory'})
})
router.post('/addcategory',function(req,res,next){
    var categorynm=req.body.categorynm
    var categoryicon=req.files.categoryicon
    console.log(categorynm)
    console.log(categoryicon)
    var filenm=categoryicon.name
    var destinationpath=path.join(__dirname,"../public/uploads/"+filenm)
    
    adminmodel.addCategory(categorynm,filenm,(result)=>{
        if(result)
        {
            categoryicon.mv(destinationpath)

            res.render('addcategory',{title:'Admin'})
        }else{

            res.render('addcategory',{title:'Data Not Insert'})
        }
    })
});



router.get('/addsubcategory',(req,res,next)=>{
    res.render('addsubcategory',{msg:'addsubcategory'})
})
router.post('/addSubcategory',function(req,res,next){
    var clist
    adminmodel.fatchAll('category',(result)=>{
        clist=result
    })
    var categorynm=req.body.categorynm
    // console.log(categoryname)
    var subcategorynm=req.body.subcategorynm
    var subcategoryicon=req.files.subcategoryicon
    // console.log(subcategorynm)
    // console.log(subcategoryicon)
    var filenm=subcategoryicon.name;

    var destinationpath=path.join(__dirname,"../public/uploads/"+filenm)
    
    adminmodel.saveSubCategory(categorynm,subcategorynm,filenm,(result)=>{
        if(result)
        {
           subcategoryicon.mv(destinationpath)
            res.render('addSubcategory',{'clist':clist})
        }else{
            res.render('addSubcategory',{title:'Data Not Insert'})
        }
    })
})

router.get('/showFolder',(req,res,next)=>{
    res.send('showFolder',{title: 'express'})
})
router.post('/showFolder',(req,res,next)=>{
    console.log(req.body);
    adminmodel.showData(req.body,(result)=>{
        if(result.length){
            res.redirect('/users',{title:'express'})
        }
    })
})

module.exports=router;