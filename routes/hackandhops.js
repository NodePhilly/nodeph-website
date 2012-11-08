exports.index = function(req, res){
  res.render('hackandhops', { 
  	title: 'Hack and Hops from Node Philly',
  	layout: false
  });
};