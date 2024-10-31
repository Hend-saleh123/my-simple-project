let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');

let mood = 'create';
let tem = 0 ;
let searchmood = 'title'

// gettotal
function getTotal(){
    if(price.value !== ""){
        let sum = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = sum;
        total.style.background = '#040'
    }else{ 
        total.innerHTML = '';
        total.style.background = 'red'
        
    }
}
    
// createlement
let datapro =[];

if(localStorage.data != null){
   datapro = JSON.parse(localStorage.data)
}

create.onclick = function(){
  if (!title.value || !price.value || !category.value) {
    alert('Please fill in all required fields (Title, Price, and Count)');
    return; 
  }
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  }
  if(mood === 'create'){
    if(newpro.count > 1){
        for(let y = 0 ; y < newpro.count ; y++){
        datapro.push(newpro)  
        }
    }else{
        datapro.push(newpro) 
    }
  }else{
       datapro[tem] = newpro
       mood = 'create'
       create.innerHTML= 'Create'
       count.style.display = 'block'
  }
 
   localStorage.setItem('data' , JSON.stringify(datapro))
   
   cleareData()
   readData()
 

}

// clearedata
function cleareData(){
    title.value =' ',
    price.value ='',
    taxes.value ='',
    ads.value ='',
    count.value = '',
    discount.value ='',
    title.value ='',
    total.innerHTML = '',
    category.value = ''
    
}

// readdata
function readData(){

    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
     table += `
        <tr>
            <td>${[i]}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].category}</td>
            <td><button class="button" onclick = "updatedata(${i})" >update</button></td>
            <td><button class="button" onclick ="deletedata(${i})">delete</button></td>
        </tr>`
     
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteall = document.getElementById('deleteall')
    if(datapro.length > 0 ){
      btndeleteall.innerHTML = `
      <button class="button" onclick="deleteall()" >
       Delete All (${datapro.length})
      </button>
      `
    }else{
      btndeleteall.innerHTML=""
    }
    getTotal()   

}
readData()

// deletelement
function deletedata(i){
   datapro.splice(i,1);
   localStorage.data = JSON.stringify(datapro)
   readData()
}

// deleteall
function deleteall(){
    localStorage.clear()
    datapro.splice(0);
   readData()

}

// updatedata
function updatedata(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display ='none';
  create.innerHTML = 'Update';
  category.value = datapro[i].category;
  mood = 'Update' ;
  scroll({
    top:0,
    behavior: "smooth"

  });
  tem = i


}

function searchby(id){
 let ssearch = document.getElementById('search');
 if(id === "searchbytitle"){
    searchmood = 'title'
    ssearch.placeholder = 'search by title'
    

 }else{
    searchmood = 'category'
    ssearch.placeholder = 'search by category'

 }
ssearch.focus()
ssearch.value = '';
readData()
}

// searchdata
function sreachdata(value){
    let table = '';
   if(searchmood == 'title'){
     for(let i = 0 ; i <datapro.length ; i++){
        if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${[i]}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].count}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updatedata(${i})" >update</button></td>
                    <td><button onclick ="deletedata(${i})">delete</button></td>
                </tr>`
        }
     }
   }else{
     for(let i = 0 ; i <datapro.length ; i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${[i]}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].count}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updatedata(${i})" >update</button></td>
                    <td><button onclick ="deletedata(${i})">delete</button></td>
                </tr>`
        }
     }
   }
   document.getElementById('tbody').innerHTML = table;

}