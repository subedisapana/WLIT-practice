var express = require('express');
var router = express.Router();
var Users=require('../models/user');
var Notes=require('../models/notes');         //var Notes ho kei farak pardaina


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make A Note' });
});
router.get('/login',function(req,res){          //login ko lagi path leko
	res.render('login');                        //hit gards kun fxn pass garne
});
router.get('/signup',function(req,res){        // signup ko lagi path leko
	res.render('signup');                     //hit gards k
});

/* post */
router.post('/signup',function(req,res){      // terminal ma display garcha signup ko  and database ma save gareko 
	console.log('request.....', req.body);
	var user = new Users({                   //export wala aarko user obj garako
		username: req.body.username,
		password: req.body.password
	});

	var promise=user.save() 
	promise.then((user) => {                  //return gareko save gare pachi
		console.log('user signed up with values',user);
	});
});


router.post('/login',function(req,res){
 // terminal ma display garcha login ko  ani user.find le already db ma bhako find garcha 
	if(req.body.username && req.body.password){
		
	Users.findOne({
	   username:req.body.username,                               //export gareko User
	   password:req.body.password},
	    function(err, user){
		   console.log('logged in user is...',user);
		     res.redirect('/addnote');
		   }); 
}
     else{ console.log('not  a valid Id ');}
});



router.get('/addnote',function(req,res){ 
	res.render('addnote'); 
});
router.post('/addnote',function(req,res){                      //addnote post garna terminal ma and db save garna
	console.log('request', req.body);
		var note = new Notes({
		title: req.body.title,
		subject: req.body.subject
	})

	var promise=note.save() 
	    promise.then((note)=> {
            console.log('saved in a db with values', note);
            Notes.find().exec(function(err,notes){
            res.render('viewnote', {notes})
            });
	});
});


 router.get('/deletenote/:id', function(req, res) {
  Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
    console.log('deleted note is', note);
    res.redirect('/viewnote')
  });
})


 router.get('/viewnote', function (req, res) {
  Notes.find().exec(function(err, notes) {
    res.render('viewnote', {notes})
  });
})




module.exports = router;
