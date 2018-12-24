
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
//connection
mongoose.connect("mongodb://caltest:caltest1@ds241664.mlab.com:41664/calenderdb")
//schema
var calSchema=new mongoose.Schema({
  event: String,
  description: String,
  from: Date,
  to: Date
});
//model
var CalenM = mongoose.model('CalenM',calSchema);

/*var testitem=CalenM({event:'event1',descriptiom:'event1',from:26-12-2018,to:30-12-2018}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});*/
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports= function(app){
  app.get('/index',function(req,res){
    res.render("index");
      });

app.get('/calender',function(req,res){
  //this will give events stored in  our mangoDB and pass it to the view
  CalenM.find({},function(err,data){
    if(err) throw err;
      res.render("calender",{datas: data});
  });

});
app.post("/calender",urlencodedParser,function(req,res){
  //get data from the view and store it to mango db
  var newEv= CalenM(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);


  });
  CalenM.find({},function(err,data){
    if(err) throw err;
      res.render("calender",{datas: data});
  });
});
};
