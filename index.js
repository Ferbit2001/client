const express = require('express')
const app = express()
const cors = require('cors')

let [,,miip,port] = process.argv;
if(!(miip && port)) process.exit();
app.set('view engine','pug')
app.use(cors())

app.get('/',(req,res)=>res.redirect('/ingredientes'))
app.get('/css/:id',(req,res)=>{res.sendFile(__dirname+'/assets/css/'+req.params.id)})
app.get('/js/:id',(req,res)=>{res.sendFile(__dirname+'/assets/js/'+req.params.id)})

app.get('/Ingredientes',(req,res)=>res.render('index', { name: 'ingredientes', event: 'ingredient',ip:miip, url: `${miip}:${port}`,arr:`[
    ['input','name','text','Nombre de Ingrediente'],
    ['input','carbs','number','Carbohidratos'],
    ['input','protein','number','Proteinas'],
    ['input','fat','number','Grasas'],
    ['input','calories','number','Calorias']
]`}))
app.get('/Precios',(req,res)=>res.render('index', { name: 'precios', event: 'price',ip:miip, url: `${miip}:${port}`, arr:`[
    ['input','sname','text','Nombre de ingrediente'],
    ['ul','sresults'],
    ['div','name'],
    ['input','pname','text','Nombre del Precio'],
    ['input','price','number','Precio'],
    ['input','shop','text','Tienda'],
    ['input','unit','text','Unidad, ej:Botella'],
    ['input','quantity','number','Cantidad en gr']
]`}))
app.get('/Recetas',(req,res)=>res.render('index', { name: 'recetas', event: 'recipe',ip:miip, url: `${miip}:${port}`, arr:`[
    ['input','name','text','Nombre de Receta'],
    ['input','duration','number','duración en minutos'],
    ['input','search_ingredients','search','ingrediente'],
    ['ul','ingredients_results'],
    ['ul','ingredients'],
    ['textarea','preparation',undefined,'preparacion']
]`}))
app.get('/Menu',(req,res)=>res.render('index', { name: 'Menu', event: 'menu',ip:miip, url: `${miip}:${port}`, arr:`[
    ['input','name','text','Nombre del Menu'],
    ['input','recipes_for_b','search','Plato/s del Desayuno...'],
    ['ul','results_for_b'],
    ['ul','b'],
    ['input','recipes_for_l','search','Plato/s del Almuerzo...'],
    ['ul','results_for_l'],
    ['ul','l'],
    ['input','recipes_for_d','search','Plato/s de la Cena...'],
    ['ul','results_for_d'],
    ['ul','d']
]`}))

app.listen(port,miip,()=>console.log('client server connected on: '+miip+':'+port))