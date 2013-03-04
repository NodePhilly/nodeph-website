var stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_kIPiTmbushJpYUGeCsC5rf2O' // test secret key
  , stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_sW4GNqFfDoNHa4uZH05BIU4w' // test publishable key
  , stripe = require('stripe')(stripeSecretKey)
  , log = require('../lib/logger'); 
  
exports.index = function(req, res){
  res.render('sponsorship', {
    publishableKey: stripePublishableKey 
  });
};

exports.post = function(req, res) {
  var token = req.body.stripeToken,
      amount = req.body.amount,
      type = req.body.type;

  var charge = {
    amount: amount * 100,
    currency: 'usd',
    card: token,
    description: type + ' Sponsorship ' + amount
  };

  stripe.charges.create(charge, function(err, result) {    
    var result;

    if (err) {
      result = { 
        succeeded: false, 
        message: 'charge failed', 
        data: err 
      };
    } else {
      result = { 
        succeeded: true, 
        message: 'charge succeeded', 
        data: result 
      };
    }

    log.info(JSON.stringify(result));

    res.render('sponsorship/result', { 
      result : result
    });
  });
};