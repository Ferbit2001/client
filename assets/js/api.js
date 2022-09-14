document.getElementById('nav').addEventListener('click',({target:{innerText}})=>(!/\n/g.test(innerText)?window.location.href=window.location.origin+'/'+innerText:null))
const api = () => fetch(
    this.url+this.id,
    {
        method:this.method,
        body:this.body,
        headers: {  'Content-Type': 'application/json'  }
    }
).then(res => res.json()).catch(console.log);
const get = (id = '') => {
    this.id=id; this.method='GET'; this.body=null;
    return api()
}
const post = (body = null) => {
    if(body == null) return; this.id=''; this.method='POST'; this.body=JSON.stringify(body);
    return api()
}
const q = (name = '') => {
    this.id=name; this.method='POST'; this.body=null;
    return api().then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
}
const del = (id) => {
    if(!id) return; this.id=id; this.method='DELETE'; this.body=null;
    return api()
}
const put = async (id,body) => {
    if(!id||!body) return; this.id=id; this.method='PUT'; this.body=JSON.stringify(body);
    return api()
}

let form_div = document.getElementById('form')
let delete_btn = document.createElement('div')
delete_btn.id = 'delete'
delete_btn.innerText = 'Borrar'
let cancel_btn = document.createElement('div')
cancel_btn.id = 'cancel'
cancel_btn.innerText = '+'
form_div.append(delete_btn)
form_div.append(cancel_btn)
this.arr.forEach(([type,id,t,placeholder])=>{
    let d = document.createElement(type)
    d.id = id
    if(t) d.type = t;
    if(placeholder) d.placeholder = placeholder;
    form_div.append(d)
})
let submit = document.createElement('div')
submit.innerText = 'aceptar'
submit.id = 'submit'
submit.setAttribute('data-id','add')
form_div.append(submit)

let add_btn = document.getElementById('add')
let get_all = document.getElementById('getAll')
let search = document.getElementById('search')
let search_results = document.getElementById('search_results')

const switchDisplay = () => (form_div.style.display == 'flex')?
(form_div.style.display = 'none',search_results.style.display = 'grid')
:(form_div.style.display = 'flex',search_results.style.display = 'none');

let render = (ingredients) => {
    search_results.innerHTML = ''
    ingredients.forEach(i=>{
        let div = document.createElement('div')
        div.innerText = i.name
        div.classList.add('ingredient')
        div.setAttribute('data-id',i._id)
        search_results.append(div)
    })
}

cancel_btn.addEventListener('click',()=>{
    switchDisplay()
    delete_btn.dataset.id = ''
})
delete_btn.addEventListener('click',()=>{
    (delete_btn.dataset.id)?
    (
        switchDisplay(),
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