let add_btn = document.getElementById('add')
let form_div = document.getElementById('form')
let get_all = document.getElementById('getAll')
let search = document.getElementById('search')
let search_results = document.getElementById('search_results')
let cancel_btn = document.getElementById('cancel')
let delete_btn = document.getElementById('delete')
let iname = document.getElementById('name')
let carbs = document.getElementById('carbs')
let protein = document.getElementById('protein')
let fat = document.getElementById('fat')
let calories = document.getElementById('calories')
let grams_per_unit = document.getElementById('grams_per_unit')
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
        carbs: carbs.value,
        protein: protein.value,
        fat:fat.value,
        calories:calories.value,
        grams_per_unit:grams_per_unit.value
    }
    if(submit.dataset.id == 'add'){post(i)}else{put(delete_btn.dataset.id,i)}
})
add_btn.addEventListener('click',()=>{
    (form_div.style.display == 'none')?
    (form_div.style.display = 'flex',search_results.style.display = 'none'):
    (form_div.style.display = 'none',search_results.style.display = 'grid');
    delete_btn.dataset.id = ''
    submit.dataset.id = 'add'
    submit.innerText = 'añadir'
    iname.value = '' ;
    carbs.value = '' ;
    protein.value = '' ;
    fat.value = '' ;
    calories.value = '' ;
    grams_per_unit.value = '' ;
})
cancel_btn.addEventListener('click',()=>{
    form_div.style.display = 'none'
    search_results.style.display = 'grid'
    delete_btn.dataset.id = ''
})
delete_btn.addEventListener('click',()=>{
    del(delete_btn.dataset.id).then(console.log)
    search_results.style.display = 'grid'
    form_div.style.display = "none"
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
        carbs.value = target.carbs ;
        protein.value = target.protein ;
        fat.value = target.fat ;
        calories.value = target.calories ;
        grams_per_unit.value = target.grams_per_unit ;
    })
})