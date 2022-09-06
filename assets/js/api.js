document.getElementById('nav').addEventListener('click',({target:{innerText}})=>(!/\n/g.test(innerText)?window.location.href=window.location.origin+'/'+innerText:null))
const api = () => {
    return fetch(
        this.url+this.id,
        {
            method:this.method,
            body:this.body,
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(e=>{return(e.length<2)?e:e.sort((a, b) => a.name.localeCompare(b.name))})
        .catch(console.log);
}

const get = (id = '') => {
    this.id=id;
    this.method='GET';
    this.body=null;
    return api()
}

const post = (body = null) => {
    if(body == null) return;
    this.id='';
    this.method='POST';
    this.body=JSON.stringify(body);
    return api()
}

const q = (name = '') => {
    this.id=name;
    this.method='POST';
    this.body=null;
    return api()
}

const del = (id) => {
    if(!id) return;
    this.id=id;
    this.method='DELETE';
    this.body=null;
    return api()
}

const put = async (id,body) => {
    if(!id||!body) return;
    this.id=id;
    this.method='PUT';
    this.body=JSON.stringify(body);
    return api()
}