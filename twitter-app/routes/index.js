var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twitter_database_precogg');
var mdb = mongoose.connection;


var url = 'mongodb://localhost:27017/twitter_database_precogg';
// var url = 'mongodb://localhost:27017/precog';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');  
});

// Task A(Part A)
router.get('/get_locations', function(req, res, next) {
	var locations = {};
	var flag = 0;
	mongo.connect(url, function(err, db){
		var cursor = db.collection('tweets_precoggg').find({});
		cursor.each(function(err, item) {
			if(item!=null && item.user && flag == 0){
				if(item.user.location in locations)
					locations[item.user.location] += 1
				else
					locations[item.user.location] = 1
			}else{
				if(flag==0){
					res.send(locations);
					flag = 1;
				}
			}
		});
	});	
});

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

// Task A(Part B)
router.get('/get_top_ten', function(req, res, next) {
	var hash_tags = {};
	mongo.connect(url, function(err, db){
		var hash_tags = {};
		mongo.connect(url, function(err, db){
			var cursor = db.collection('tweets_precoggg').find({});
			cursor.each(function(err, item) {
				if(item){
					if(item.entities){
						var ht = item.entities.hashtags;
						for(var k=0;k<ht.length;k++){
							txt = ht[k].text;
							if(txt in hash_tags){
								hash_tags[txt] += 1;
							}else{
								hash_tags[txt] = 1;
							}
						}
					}
				}else{
					var t = getSortedKeys(hash_tags);
					var send_array = {};
					for(var j=0;j<10;j++){
						send_array[j] = t[j];
					}
					res.send(send_array);
				}
			});
		});	
	});	
});

// Task A(Part C)
router.get('/get_retweet_count', function(req, res, next) {
	var tweets = {};
	i = 1;
	mongo.connect(url, function(err, db){
		var cursor = db.collection('tweets_precoggg').find({});
		cursor.each(function(err, item) {
			if(item){
				if(item.retweeted_status)
					if(item.retweeted_status.retweet_count < 100){
						if(tweets["< 100"]){
							tweets["< 100"] += 1;
						}else{
							tweets["< 100"] = 1;
						}
					}else if(item.retweeted_status.retweet_count > 100){
						if(tweets["100 < x < 200"]){
							tweets["100 < x < 200"] += 1;
						}else{
							tweets["100 < x < 200"] = 1;
						}
					}else if(item.retweeted_status.retweet_count > 200){
						if(tweets["200 < x < 300"]){
							tweets["200 < x < 300"] += 1;
						}else{
							tweets["200 < x < 300"] = 1;
						}
					}else{
						if(tweets[">300"]){
							tweets[">300"] += 1;
						}else{
							tweets[">300"] = 1;
						}
					}
			}else{
				res.send(tweets);
				// console.log(tweets);
			}
		});
	});
});

// Task A(Part D)
router.get('/get_text_image', function(req, res, next) {
	var count = new Array();
	text = 1;
	image = 1;
	ti = 1;
    count[0] = ['Type', 'Count'];
    count[2] = ['Image', 0];
	mongo.connect(url, function(err, db){
		var cursor = db.collection('tweets_precoggg').find({});
		cursor.each(function(err, item) {
			if(item){
				if(item.entities){
					if(item.entities.urls.length == 0){
						count[1] = ['Text', text];
						text++;
					}else if(item.text == ""){
						count[2] = ['Image', image];
						image++;
					}else{
						count[3] = ['Image + Text', ti];
						ti++;
					}
				}
			}else{
				res.send(count);
			}
		});
	});	
});


router.get('/get-data', function(){
	db.collection('players').insertOne(item, function(err, result){
		console.log('done!');
		db.close();
	});
});


module.exports = router;