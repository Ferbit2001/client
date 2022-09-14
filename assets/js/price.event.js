let iname = document.getElementById('name')
let _price = document.getElementById('price')
let _shop = document.getElementById('shop')
let _unit = document.getElementById('unit')
let _quantity = document.getElementById('quantity')

this.url = "http://"+this.ip+"/v1/ingredient/"

let arr = [
    ["div",'Cancel'],
    ["div",'Delete'],
    ["input",'name',"text","Nombre de Ingrediente"],
    ["input",'carbs',"number","Carbohidratos"],
    ["input",'protein',"number","Proteinas"],
    ["input",'fat',"number","Grasas"],
    ["input",'calories',"number","Calorias"],
    ['div',"submit",'add']
]

const get_Prices = () => {
    return {    name: iname.value, price: _price.value, shop: _shop.value, unit: _unit.value, quantity: _quantity.value    }
}
const set_Prices = ({_id='',name = '', price = '', shop = '', unit = '', quantity = ''},s='add',ss='añadir') => {
    iname.value = name;
    _price.value = price;
    _shop.value = shop;
    _unit.value = unit;
    _quantity.value = quantity;
    delete_btn.dataset.id = _id;
    submit.dataset.id = s;
    submit.innerText = ss;
}

submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = get_Prices()
    if(submit.dataset.id == 'add'){
        post(i).then(()=>{
            switchDisplay()
            get().then(render)
        }).catch(console.log)
    }else{
        put(delete_btn.dataset.id,i).then(()=>{
            switchDisplay()
            get().then(render)
        }).catch(console.log)
    }
})
add_btn.addEventListener('click',()=>{
    switchDisplay()
    set_Prices()
})
search_results.addEventListener('click',({target})=>{
    get(target.dataset.id).then(p=>{
        set_Prices(p,'edit','guardar')
        switchDisplay()
    })
})