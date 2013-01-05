var config = require('./config/config');
var User = require('../../app/models/user');


exports.key = function (req, res){
  var api_key = req.query.api_key;
  var call_id = req.query.call_id;
  var signature = req.query.signature;

  var sig = crypto.createHash('md5').update(config.gameon.API_KEY + call_id).digest("hex");

  if (api_key === config.gameon.API_KEY && sig === signature) {
    next();
  } else {
    res.send(401, { error: 'User not authorized' });
  }
};


exports.user = function(req, res){
  var uid = req.body.uid || req.query.uid;
  var token = req.body.token || req.query.token;

  User.findOne({ 'email': uid }, function (err, user) {
    if (!err && user) {
      next();
    } else {
      res.send(401, {error: 'User not found'});
    }
  });
};
