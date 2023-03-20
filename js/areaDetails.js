export class GetAreaDet{
    constructor(id){
        this.areaDetails(id)

    }
    async areaDetails(id){
        let api =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        api=await api.json()
        api=api.meals
        this.displayArreaDetails(api)
    }
    displayArreaDetails(data){
        let detailsBox=``
        for(let i=0;i<data.length;i++){
            let tags=data[i].strTags?.split(",")
            if(!tags) tags=[];
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