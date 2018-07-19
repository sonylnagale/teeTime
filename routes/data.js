var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');
/* GET home page. */

router.get('/', function(req, res){
	// var obj = {};
	// obj.title = 'title';
	// obj.data = 'data';
	
	// console.log('params: ' + JSON.stringify(req.params));
	// console.log('body: ' + JSON.stringify(req.body));
	// console.log('query: ' + JSON.stringify(req.query));

	// request.get('https://api.hubapi.com/contacts/v1/contact/email/kodea@hubspot.com/profile?hapikey=' + process.env.apikey +'&property=email', 
	// 	function(response) {
	// 		console.log(response);
	// 	});
	var url = 'https://api.hubapi.com/contacts/v1/contact/email/kodea@hubspot.com/profile?hapikey=' + process.env.apikey +'&property=email&propertyMode=value_only';

	https.get(url, function(response) {
        // Continuously update stream with data
        
       var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            var person = parsed["canonical-vid"];
            var dealURL = 'https://api.hubapi.com/deals/v1/deal/associated/contact/' + person +'/paged?hapikey=' + process.env.apikey +'&includeAssociations=true&limit=10&properties=dealname&properties=first_name'
            https.get(dealURL, function(response) {
				var body = '';
        		response.on('data', function(d) {
            		body += d;
        		});
        		response.on('end', function() {
					console.log(body.deals.properties.first_name);
				});
            // callback({
            //     email: parsed.email,
            // });
        	});
    	});
    });

	// $.ajax({
	//   type: "GET",
	//   url: "https://accesscontrolalloworiginall.herokuapp.com/https://api.hubapi.com/contacts/v1/contact/email/kodea@hubspot.com/profile?hapikey=APIKEYHERE&property=email",
	//   success: function(response){
	//   	console.log(response);
	//   },
	// });
	
// 	res.header('Content-type','application/json');
// 	res.header('Charset','utf8');
// 	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});

module.exports = router;


