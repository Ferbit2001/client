let iname = document.getElementById('name')
let _carbs = document.getElementById('carbs')
let _protein = document.getElementById('protein')
let _fat = document.getElementById('fat')
let _calories = document.getElementById('calories')

this.url = "http://"+this.ip+"/v1/ingredient/"

const get_Ingredients = () => {
    return {    name: iname.value, carbs: _carbs.value, protein: _protein.value, fat: _fat.value, calories: _calories.value    }
}
const set_Ingredients = ({_id='',name='',carbs='',protein='',fat='',calories=''},s='add',ss='añadir') => {
    iname.value = name;
    _carbs.value =carbs;
    _protein.value = protein;
    _fat.value = fat;
    _calories.value = calories;
    delete_btn.dataset.id = _id;
    submit.dataset.id = s;
    submit.innerText = ss;
}
submit.addEventListener('click',()=>{
    if(iname.value.trim().length<1) return;
    let i = get_Ingredients();
    if(submit.dataset.id == 'add'){post(i)}else{put(delete_btn.dataset.id,i)}
})
add_btn.addEventListener('click',()=>{
    switchDisplay()
    set_Ingredients()
})
search_results.addEventListener('click',({target})=>{
    get(target.dataset.id).then(i=>{
        switchDisplay();
        set_Ingredients(i,'edit','guardar')
    })
})