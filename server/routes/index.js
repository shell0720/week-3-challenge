var express = require('express');
var router = express.Router();
var path = require('path');
var add = require("../public/module/add");
var subtract = require("../public/module/subtract");
var multiply = require("../public/module/multiply");
var divide = require("../public/module/divide");
router.post('/data',function(request,response){
  var value = request.body;
  var a = parseInt(value.x);
  var b = parseInt(value.y);
  if (value.type == "+"){
    var result = add(a,b).toString();
    response.send(result);
  }else if(value.type == "-"){
    var result = subtract(a,b).toString();
    response.send(result);
  }else if(value.type == "*"){
    var result = multiply(a,b).toString();
    response.send(result);
  }else if(value.type == "/"){
    var result = divide(a,b).toString();
    response.send(result);
  }else{
    response.send("Opps...");
  }
});

router.get('/*',function(req,res){
  console.log("Here is a console.log");
  var file = req.params[0]||'views/index.html';
  res.sendFile(path.join(__dirname,'../public',file));

});

module.exports = router;
