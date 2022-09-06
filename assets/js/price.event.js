let add_btn = document.getElementById('add')
let form_div = document.getElementById('form')
let get_all = document.getElementById('getAll')
let search = document.getElementById('search')
let search_results = document.getElementById('search_results')
let cancel_btn = document.getElementById('cancel')
let delete_btn = document.getElementById('delete')
let iname = document.getElementById('name')
let price = document.getElementById('price')
let shop = document.getElementById('shop')
let unit = document.getElementById('unit')
let quantity = document.getElementById('quantity')
let submit = document.getElementById('submit')

const render = (ingredients) => {
    search_results.innerHTML = ''
    ingredients.forEach(i=>{
        let div = document.createElement('div')
        div.innerText = i.name
        div.classList.add('ingredient')
        div.setAttribute('data-id',i._id)
        search_results.append(div)
    })
}
submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = {
        name:iname.value,
        price: price.value,
        shop: shop.value,
        unit:unit.value,
        quantity:quantity.value
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
    price.value = '' ;
    shop.value = '' ;
    unit.value = '' ;
    quantity.value = '' ;
})
cancel_btn.addEventListener('click',()=>{
    form_div.style.display = 'none'
    search_results.style.display = 'grid'
    delete_btn.dataset.id = ''
})
delete_btn.addEventListener('click',()=>{
    (delete_btn.dataset.id)?
    (
        search_results.style.display = 'grid',
        form_div.style.display = "none",
        search_results.innerHTML='',
        del(delete_btn.dataset.id).then((e)=>{
            get().then(render)
        }).catch(console.log)
    ):null;
})
get_all.addEventListener('click',()=>{
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
        price.value = target.price ;
        shop.value = target.shop ;
        unit.value = target.unit ;
        quantity.value = target.quantity ;
    })
})