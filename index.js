const express = require('express')
const app = express()
const cors = require('cors')

app.set('view engine','pug')
app.use(cors())

app.get('/',(req,res)=>res.redirect('/ingredientes'))
app.get('/css/:id',(req,res)=>{res.sendFile(__dirname+'/assets/css/'+req.params.id)})
app.get('/js/:id',(req,res)=>{res.sendFile(__dirname+'/assets/js/'+req.params.id)})

app.get('/Ingredientes',(req,res)=>res.render('ingredient', { name: 'ingredientes' }))
app.get('/Precios',(req,res)=>res.render('price', { name: 'precios' }))
app.get('/Recetas',(req,res)=>res.render('recipe', { name: 'recetas' }))

app.listen(8000,()=>console.log('client server on'))