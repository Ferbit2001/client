let iname = document.getElementById('name')
let _search_ingredients = document.getElementById('search_ingredients')
let _ingredients = document.getElementById('ingredients')
let _duration = document.getElementById('duration')
let _prepration = document.getElementById('preparation')
let _ingredients_results = document.getElementById('ingredients_results')
let _price = document.createElement('div')
_price.id = '_price'
form_div.insertBefore(_price,submit)

this.url = "http://"+this.ip+"/v1/recipe/"

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

const qP = (name) => fetch(
    'http://'+this.ip+'/v1/price/'+name,
    {
        method:'POST',
        body:null,
        headers: {'Content-Type': 'application/json'}
    }
).then(res => res.json())
.then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
.catch(console.log);

const getPrices = async({ingredients}) => {
    return await Promise.all(ingredients.map(([nombre,cantidad])=>{
        return qP(nombre).then(e=>e.sort((b,a)=>a.price/a.quantity - b.price/b.quantity)).then(a=>a[0]).then(a=>a.price/a.quantity).then(e=>Number(cantidad)*e)
    })).then(e=>e.reduce((a,b)=>a+b,0))
}

const get_Recipes = async() => {
    let ac = { name:iname.value, ingredients: [..._ingredients.childNodes].map(e=>{ let i = e.innerText.split('');  i.pop(); return [i.join(''),e.firstElementChild.value] }), duration: _duration.value, prepration: _prepration.value}
    ac.price = await getPrices(ac)
    return ac
}
const set_Recipes = ({_id,name, ingredients, duration, prepration, price},s='add',ss='añadir') => {
    delete_btn.dataset.id = _id
    submit.dataset.id = s
    submit.innerText = ss
    iname.value = name ;
    _ingredients.innerHTML = ''
    _search_ingredients.value = '';
    _ingredients_results.innerHTML = '';
    _price.innerText = 'Precio total: '+price || 'Precio no seteado';
    _duration.value = duration ;
    _prepration.innerText = (prepration) ? prepration : '';
    if(ingredients.length<0) return ;
    ingredients.forEach(([i,value])=>{
            let li = document.createElement('li')
            li.innerText = i
            let input = document.createElement('input')
            input.type = 'number'
            input.value = value
            let btn = document.createElement('button')
            btn.innerText = 'x'
            btn.addEventListener('click',({target})=>{
                _ingredients.removeChild(target.parentElement)
            })
            li.append(input)
            li.append(btn)
            input.placeholder='gr'
            _ingredients.append(li)
        })
}

submit.addEventListener('click',async ()=>{
    if(iname.value.trim().length<1) return;
    let i = await get_Recipes()
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
    set_Recipes({_id:'',name:'', ingredients:[], duration:'', prepration:'',price:''})
})
search_results.addEventListener('click',({target})=>{
    get(target.dataset.id).then(r=>{
        set_Recipes(r,'edit','guardar')
        switchDisplay()
    })
})
search_ingredients.addEventListener('input',({target:{value}})=>{
    _ingredients_results.innerHTML=''
    if (value.trim().length < 3) return;
    qI(value).then(is=>is.map(({name})=>name)).then(is=>{
        is.forEach(i=>{
            let li = document.createElement('li')
            li.innerText=i
            li.addEventListener('click',()=>{
                (_ingredients_results.contains(li)&&!_ingredients.contains(li))?
                (()=>{
                    let input = document.createElement('input')
                    input.type = 'number'
                    let btn = document.createElement('button')
                    btn.innerText = 'x'
                    btn.addEventListener('click',({target})=>{
                        _ingredients.removeChild(target.parentElement)
                    })
                    li.append(input)
                    li.append(btn)
                    input.placeholder='gr'
                    _ingredients_results.removeChild(li)
                    _ingredients.append(li)
                })():null;
            })
            _ingredients_results.append(li)
        })
    }).catch(console.log)

})