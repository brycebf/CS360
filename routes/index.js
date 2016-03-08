var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});

router.use(express.static('public'));

router.get('/getcity', function(req, res) {
	console.log("In getcity route");
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
		if(err) 
		{
			throw err;
		}
	    var cities = data.toString().split("\n");
	    var myRe = new RegExp("^" + req.query.q);
	  	//console.log(myRe);
	  	var jsonresult = [];
	    for(var i = 0; i < cities.length; i++) 
	    {
	    	var result = cities[i].search(myRe);
	    	if(result != -1) 
	    	{
            	//console.log(cities[i]);
            	jsonresult.push({city:cities[i]});
        	}
		}
        //console.log(jsonresult);
        res.status(200).json(jsonresult);
	})
});

router.get('/getxkcd', function(req, res) {
	console.log("In getxkcd route");
	var xkcd = "http://xkcd.com/info.0.json";
	request(xkcd).pipe(res);
});

var weather = "https://api.wunderground.com/api/5e674d9f897208bf/geolookup/conditions/q/UT/Provo.json";
router.get('/getweather', function(req, res) {
	console.log("In getweather route");
	request(weather).pipe(res);
});

var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
router.get('/politics', function(req,res) {
  console.log("In politics");
  request(politics).pipe(res);
});

module.exports = router;