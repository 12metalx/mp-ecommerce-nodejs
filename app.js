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
app.post('/checkout',function(req,res){
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-8760918236611169-073004-929293cff3b240708b68e9a9483a9d55-152109012'
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
mercadopago.preferences.create(preference).then(function(response){
    console.log(global.init_point);
    console.log(response);  
    global.init_point = response.body.init_point; 
    console.log(global.init_point);
}).catch(function(error){
    console.log(error);
});

});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT);