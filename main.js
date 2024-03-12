let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let descount = document.getElementById('descount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('sumbit');


let mood = 'creat';
let temp ;


function getTotal()
{
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value)- +descount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML='';
        total.style.background = '#a00d02';
    }
}



let datePro;
if(localStorage.product  != null){
    datePro = JSON.parse(localStorage.product )
}else{
    datePro  = [];
}


sumbit.onclick = function(){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        descount:descount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    if(title.value != ''
    && price.value != '' 
    && category.value != ''
    &&newPro.count<200){
        if(mood === 'creat'){
            if(newPro.count>1){
                for(let i = 0; i < newPro.count;i++){
                    datePro.push(newPro);
                }
              }else{
                datePro.push(newPro);
              }
        }else{
            datePro[temp] = newPro;
            mood = 'creat';
            sumbit.innerHTML = 'creat';
            count.style.display= 'block';
        }
        clearDate()

    }

   

      

   


    // save localStorge
    localStorage.setItem('product' ,     JSON.stringify(datePro)             )

    
    showData()
}


function clearDate(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    descount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}





// read

function showData()
{

getTotal()
let table = '';


for(let i = 0; i<datePro.length;i++){
    table+= `
    <tr>
    <td>${i+1}</td>
    <td> ${datePro[i].title} </td>
    <td> ${datePro[i].price} </td>
    <td> ${datePro[i].taxes} </td>
    <td> ${datePro[i].ads} </td>
    <td> ${datePro[i].descount} </td>
    <td> ${datePro[i].total} </td>
    <td> ${datePro[i].category} </td>
    <td> <button  onclick="updateData( ${i} )" id="update">update</button> </td>
    <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>
    
    </tr>
    `
    
}

     document.getElementById('tbody').innerHTML = table;
     let btnDelete = document.getElementById('deleteAll');
     if(datePro.length > 0 ){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">delete All (${datePro.length}) </button>

        `
        
     }else{
        btnDelete.innerHTML ='';
        
     }
}
showData()




// delete

function deleteData(i)
{
      datePro.splice(i,1);
      localStorage.product = JSON.stringify(datePro);
      showData()

}
function deleteAll(){
    localStorage.clear()
    datePro.splice(0)
    showData()

}

//count


//update


function updateData(i){
title.value = datePro[i].title;
price.value = datePro[i].price;
ads.value = datePro[i].ads;
descount.value = datePro[i].descount;
getTotal()
count.style.display = 'none';
category.value = datePro[i].category;
sumbit.innerHTML = 'Update';
mood = ' update';
temp = i ;
scroll({
    top:0,
    behavior: 'smooth',


})

}


//search

let searchMood = 'title';


function getSearchMood(id)
{
    let search = document.getElementById('Search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By category';
    }
search.focus()    
search.value = '';
showData()
   

}

function searchData(value)
{
    let table ='';
    if(searchMood == 'title')
    {


        
       
             for (let i = 0; i < datePro.length; i++){
                if(datePro[i].title.includes(value.toLowerCase())){
                    table+= `
                            <tr>
                            <td>${i}</td>
                            <td> ${datePro[i].title} </td>
                            <td> ${datePro[i].price} </td>
                            <td> ${datePro[i].taxes} </td>
                            <td> ${datePro[i].ads} </td>
                            <td> ${datePro[i].descount} </td>
                            <td> ${datePro[i].total} </td>
                            <td> ${datePro[i].category} </td>
                            <td> <button  onclick="updateData( ${i} )" id="update">update</button> </td>
                            <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>
    
                            </tr>
                            `
                }
               
            }
        

    }else{

        for (let i = 0; i < datePro.length; i++){
            if(datePro[i].category.includes(value.toLowerCase())){
                table+= `
                        <tr>
                        <td>${i}</td>
                        <td> ${datePro[i].title} </td>
                        <td> ${datePro[i].price} </td>
                        <td> ${datePro[i].taxes} </td>
                        <td> ${datePro[i].ads} </td>
                        <td> ${datePro[i].descount} </td>
                        <td> ${datePro[i].total} </td>
                        <td> ${datePro[i].category} </td>
                        <td> <button  onclick="updateData( ${i} )" id="update">update</button> </td>
                        <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>

                        </tr>
                        `
            }
           
        }

    }
    document.getElementById('tbody').innerHTML = table;
}



//clean data

