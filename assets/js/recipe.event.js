let iname = document.getElementById('name')
let _search_ingredients = document.getElementById('search_ingredients')
let _ingredients = document.getElementById('ingredients')
let _duration = document.getElementById('duration')
let _prepration = document.getElementById('preparation')
let _ingredients_results = document.getElementById('ingredients_results')

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

const qI = (name) => fetch(
    'http://192.168.123.103/v1/ingredient/'+name,
    {
        method:'POST',
        body:null,
        headers: {'Content-Type': 'application/json'}
    }
).then(res => res.json())
.then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
.catch(console.log);

const get_Recipes = () => {
    return { name:iname.value, ingredients: [..._ingredients.childNodes].map(e=>{ let i = e.innerText.split('');  i.pop(); return [i.join(''),e.firstElementChild.value] }), duration: _duration.value, prepration: _prepration.value }
}
const set_Recipes = ({_id='',name = '', ingredients = [], duration = 0, prepration = ''},s='add',ss='añadir') => {
    delete_btn.dataset.id = _id
    submit.dataset.id = s
    submit.innerText = ss
    iname.value = name ;
    _ingredients.innerHTML = ''
    _search_ingredients.value = '';
    _ingredients_results.innerHTML = '';
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

submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = get_Recipes()
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
    set_Recipes()
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