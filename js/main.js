/// <reference types="../@types/jquery" />
let categoryItem=[];
$(function () {
   $('.loading').fadeOut(1000,function(){
    $('body').css('overflow','auto')
   })
})

$('.fa-align-justify').on('click', function () {
    openSideNav()
})

$('.fa-x').on('click', function () {
    closeSideNav()
})


function openSideNav() {
    $('#sideNav').animate({ left: 0 }, 500)
    $('.fa-align-justify').addClass('d-none')
    $('.fa-x').removeClass('d-none')
    let listItems = $('.bodyList ul li')
    for (let i = 0; i < listItems.length; i++) {
        listItems.eq(i).animate({ top: 0 }, (1 + i) * 120)
    }


}
function closeSideNav() {
    $('#sideNav').animate({ left: '-15rem' }, 500)
    $('.fa-align-justify').removeClass('d-none')
    $('.fa-x').addClass('d-none')
    let listItems = $('.bodyList ul li')
    for (let i = 0; i < listItems.length; i++) {
        listItems.eq(i).animate({ top: '10rem' }, (1 + i) * 120)
    }


}

// ===========home meals display========================

async function getHomeMeals() {
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await https.json()
    return response.meals;
}
function displayMeals(array) {
    let cartona = ``
    for (let i = 0; i < array.length; i++) {
        cartona += `<div class="col-sm-10 col-md-5 offset-sm-2 offset-md-1 col-lg-3 offset-lg-0" >
        <div class="item position-relative overflow-hidden ">
        <img src="${array[i].strMealThumb}" class="img-fluid rounded-2" alt="">
        <div class="homeItem  caption position-absolute rounded-2 d-flex align-items-center" data-meal=${array[i].idMeal}>
            <h2 data-meal=${array[i].idMeal}>${array[i].strMeal}</h2>
        </div>
    </div>  
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona;

}
(async function(){
    let meals=await getHomeMeals();
    displayMeals(meals) 
    let items=document.querySelectorAll('.homeItem')
    for(let i=0;i<items.length;i++){
        items[i].addEventListener('click',function(e){
            $('.loading').fadeIn(500,function(){
                    showDetails( e.target.getAttribute('data-meal'))
            }).fadeOut(1000)
          
        })
    }
    
    
    
})();


// ***********category***********
function getWordStr(str) {
    return str.split(/\s+/).slice(0, 20).join(" ");
}
async function getCategory(){
    let https= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response=await https.json()
    return response.categories
}

function displayCategories(array){
   let cartona=``
   for(let i=0;i<array.length;i++){
    cartona+=`<div class="col-md-3 offset-md-0 col-sm-10 offset-sm-2 text-center ">
    <div class="item overflow-hidden position-relative">
        <img src="${array[i].strCategoryThumb}" class="img-fluid" alt="">
        <div class="categoryItem caption position-absolute  " data-meal=${array[i].strCategory}>
            <h3  data-meal=${array[i].strCategory}>${array[i].strCategory}</h3>
            <p class="p-3"  data-meal=${array[i].strCategory}>${getWordStr(array[i].strCategoryDescription)}</p>
        </div>
    </div>
</div>`

 
   }
   document.getElementById('rowData').innerHTML=cartona

   let categoryItem=document.getElementsByClassName('categoryItem')
   for(let i=0;i<categoryItem.length;i++){
    categoryItem[i].addEventListener('click',async function(e){
       await getCategoryMeals(e.target.getAttribute('data-meal'))
        
    })
   }

}

async function getCategoryMeals(category){
    let https= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response=await https.json()
    $('.loading').fadeIn(500,function(){
        displayMeals(response.meals)
        let items=document.querySelectorAll('.homeItem')
    for(let i=0;i<items.length;i++){
        items[i].addEventListener('click',function(e){
            $('.loading').fadeIn(500,function(){
                    showDetails( e.target.getAttribute('data-meal'))
            }).fadeOut(1000)
          
        })
    }
    
    }).fadeOut(500)
    
}
// ==================area======================
async function getAreas(){
    let https=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response= await https.json()
    return response.meals;
}

function displayAreas(array){
    let cartona=``
    for (let i=0;i<array.length;i++){
        cartona+=` <div class="col-lg-3 col-md-6  ">
        <div class="areaItem item text-white text-center ">
            <i data-meal=${array[i].strArea} class=" fa-solid fa-house-laptop  "></i>
            <h3 data-meal=${array[i].strArea} >${array[i].strArea}</h3>
        </div>
    </div>`
    }
    document.querySelector('#rowData').innerHTML=cartona;
    let areaItem=document.getElementsByClassName('areaItem')
    for(let i=0;i<areaItem.length;i++){
        areaItem[i].addEventListener('click',async function(e){
           await getAreaMeals(e.target.getAttribute('data-meal'))
        })
    }

}

async function getAreaMeals(area){
    let https=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response=await https.json()
    $('.loading').fadeIn(500,function(){
        displayMeals(response.meals)
        let items=document.getElementsByClassName('homeItem')
        for(let i=0;i<items.length;i++){
            items[i].addEventListener('click',function(e){
                 $('.loading').fadeIn(500,function (){
                    showDetails(e.target.getAttribute('data-meal'))
                 }).fadeOut(500)
            })
        }
    }).fadeOut(500)
}




// ============ ingredients==================
async function getIngredients(){
    let https=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response=await https.json()
    return response.meals;
}

function displayIngredients(array){
    let cartona=``
    for(let i=0;i<20;i++){
        cartona+=`<div class="col-lg-3 col-md-6">
        <div class="ingredientItem item text-center text-white">
            <i data-meal=${array[i].strIngredient} class=" fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 data-meal=${array[i].strIngredient} class="pt-2">${array[i].strIngredient}</h3>
            <p data-meal=${array[i].strIngredient} >${getWordStr(array[i].strDescription)}</p>
        </div>
    </div>`
    }
    document.getElementById('rowData').innerHTML=cartona
    let ingredientItem=document.getElementsByClassName('ingredientItem')
    for(let i=0;i<ingredientItem.length;i++){
        ingredientItem[i].addEventListener('click', async function(e){
            
               await getIngredientMeals(e.target.getAttribute('data-meal'))
            
        })
    }

}

async function getIngredientMeals(ingredient){
    let https= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let response=await https.json()
    $('.loading').fadeIn(500,function(){
        displayMeals(response.meals)
        let items=document.getElementsByClassName('homeItem')
        for(let i=0;i<items.length;i++){
            items[i].addEventListener('click',function(e){
                $('.loading').fadeIn(500,function (){
                    showDetails(e.target.getAttribute('data-meal'))
                 }).fadeOut(500)
            })
        }
    }).fadeOut(500)
}


// ==============================================



async function showDetails(idMeal){
    let https=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let response=await https.json()
    let mealDetails=response.meals[0];
    let ingredients=``
    for(let i=0;i<20;i++){
        if(mealDetails[`strIngredient${i}`]){
           ingredients+=`<span class="badge  m-2 fw-lighter">${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]} </span>`
        }
    }
    let cartona=`<div class=" col-md-10 offset-md-2 col-lg-4 offset-lg-0 text-white">
    <div class="detailsImage">
        <img src="${mealDetails.strMealThumb}" class="img-fluid rounded-3" alt="">
        <h3 class="pt-3">${mealDetails.strMeal}</h3>
    </div>
</div>

<div class="  col-md-10 offset-md-2 col-lg-8 offset-lg-0  text-white">
    <div class="details">
        <p class="h5">${mealDetails.strInstructions}</p>
        <h2  class="pt-3">Area : ${mealDetails.strArea}</h2>
        <h2 class="pt-3">Category : ${mealDetails.strCategory}</h2>
         <h2 class="pt-3">Recipes :</h2>
         <p class="h3 ">${ingredients} </p>
         <h2>Tags :</h2>
         <div class="btns pt-4">
         <a href="${mealDetails.strSource}" target="_blank" class="btn btn-success">Success</a>
         <a href="${mealDetails.strYoutube}" target="_blank" class="btn btn-danger mx-2">Youtube</a>
         </div>
         
    </div>

</div>`
 document.getElementById('rowData').innerHTML=cartona

}

function getSearch(){
    document.getElementById('searchField').innerHTML=`<div class="searchInputs w-75 d-flex justify-content-between mx-auto ">
    <input type="text" class="form-control mx-2  bg-black text-white" id="searchByName" placeholder="Search By Name">
<input type="text" maxlength="1" class="form-control mx-2  bg-black text-white" id="searchByFLetter" placeholder="Search By First Litter">
</div>

`
document.getElementById('rowData').innerHTML=''

document.getElementById('searchByName').addEventListener('input',async function(){
    if(this.value){
        await searchByName(this.value)
    }else{
        document.getElementById('rowData').innerHTML=null
    }
})

document.getElementById('searchByFLetter').addEventListener('input',async function(){
    if(this.value){
        await searchByFLetter(this.value)
    }else{
        document.getElementById('rowData').innerHTML=null
    }
})

}

async function searchByName(name){
  let https= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let response=await https.json()
  response=response.meals;
  if(response){
    $('.loading').fadeIn(500,function(){
        displayMeals(response)
        let items=document.getElementsByClassName('homeItem')
      for(let i=0;i<items.length;i++){
        items[i].addEventListener('click',function(e){
            $('.loading').fadeIn(500, async function(){
                document.getElementById('searchField').innerHTML=null
            await showDetails(e.target.getAttribute('data-meal'));
            }).fadeOut(500)
        })
      }
      }).fadeOut(500)
  }else{
    document.getElementById('rowData').innerHTML=`<h2 class="text-center text-white mt-5 ">no meals found</h2>`
  }
 
  
  
}

async function searchByFLetter(letter){
  let https=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let response= await https.json()
  response=response.meals;
  if(response!=null){
    $('.loading').fadeIn(500,function(){
        displayMeals(response) 
        let items=document.getElementsByClassName('homeItem')
        for(let i=0;i<items.length;i++){
          items[i].addEventListener('click',function(e){
              $('.loading').fadeIn(500, async function(){
                  document.getElementById('searchField').innerHTML=null
              await showDetails(e.target.getAttribute('data-meal'));
              }).fadeOut(500)
          })
        }
        
    }).fadeOut(500)
    
  }else{
    document.getElementById('rowData').innerHTML=`<h2 class="text-center text-white mt-5 ">no meals found</h2>`
  }
  
}








// ==============events====================
document.getElementById('Search').addEventListener('click',async function(){
    closeSideNav()
    getSearch()
   
    
})

document.getElementById('Categories').addEventListener('click',async function(){
    document.getElementById('searchField').innerHTML=null
    closeSideNav()
    let items =await getCategory()
    $('.loading').fadeIn(500,function(){
        displayCategories(items)
       
    }).fadeOut(500)
   
    
})

document.getElementById('Area').addEventListener('click',async function(){
    document.getElementById('searchField').innerHTML=null
    closeSideNav()
    let items =await getAreas()
    $('.loading').fadeIn(500,function(){
        displayAreas(items)
    }).fadeOut(500)
    
})

document.getElementById('Ingredients').addEventListener('click',async function(){
    document.getElementById('searchField').innerHTML=null
    closeSideNav()
    let items =await getIngredients()
    $('.loading').fadeIn(500,function(){
        displayIngredients(items)
        
    }).fadeOut(500)
    
})


    


