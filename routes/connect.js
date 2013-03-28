var nodemailer = require('nodemailer');

exports.index = function(req, res) {
	res.render('connect');
};

exports.post = function(req, res){
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "notify@node.ph",
	        pass: "bretastic"
	    }
	});

  var contactType = function(){
		var contact = '';
		if(req.body.generalinq === 'on'){
			contact = 'General Inquiry';
		}
		
		if(req.body.hostevent === 'on'){
			if(contact !== ''){
				contact = contact + ', ';
			}
			contact = contact + 'Hosting an Event';
		}
		
		if(req.body.speaker === 'on'){
			if(contact != ''){
				contact = contact + ', ';
			}
			contact = contact + 'Speak at an Event';
		}
		
		return contact;
	};
	var message = "Hi Node.ph Team, \n We just got notification that someone wants to connect with us. \n" +
	"======================================= \n" + 
	"Contact info: \n" +
	"username: " + req.body.username + "\n" +
	"email: " + req.body.useremail + "\n" +
	"Contact For: " + contactType() + " \n\n" +
	"Personal Message that " + req.body.username + " shared with us:\n" +
	req.body.usermessage + "\n" +
	"=======================================";
	
	var mailOptions = {
	    from: "Team Node.ph <notify@node.ph>", // sender address
	    to: "team@node.ph", // list of receivers
	    subject: "New Connect Request", // Subject line
	    text: message // plaintext body
	};
	
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }

	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
	
};