let add_btn = document.getElementById('add')
let form_div = document.getElementById('form')
let get_all = document.getElementById('getAll')
let search = document.getElementById('search')
let search_results = document.getElementById('search_results')
let cancel_btn = document.getElementById('cancel')
let delete_btn = document.getElementById('delete')
let iname = document.getElementById('name')
let search_ingredients = document.getElementById('search_ingredients')
let ingredients = document.getElementById('ingredients')
let duration = document.getElementById('duration')
let prepration = document.getElementById('preparation')
let submit = document.getElementById('submit')
let ingredients_results = document.getElementById('ingredients_results')

const qI = (name) => fetch(
    'http://192.168.123.103/v1/ingredient/'+name,
    {
        method:'POST',
        body:null,
        headers: {'Content-Type': 'application/json'}
    }
).then(res => res.json())
.catch(console.log);

const render = (is) => {
    is.forEach(i=>{
        let div = document.createElement('div')
        div.innerText = i.name
        div.classList.add('recipe')
        div.setAttribute('data-id',i._id)
        search_results.append(div)
    })
}
submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = {
        name:iname.value,
        ingredients:[...ingredients.childNodes].map(e=>{
            let i = e.innerText.split('');
            i.pop();
            return [i.join(''),e.firstElementChild.value]
        }),
        duration:duration.value,
        prepration:prepration.value
    }
    if(submit.dataset.id == 'add'){
        post(i).then(()=>{
            search_results.style.display = "grid"
        form_div.style.display = 'none'
        search_results.innerHTML=''
        get().then(render)
        }).catch(console.log)
    }else{
        put(delete_btn.dataset.id,i).then(()=>{
            search_results.style.display = "grid"
            form_div.style.display = 'none'
            search_results.innerHTML=''
            get().then(render)
        }).catch(console.log)
    }
})
add_btn.addEventListener('click',()=>{
    (form_div.style.display == 'none')?
    (form_div.style.display = 'flex',search_results.style.display = 'none'):
    (form_div.style.display = 'none',search_results.style.display = 'grid');
    delete_btn.dataset.id = ''
    submit.dataset.id = 'add'
    submit.innerText = 'añadir'
    iname.value = '' ;
    ingredients.innerHTML = '' ;
    search_ingredients.value = '';
    ingredients_results.innerHTML = '';
    duration.value = '' ;
    prepration.value = '' ;
})
cancel_btn.addEventListener('click',()=>{
    form_div.style.display = 'none'
    search_results.style.display = 'grid'
    delete_btn.dataset.id = ''
})
delete_btn.addEventListener('click',()=>{
    (delete_btn.dataset.id)?(
    search_results.style.display = 'grid',
    form_div.style.display = "none",
    search_results.innerHTML='',
    del(delete_btn.dataset.id).then((e)=>{
        get().then(render)
    }).catch(console.log)):null;
})
get_all.addEventListener('click',()=>{
    search_results.innerHTML=''
    delete_btn.dataset.id = ''
    form_div.style.display = "none"
    search_results.style.display = 'grid'
    get().then(render);
})
search.addEventListener('click',()=>{
    form_div.style.display = "none"
    search_results.style.display = 'grid'
})
search.addEventListener('input',({target:{value}})=>{
    (value.split('')[0] == ' ')?search.value = value.replace(' ',''):null;
    search_results.style.display = "grid"
    form_div.style.display = 'none'
    search_results.innerHTML=''
    if(value.length < 3 || value.trim().length < 2) return;
    q(value).then(render)
})
search_results.addEventListener('click',({target})=>{
    get(target.dataset.id).then(target=>{
        delete_btn.dataset.id = target._id
        submit.dataset.id = "edit"
        submit.innerText = 'guardar'
        form_div.style.display = 'flex'
        search_results.style.display = 'none'
        iname.value = target.name ;
        ingredients.innerHTML = ''
        target.ingredients.forEach(([i,value])=>{
            let li = document.createElement('li')
            li.innerText = i
            let input = document.createElement('input')
            input.type = 'number'
            input.value = value
            let btn = document.createElement('button')
            btn.innerText = 'x'
            btn.addEventListener('click',({target})=>{
                ingredients.removeChild(target.parentElement)
            })
            li.append(input)
            li.append(btn)
            input.placeholder='gr'
            ingredients.append(li)
        })
        duration.value = target.duration ;
        prepration.innerText = (target.prepration)?target.prepration:''; ;
    })
})
search_ingredients.addEventListener('input',({target:{value}})=>{
    ingredients_results.innerHTML=''
    if (value.trim().length < 3) return;
    qI(value).then(is=>is.map(({name})=>name)).then(is=>{
        is.forEach(i=>{
            let li = document.createElement('li')
            li.innerText=i
            li.addEventListener('click',({target:{tagName}})=>{
                (ingredients_results.contains(li)&&!ingredients.contains(li))?
                (()=>{
                    let input = document.createElement('input')
                    input.type = 'number'
                    let btn = document.createElement('button')
                    btn.innerText = 'x'
                    btn.addEventListener('click',({target})=>{
                        ingredients.removeChild(target.parentElement)
                    })
                    li.append(input)
                    li.append(btn)
                    input.placeholder='gr'
                    ingredients_results.removeChild(li)
                    ingredients.append(li)
                })():null;
            })
            ingredients_results.append(li)
        })
    }).catch(console.log)

})