
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123asd'));
var session = driver.session()

app.get('/', function (req, res){
    session
      .run('MATCH(n: Footwear) RETURN(n) LIMIT 10')
      .then(function(result){
        var footwearArr = [];
        result.records.forEach(function(record){
            footwearArr.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name
            });
          });
    
    session
          .run('MATCH(n:Acessories) RETURN(n) LIMIT 10')
          .then(function(result2){
              var acessoriesArr = [];
              result2.records.forEach(function(record){
                  acessoriesArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name
                });
              });

    session
          .run('MATCH(n:Hats) RETURN(n) LIMIT 10')
          .then(function(result3){
              var hatsArr = [];
              result3.records.forEach(function(record){
                  hatsArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name
                });
              });
            })       

          res.render('index', {
              footwear: footwearArr,
              acessories: acessoriesArr,
              hats: hatsArr,
            //   heavyOuterwear: heavyOuterwearArr,
            //   lightOuterwear: lightOuterwearArr
            });
        })
        .catch(function(err){
            console.log(err);
      });
    })
      .catch(function(err){
            console.log(err)
      });
    });

app.listen(3000);
console.log('server started on port 3000');

module.exports = app;

//             .catch(function(err){
//                 console.log(err);
//             });
//     session
//         .run('MATCH(n:Heavy_Outerwear) RETURN(n) LIMIT 10')
//         .then(function(result4){
//             var heavyOuterwearArr = [];
//             result4.records.forEach(function(record){
//                 heavyOuterwearArr.push({
//                         id: record._fields[0].identity.low,
//                         name: record._fields[0].properties.name
//                     });
//                   });
//                 })
//         .catch(function(err){
//             console.log(err);
//         });
//     session
//         .run('MATCH(n:Light_Outerwear) RETURN(n) LIMIT 10')
//         .then(function(result5){
//             var lightOuterwearArr = [];
//             result5.records.forEach(function(record){
//                 lightOuterwearArr.push({
//                     id: record._fields[0].identity.low,
//                     name: record._fields[0].properties.name
//             });
//         });
    