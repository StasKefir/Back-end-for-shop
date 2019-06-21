const express = require('express');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const httpServer = http.createServer(app);

httpServer.listen(8080, function (data) {
        console.log(data);
        console.log('Express server listening on port 8080');
    }
);

app.get('/categories', function (req, res) {
    try {
        fs.readFile('categories.json', (err, data) => {
            if (err) throw err;
            const json = JSON.parse(data);
            console.log(json);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json));
        });
    } catch (e) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send({'error': 'error#1 something went wrong ' + e});
    }
});

app.get('/goods', function (req, res) {
    try {
        fs.readFile('goods.json', (err, data) => {
            if (err) throw err;
            const json = JSON.parse(data);
            
            let result=[];
            var categoryId = parseInt(req.query.categoryId);
            for(let i=0; i<json.length; i++){
                if(categoryId === json[i].categoryId){
                   result.push(json[i]);
                }
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        });
    } catch (e) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send({'error': 'error#1 something went wrong ' + e});
    }
});

app.get('/cart', function (req, res) {
    try {
        fs.readFile('goods.json', (err, data) => {
            if (err) throw err;
            const goods = JSON.parse(data);
            
            let order = [],
            total =0;
            console.log("result"+JSON.stringify(req.query.cart));
            var cart = JSON.parse(req.query.cart);
            for(let i=0; i<cart.length; i++){
                for(let j=0; j<goods.length; j++){
                    if(cart[i].id === goods[j].id) {
                       let sum = cart[i].qty * goods[j].price;
                       order.push({
                           "id": cart[i].id,
                           "qty" : cart[i].qty,
                           "title" : goods[j].title,
                           "price": goods[j].price,
                           "sum" : sum
                       }); 
                       total += sum;
                    }
                }
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({"order": order, "total" :total}));
        });
    } catch (e) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send({'error': 'error#1 something went wrong ' + e});
    }
});
