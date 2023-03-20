export class Details{
    constructor(nameMeals){
        $('#loading').fadeIn(300)
        this.fetchInSideCatergory(nameMeals)
    }

    async fetchInSideCatergory(nameMeal){
        let idApi=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameMeal}`)
        idApi=await idApi.json()
        idApi=idApi.meals;
        if(idApi!==null){
            this.displayInSideCatergory(idApi)
        }
        $('#loading').fadeOut(300)
    }
    displayInSideCatergory(meal){
        let globalid;
        let boxInSide=``
        if(meal !==null){
            for(let x=0;x<meal.length;x++){
                boxInSide+=`
                    <div class="col-md-3">
                        <div data-id="${meal[x].idMeal}" class="items">
                            <div class="image">
                                <img src="${meal[x].strMealThumb}" class="w-100" alt="">
                            </div>
                            <div  class="caption d-flex align-items-center justify-content-center text-dark">
                                <h3>${meal[x].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `
            }
            document.getElementById('meals').innerHTML=boxInSide
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
    }
    async getId(id){
        let api =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        api =await api.json()
        api=api.meals
        id=api
        this.displayDetails(api)
    }


    displayDetails(data){
        let detailsBox=``
        for(let i=0;i<data.length;i++){
            let tags=data[i].strTags?.split(",")
            if(!tags) tags=[]
            let tagStr=``            
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
