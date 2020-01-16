const express = require('express');
const router = express.Router();

//bring in  article model
let Article = require('../models/article');

//bring in the user model
let User = require('../models/user');


// add route
router.get('/add', ensureAuthenticated,function(req,res){

        res.render('add_article',{
        title:'Add articles',
        
    });
    });
  
//add submit post
router.post('/add',function(req,res){

    //check if fields are not empty
    req.checkBody('title','Title is required').notEmpty();
    //------MODIFICAREEE------//
    req.checkBody('image','Image is required').notEmpty();
    req.checkBody('body','Body is required').notEmpty();

    //get errors
    let errors = req.validationErrors();
    if(errors){
        res.render('add_article', {
            title:'Add Article',
            errors:errors
        });
    }else{
        let article = new Article();
            article.title = req.body.title;
            article.author = req.user._id;
            article.body = req.body.body;
            //---MODIFICAREEE----//
            article.postDate = GetDate();
            article.image = req.body.image;

            article.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
                else{
                req.flash('success','Article added');
                res.redirect('/'); 
                }
            });
    }
});  


//load edit form
router.get('/edit/:id',ensureAuthenticated,function(req,res){
    Article.findById(req.params.id,function(err, article){
        if(article.author != req.user._id){
            req.flash('danger','Nu esti autorizat sa accesezi sectiunea!')
            res.redirect('/');
        }
       res.render('edit_article',{
          title:'edit article',
          article:article
       });
    });
});


//edit submit
router.post('/edit/:id',function(req,res){
    let article = {};
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;
    //---MODIFICAREEE----//
    article.postDate = GetDate();
    article.image = req.body.image;

    let query = {_id:req.params.id}

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
           req.flash('success','Article updated');
           res.redirect('/'); 
        }
    });
});  

router.delete('/:id', function(req, res){

    if(!req.user._id){
        res.status(500).send();
    }

    let query = {_id:req.params.id}


    Article.findById(req.params.id, function(err, article){

        if(article.author != req.user._id){
            res.status(500).send();
        }
        else{

                Article.remove(query, function(err){

                if(err){
                    console.log(err);
                }

                res.send('success');
                });

        }
    });
    
});

//get single argicle
router.get('/:id',function(req,res){
    Article.findById(req.params.id,function(err, article){
        User.findById(article.author, function(err, user){
            res.render('article',{
                    article:article,
                    author: user.name
                });
        });
        
    });
});
 
 //access
 function ensureAuthenticated(req,res,next){
     if(req.isAuthenticated() && req.user.admin == true){// aici admin cica
         return next();
     }
     else{
         req.flash('danger','Please login');
         res.redirect('/users/login');
     }
 }

 function GetDate (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
        } 

    if (mm < 10) {
        mm = '0' + mm;
    } 
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}
module.exports = router;