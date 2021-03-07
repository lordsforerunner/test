const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const ejs = require("ejs");

const cookieSession = require('cookie-session');



const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(cookieSession({
   name: 'lordsforerunner',
   secret: "0b5ad47cc163d10dda665ac7f28508e00150dd9aed"
}));

var mainConditions = [];
var otherConditions = [];
var results = [];
var mainCauses = [];
var otherCauses = [];
var recommendations = [];
var age;
var gender;
var mainsymptom;
var othersymptoms;
var possibilitiesAlt = "";
// security

const fs = require('fs');
const cert = fs.readFileSync('/opt/bitnami/apache/conf/lordsforerunner.net.crt');
//const ca = fs.readFileSync('/opt/bitnami/apache/conf/lordsforerunner.net.crt');
const key = fs.readFileSync('/opt/bitnami/apache/conf/lordsforerunner.net.key');




mongoose.connect("mongodb://localhost:27017/eurekaDB", { useNewUrlParser: true, useUnifiedTopology: true });



const diagSchema =  new mongoose.Schema({
 
 systontainer: String,
 age: String,
 gender: String,
 symptom: String,
 causes: [String]

});

const Diag = mongoose.model("Diag", diagSchema);


var  thisComplaint
 = new Diag ({
 systontainer: "Orthopontainer",
 age: "ea",
 gender: "m",
 symptom:"MusclePain" ,
 causes: []
});

//thisComplaint.save();


const actSchema = new mongoose.Schema({
systaction: String,
age: String,
gender: String,
impression: String,
plan: String
});

const Act = mongoose.model("Act", actSchema);

var thisAction = new Act ({
   systaction: "Orthopaction",
   age: "ea",
   gender: "m",
   impression:'Polymyalgia Rheumatica' ,
   plan: "Go to the hospital"
});

//thisAction.save();


   // Diag.insertMany([thisComplaint], function(err) {
   //  if (err) {
   //   console.log(err)
   //  } else console.log("Successfully saved document in eurekaDB")
   // });

   //   Act.deleteOne({_id : "60153b22500f6f13b0062fc4"
   //  }, function(err){
   //   if(err){
   //    console.log(err)
   //   }else console.log("Item successfully deleted")
   //  });


   //   Diag.deleteOne({
   //   systontainer: "Orthopontainer",
   //   age: "ea",
   //   gender: "m",
   //   symptom:"MusclePain" ,

   //  }, function(err){
   //   if(err){
   //    console.log(err)
   //   }else console.log("Item successfully deleted")
   //  });


 //  Act.findOne({
 // diagnosis : "Hypoglycemia(low blood sugar)"
 // },
 // function(err, imHypoglycemia){
 //  if(err){console.log(err)}else {console.log(imHypoglycemia.action)}
 // });

 
// app.get("/", function(req, res) {
//  res.sendFile(__dirname + "/index.html"); 
// });




//  Diag.findOne({
//  systontainer: "Orthopontainer",
//  age: "i",
//  gender: "m",
//  symptom:"OrthoSkinRash" ,
//  causes: ['Systemic Lupus Erythematosus(Autoimmune Disease)', 'Psoriasis', 'Rheumatic Fever',],
//     "RsoreThroat": ['Viral Infection', 'Bacterial Infection', 'Allergies', 'Dry Air', 'Throat Irritation', 'Voice Overuse(throat muscle strain)',  'Systemic Lupus Erythematosus(Autoimmune Disease)', 'Rheumatic Fever', ]
//  },
//  function(err, foundDoc){
//   if(err){console.log(err)}
//   if(foundDoc) {console.log("Document saved already")}
//   else{

//   var  thisComplaint
//  = new Diag ({
//  systontainer: "Orthopontainer",
//  age: "i",
//  gender: "m",
//  symptom:"OrthoSkinRash" ,
//  causes: ['Systemic Lupus Erythematosus(Autoimmune Disease)', 'Psoriasis', 'Rheumatic Fever',],
//     "RsoreThroat": ['Viral Infection', 'Bacterial Infection', 'Allergies', 'Dry Air', 'Throat Irritation', 'Voice Overuse(throat muscle strain)',  'Systemic Lupus Erythematosus(Autoimmune Disease)', 'Rheumatic Fever', ]
// });
// thisComplaint.save();
// console.log("New document entered");
//   }
  
//  });


app.use(function(req, res, next){
   //return res.json([req.url]);
   if(req.url == "/"){
      next();
   }
   else if(req.url == "/favicon.ico"){
      next();
   }
   else if(req.session && req.session.home){
      next();
   }
   else{
      return res.redirect("/");
   }
});



app.get("/", function(req, res){

   res.render("home");
});



app.get("/about", function(req, res){

   res.render("about");
});
app.get("/contact", function(req, res){

   res.render("contact");
});
app.get("/terms-of-use", function(req, res){

   res.render("terms-of-use");
});

app.get("/intropreventive", function(req, res){
   const pageid = req.body.button;
  
   res.render("intropreventive", {Pageid: pageid});
});

