let iname = document.getElementById('name')
let sname = document.getElementById('sname')
let pname = document.getElementById('pname')
let sresults = document.getElementById('sresults')
let _price = document.getElementById('price')
let _shop = document.getElementById('shop')
let _unit = document.getElementById('unit')
let _quantity = document.getElementById('quantity')

this.url = "http://"+this.ip+"/v1/price/"

const qI = (name) => fetch(
    'http://'+this.ip+'/v1/ingredient/'+name,
    {
        method:'POST',
        body:null,
        headers: {'Content-Type': 'application/json'}
    }
).then(res => res.json())
.then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
.catch(console.log);

const get_Prices = () => {
    return {    name: iname.innerText, pname:pname.value, price: _price.value, shop: _shop.value, unit: _unit.value, quantity: _quantity.value    }
}
const set_Prices = ({_id='',name = '',pname ='', price = '', shop = '', unit = '', quantity = ''},s='add',ss='añadir') => {
    iname.innerText = name;
    sname.value = '';
    pname.value = pname;
    sresults.innerHTML = '';
    _price.value = price;
    _shop.value = shop;
    _unit.value = unit;
    _quantity.value = quantity;
    delete_btn.dataset.id = _id;
    submit.dataset.id = s;
    submit.innerText = ss;
}

submit.addEventListener('click',()=>{
    if(iname.innerText.length<1||pname.value.length<1) return;
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

iname.addEventListener('click',()=>{iname.innerText = ''})

sname.addEventListener('input',({target:{value}})=>{
    sresults.innerHTML=''
    if (value.trim().length < 3) return;
    qI(value).then(is=>is.map(({name})=>name)).then(is=>{
        sresults.innerHTML = ''
        is.forEach(i=>{
            let li = document.createElement('li')
            li.innerText=i
            li.addEventListener('click',()=>{
                (sresults.contains(li))?
                (iname.innerText = i,sresults.innerHTML=''):null;
            })
            sresults.append(li)
        })
    }).catch(console.log)

})