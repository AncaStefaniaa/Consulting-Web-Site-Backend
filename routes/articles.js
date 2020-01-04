const express = require('express');
const router = express.Router();

//bring in  article model
let Article = require('../models/article');



// add route
router.get('/add', function(req,res){

        res.render('add_article',{
        title:'Add articles',
        
    });
    });
  
//add submit post
router.post('/add',function(req,res){

    //check if fields are not empty
    req.checkBody('title','Title is required').notEmpty();
    req.checkBody('author','Author is required').notEmpty();
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
            article.author = req.body.author;
            article.body = req.body.body;

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
router.get('/edit/:id',function(req,res){
    Article.findById(req.params.id,function(err, article){
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
    article.author = req.body.author;
    article.body = req.body.body;

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
    let query = {_id:req.params.id}

    Article.remove(query, function(err){

        if(err){
            console.log(err);
        }

        res.send('success');
    });
});

//get single argicle
router.get('/:id',function(req,res){
    Article.findById(req.params.id,function(err, article){
       res.render('article',{
          article:article
       });
    });
});
 
module.exports = router;