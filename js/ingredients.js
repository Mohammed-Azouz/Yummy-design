export class GetIngredient{
    constructor(){
        this.fethInt()
    }
    async fethInt(){
        $('#loading').fadeIn(300)
        let api =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        api=await api.json()
        api=api.meals
        this.displayInte(api)
        $('#loading').fadeOut(300)

    }
    displayInte(data){
        let nameCount;
        let cartona=``
        for(let i=0;i<20;i++){
            cartona+=`
                <div class="col-md-3">
                    <div data-name="${data[i].strIngredient}" class="groubInt text-center text-light">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h2>${data[i].strIngredient}</h2>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            `
        }
        document.getElementById('meals').innerHTML=cartona
        document.querySelectorAll('.groubInt').forEach((link)=>{
            link.addEventListener('click',function(){
             $('#loading').fadeIn(300)
               nameCount= this.dataset.name
            })
            link.addEventListener('click',()=>{
                this.fetchIntMeals(nameCount)
            })
        })
    }
    async fetchIntMeals(nameMeal){
        let idApi=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameMeal}`)
        idApi=await idApi.json()
        idApi=idApi.meals;
        this.displayMeals(idApi)
        $('#loading').fadeOut(300)
    }
    displayMeals(data){
        let globalid;
        let box=``
        for(let x=0;x<data.length;x++){
            box+=`
               <div class="col-md-3">
                    <div data-id="${data[x].idMeal}" class="items">
                        <div class="image">
                            <img src="${data[x].strMealThumb}" class="w-100" alt="">
                        </div>
                        <div  class="caption d-flex align-items-center justify-content-center text-dark">
                            <h3>${data[x].strMeal}</h3>
                        </div>
                    </div>
                </div>
            
            `
        }
        document.getElementById('meals').innerHTML=box
        document.querySelectorAll('.items').forEach((link)=>{
            link.addEventListener('click',function(){
                globalid= this.dataset.id
            })
            link.addEventListener('click',()=>{
                this.getId(globalid)
                $('#home').fadeOut(500)
                $('#detailsPage').fadeIn(500)
                
            })
        })
    }
    async getId(id){
        let api =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        api =await api.json()
        api=api.meals
        this.displayDetails(api)
    }
    displayDetails(data){
        let detailsBox=``
        let tagStr=``            
        for(let i=0;i<data.length;i++){
            let tags=data[i].strTags.split(",")
            for(let x=0;x<tags.length;x++){
                tagStr+=`<li class="ms-3 list-unstyled mb-3 rounded-1 p-1">${tags[x]}</li>`
            }
            detailsBox=`
            <div class="col-md-4">
                    <div class="image-Details">
                        <img src="${data[i].strMealThumb}" class="w-100  rounded-4" alt="">
                    </div>
                    <h3 id="nameInDetails" class="pt-3 text-center text-danger text-uppercase">${data[i].strMeal}</h3>
                </div>

            <div class="col-md-8">
                    <div class="titleCard">
                        <h2>Instructions</h2>
                    </div>
                    <div class="textDetails">
                        <p class="text-light" >${data[i].strInstructions}</p>
                    </div>
                    <div class="areaDetails">
                        <h2>Area : <span class="text-warning">${data[i].strArea}</span> </h2>
                        <h2>Category : <span class="text-warning">${data[i].strCategory}</span> </h2>
                        <h2>Recipes :</h2>
                        <ul class="d-flex flex-wrap  list-unstyled">
                            <li class="me-3 mb-3 rounded-1 p-1">2 large Potatoes</li>
                            <li class="me-3 mb-3 rounded-1 p-1">2 tbs Butter</li>
                            <li class="me-3 mb-3 rounded-1 p-1">150g Cheese</li>
                            <li class="me-3 mb-3 rounded-1 p-1">1 large Onion</li>
                            <li class="me-3 mb-3 rounded-1 p-1">1 large Red Pepper</li>
                            <li class="me-3 mb-3 rounded-1 p-1">Pinch Red Chile Flakes</li>
                        </ul>
                        <h2>Tags :</h2>
                        <ul  class="tagsH d-flex flex-wraplist-unstyled">${tagStr}</ul>
                    </div>
                    <div class="btnsDetails">
                        <a href="${data[i].strSource}" class="btn btn-success ">source</a>
                        <a href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
                    </div>
            </div>
            `
        }
        
        document.getElementById('detailsContent').innerHTML=detailsBox
    }
    
}