app.get("/bone_preventive", function(req, res){
   res.render("bone_preventive");
});


app.get("/bone_biodata", function(req, res){
   res.render("bone_biodata");
});


app.get("/bone_maincomplaint", function(req, res){
   mainCauses = [];
   mainConditions = [];
   //console.log("No problem with maincomplaint");
  //console.log(age);
  //console.log(gender);
  
   res.render("bone_maincomplaint");
    
});


app.get("/bone_othercomplaints", function(req, res){
   otherCauses = [];
   otherConditions = [];

  
   // console.log(mainCauses);
   //  console.log(age);
   //  console.log(gender);
   //console.log(mainConditions);
  //console.log("No problem with othercomplaints");
   res.render("bone_othercomplaints",{Mainsymptom: mainsymptom}) ;

});

app.get("/bone_diagnosis", function(req, res) {
   possibilitiesAlt = "";
   results = [];
   if(otherConditions.length == 0){
    mainConditions.forEach(function(maincondition){
       results.push(maincondition);
    })
   }else {
      mainConditions.forEach(function(maincondition){
      p = otherConditions.includes(maincondition);
      if(p == true && results.includes(maincondition) == false){
         results.push(maincondition);
      }   
   });

   }
   
   mainConditions = [];
    otherConditions = [];
    otherCauses = [];
    mainCauses = [];
    recommendations = [];
    
     if(results.length == 0){possibilitiesAlt = 'There appear to be no return for your input, please contact us with your complaint(s) stating your age and gender, so we can accommodate them in the future and do any other deened necessary.'}
     
   res.render("bone_diagnosis", {Results: results, PossibilitiesAlt: possibilitiesAlt });
});

app.get("/bone_advice", function(req, res) {
  //console.log(recommendations);
  results = [];

   res.render("bone_advice", {Recommendations: recommendations});
});

app.post("/bone_biodata", function(req, res) {
const docObj = req.body;

  age = req.body.age;
  gender = req.body.gender;

//console.log("No problem with home post");

  res.redirect("/bone_maincomplaint");
   
});

app.post("/bone_maincomplaint", function(req, res){
 mainsymptom = req.body.mainsymptom;
 Diag.findOne({
      age: age,
      gender: gender,
      symptom: mainsymptom
   }, function(err, foundDoc) {
      if (err) {console.log(err)}
     else {mainCauses.push(foundDoc.causes)}

     mainCauses.forEach(function(maincause){
      maincause.forEach(function(i){
        mainConditions.push(i); 
      });
   });
     
    res.redirect("/bone_othercomplaints");
    });
 });


app.post("/bone_othercomplaints", function(req, res){
   othersymptoms = req.body.othersymptoms;
   if(otherConditions.length == 0 && req.body.trying == "no"){
       res.redirect("/bone_diagnosis");
   }else{

      if(req.body.othersymptoms) {
    
     
     if(othersymptoms instanceof Array) {
        othersymptoms.forEach(function(othersymptom) {
       
      Diag.findOne({
      age: age,
      gender: gender,
      symptom: othersymptom
   }, function(err, foundDoc) {
      if (err) {console.log(err)}  
     else {otherCauses.push(foundDoc.causes)} 
     if(otherCauses.length === othersymptoms.length){
        otherCauses.forEach(function(othercause){
           othercause.forEach(function(j){
            otherConditions.push(j);
           });
        });
       res.redirect("/bone_diagnosis")
     }       
   });     
     });
    } else {      
      Diag.findOne({   
      age: age,
      gender: gender,
      symptom: othersymptoms
   }, function(err, foundDoc) {
      if (err) {console.log(err)}
     else {otherCauses.push(foundDoc.causes)}
     otherCauses.forEach(function(othercause){
           othercause.forEach(function(j){
            otherConditions.push(j);
           });
        });       
     res.redirect("/bone_diagnosis");
   });
    }
   }else {res.render("bone_othercomplaints", {Mainsymptom: mainsymptom})}
   }

   
});


 app.post("/bone_diagnosis", function(req, res){
    if(results.length == 0){ res.redirect("/");}
   else{
      var foundDocuments = [];
       results.forEach(function(result){  
      Act.findOne({
        age: age,
        gender: gender,
        impression: result 
      }, function(err, foundDoc){
         if(err){console.log(err)}        
        else{foundDocuments.push(foundDoc)}      
        b = recommendations.includes(foundDoc.plan);
          if(b == false)
          {recommendations.push(foundDoc.plan)}
       if (foundDocuments.length === results.length){
          
          res.redirect("/bone_advice");
       }
      });     
    });
   }
    
 });
 app.post("/bone_advice", function(req, res){
    recommendations = [];
    

  
 });


 
 app.post("/intropreventive", function(req, res){
   const pageid = req.body.button;
    res.render("intropreventive", {Pageid: pageid});
   //res.redirect("/bone_preventive");
    
 });

 app.post("/bone_preventive", function(req, res){
   
    res.render("bone_preventive");
   ;
    
 });

 
 


app.listen(3000, function() {
console.log("Server is running on port 3000")
});