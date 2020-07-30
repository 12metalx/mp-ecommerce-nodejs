var express = require('express');
var exphbs  = require('express-handlebars');
const { response } = require('express');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
app.get('/checkout',function(req,res){
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'PROD_ACCESS_TOKEN'
});
let preference = {
    items:[
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        }
    ]
};
mercadopago.preference.create(preference).then(function(res){
    global.init_point = res.body.init_point;
}).catch(function(error){
    console.log(error);
});
res.render('home');
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT);