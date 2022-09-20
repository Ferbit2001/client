let iname = document.getElementById('name')

let recipes_for_b = document.getElementById('recipes_for_b')
let recipes_for_l = document.getElementById('recipes_for_l')
let recipes_for_d = document.getElementById('recipes_for_d')

let results_for_b = document.getElementById("results_for_b")
let results_for_l = document.getElementById("results_for_l")
let results_for_d = document.getElementById("results_for_d")

let b = document.getElementById('b')
let l = document.getElementById('l')
let d = document.getElementById('d')

this.url = "http://"+this.ip+"/v1/menu/"

const qI = (name) => fetch(
    'http://'+this.ip+'/v1/recipe/'+name,
    {
        method:'POST',
        body:null,
        headers: {'Content-Type': 'application/json'}
    }
).then(res => res.json())
.then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
.catch(console.log);

const getFoods = () => {
    return { 
        name:iname.value,
        breakfast: [...b.childNodes].map(e=>{
            return [e.outerText,e.children[0].value]
        }),
        lunch:[...b.childNodes].map(e=>{
            return [e.outerText,e.children[0].value]
        }),
        dinner:[...b.childNodes].map(e=>{
            return [e.outerText,e.children[0].value]
        })
    }
}

const setFoods = ({_id,name, breakfast, lunch, dinner},s='add',ss='añadir') => {
    delete_btn.dataset.id = _id
    submit.dataset.id = s
    submit.innerText = ss
    iname.value = name ;

    b.innerHTML = ''
    recipes_for_b.value = '';
    results_for_b.innerHTML = '';
    
    l.innerHTML = ''
    recipes_for_l.value = '';
    results_for_l.innerHTML = '';

    d.innerHTML = ''
    recipes_for_d.value = '';
    results_for_d.innerHTML = '';

    let convertir = (parent,[i,value]) => {
        let li = document.createElement('li')
            li.innerText = i
        let input = document.createElement('input')
            input.type = 'number'
            input.value = value
        let btn = document.createElement('button')
            btn.innerText = 'x'
            btn.addEventListener('click',({target})=>{
                parent.removeChild(target.parentElement)
            })
            li.append(input)
            li.append(btn)
            input.placeholder='cantidad'
            parent.append(li)
    }

    (breakfast.length>0)?(breakfast.forEach(e=>{
        convertir(b,e)
    })):null;
    (lunch.length>0)?(lunch.forEach(e=>{
        convertir(l,e)
    })):null;
    (dinner.length>0)?(dinner.forEach(e=>{
        convertir(d,e)
    })):null;
}

submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = getFoods();
    if(submit.dataset.id == 'add'){post(i)}else{put(delete_btn.dataset.id,i)}
})

add_btn.addEventListener('click',()=>{
    switchDisplay()
    setFoods({_id:'',name:'',breakfast:[],lunch:[],dinner:[]})
})

const addEventSearch = (searcher,result_ul,definitive_ul) => {
    searcher.addEventListener('input',({target:{value}})=>{
        result_ul.innerHTML=''
        if (value.trim().length < 3) return;
        qI(value).then(is=>is.map(({name})=>name)).then(is=>{
            is.forEach(i=>{
                let li = document.createElement('li')
                li.innerText=i
                li.addEventListener('click',()=>{
                    (result_ul.contains(li)&&!definitive_ul.contains(li))?
                    (()=>{
                        let input = document.createElement('input')
                        input.type = 'number'
                        let btn = document.createElement('button')
                        btn.innerText = 'x'
                        btn.addEventListener('click',({target})=>{
                            definitive_ul.removeChild(target.parentElement)
                        })
                        li.append(input)
                        li.append(btn)
                        input.placeholder='cantidad'
                        result_ul.removeChild(li)
                        definitive_ul.append(li)
                    })():null;
                })
                result_ul.append(li)
            })
        }).catch(console.log)
    
    })
}

addEventSearch(recipes_for_b,results_for_b,b)
addEventSearch(recipes_for_l,results_for_l,l)
addEventSearch(recipes_for_d,results_for_d,d)

search_results.addEventListener('click',({target})=>{
    get(target.dataset.id).then(i=>{
        switchDisplay();
        setFoods(i,'edit','guardar')
    })
})

let arrs = [['Desayuno',recipes_for_b],['Almuerzo',recipes_for_l],['Cena',recipes_for_d]]
arrs.forEach(e=>{
    let div = document.createElement('div')
    div.innerText = e[0]
    div.classList.add('center')
    div.style.padding = '7px'
    form_div.insertBefore(div,e[1])
})

let obj = {
    _id:"sa2d189regd3s35g4",
    name:"Lunes",
    breakfast:[['cangrejo a la brasa',1],['bocata',1]],
    lunch:[['cangrejo',1],['locura',1]],
    dinner:[['nada',1],['picha',1]]
}



