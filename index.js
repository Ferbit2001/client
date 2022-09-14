const express = require('express')
const app = express()
const cors = require('cors')

let [,,miip,port] = process.argv;
if(!miip || !port) process.exit();
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
    ['input','name','text','Nombre'],
    ['input','price','number','Precio'],
    ['input','shop','number','Tienda'],
    ['input','unit','text','Unidad, ej:Botella'],
    ['input','quantity','number','Cantidad en gr']
]`}))
app.get('/Recetas',(req,res)=>res.render('index', { name: 'recetas', event: 'recipe',ip:miip, url: `${miip}:${port}`, arr:`[
    ['input','name','text','Nombre de Receta'],
    ['input','search_ingredients','search','ingrediente'],
    ['ul','ingredients_results'],
    ['ul','ingredients'],
    ['input','duration','number','duración en minutos'],
    ['textarea','preparation',undefined,'preparacion']
]`}))

app.listen(port,miip,()=>console.log('client server connected on: '+miip+':'+port))