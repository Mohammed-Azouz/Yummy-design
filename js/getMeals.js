import { Details } from "./details.js"
import { GetAreaDet } from './areaDetails.js'
import {GetIngredient} from './ingredients.js'
import { Search } from "./search.js"
import { Validation } from "./regex.js"
new Validation()
export class Getdata{
    constructor(){
        document.getElementById('openNav').addEventListener('click',()=>{
               this.closeNav()
        })
        $(document).ready(function(){
            $('#loading').fadeOut(500,function(){
                $('body').css('overflow','auto')
            })
        })
        document.querySelectorAll('.allLinks a').forEach((link)=>{
            link.addEventListener('click',(e)=>{
               let ancor= e.target.dataset.text
               if(ancor==='category'){
                $('#home').fadeIn(500)
                $('#detailsPage').fadeOut(500)
                $('#groubForm').fadeOut(300)
                $('#SearchInputs').fadeOut(300)
                this.fetchCategory()
                this.closeNav()
               }
               else if(ancor==='search'){
                $('#loading').fadeIn(300)
                $('#home').fadeIn(500)
                $('#detailsPage').fadeOut(500)
                $('#groubForm').fadeOut(300)
                new Search
               $('#loading').fadeOut(300)
                this.closeNav()
               }
               else if(ancor==='area'){
                $('#home').fadeIn(500)
                $('#detailsPage').fadeOut(500)
                $('#SearchInputs').fadeOut(300)
               $('#groubForm').fadeOut(300)
                this.fetchArea()
                this.closeNav()
               }
               else if(ancor==='ingredient'){
                $('#home').fadeIn(500)
                $('#detailsPage').fadeOut(500)
                $('#SearchInputs').fadeOut(300)
                $('#groubForm').fadeOut(300)

                new GetIngredient
                this.closeNav()
               }else if(ancor==='contact'){
                $('#loading').fadeIn(300)
                $('#home').fadeOut(500)
                $('#detailsPage').fadeOut(500)
                $('#SearchInputs').fadeOut(300)
                $('#groubForm').fadeIn(300)
                this.closeNav()
                $('#loading').fadeOut(300)
               }
            })
        })
    }
    closeNav(){
        let toggle=$('.nav-links').css('width')
            if(toggle>'0px'){
                $('.nav-links').animate({width:'0px'},500)
                $('#openNav').removeClass('fa-xmark')     
                $('#openNav').addClass('fa-bars')
                
                for(let i=0;i<5; i++){
                    $('.allLinks a').eq(i).animate({top:'0'},(i + 5)*100)
                }
               
            }else{
                $('.nav-links').animate({width:"301.188px"},500)
                $('#openNav').removeClass('fa-bars')
                $('#openNav').addClass('fa-xmark')
                for(let i=0;i<5; i++){
                    $('.allLinks a').eq(i).animate({top:'0'},(i +6)*100).css('position','relative')                    
                }
                
            }
    }
    async fetchCategory(){
        $('#loading').fadeIn(300)

        let api=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        api=await api.json()
        api=api.categories
        this.displayCate(api)
        $('#loading').fadeOut(300)
        
    }
    displayCate(data){
        let box=``
        for(let x=0;x<data.length;x++){
            box+=`
               <div class="col-md-3">
                    <div data-name="${data[x].strCategory}" class="items">
                        <div class="image">
                            <img src="${data[x].strCategoryThumb}" class="w-100" alt="">
                        </div>
                        <div  class="caption text-center text-dark">
                            <h3>${data[x].strCategory}</h3>
                            <p  class="text-caption">${data[x].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div> 
            `
        }
        document.getElementById('meals').innerHTML=box
        document.querySelectorAll('.items').forEach((link)=>{
            link.addEventListener('click',function(){
               $('#loading').fadeIn(300)
                let mealsName=this.dataset.name
                let details =new Details(mealsName)
                $('#loading').fadeOut(300)

            })
        })
    }



    async fetchArea(){
        $('#loading').fadeIn(300)
        let apis=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        apis=await apis.json()
        apis=apis.meals
        this.displayArea(apis)
        $('#loading').fadeOut(300)


    }
    displayArea(data){
        let nameCount;
        let cartona=``
        for(let i=0;i<data.length;i++){
            cartona+=`
                <div class="col-md-3">
                    <div data-location="${data[i].strArea}" class="location text-center text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="nameOfCountry">${data[i].strArea}</h3>
                    </div>
                </div>
            `
        }
        document.getElementById('meals').innerHTML=cartona
        document.querySelectorAll('.location').forEach((link)=>{
            link.addEventListener('click',function(){
             $('#loading').fadeIn(300)
                nameCount= this.dataset.location
            })
            link.addEventListener('click',(e)=>{
                this.filterArea(nameCount)
             $('#loading').fadeOut(300)

            })
            
            
        })
        

    }
    async filterArea(country){
        $('#loading').fadeIn(300)
        let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
        api=await api.json()
        api=api.meals
        this.displayAreaCountry(api)
        $('#loading').fadeOut(300)
    }
    displayAreaCountry(mealsCountry){
        let globalId;
       let  boxMealsC=``
        for(let x=0;x<mealsCountry.length;x++){
            boxMealsC+=`
                <div class="col-md-3">
                    <div data-id="${mealsCountry[x].idMeal}" class="items">
                        <div class="image">
                            <img src="${mealsCountry[x].strMealThumb}" class="w-100" alt="">
                        </div>
                        <div class="caption d-flex align-items-center justify-content-center text-dark">
                            <h3>${mealsCountry[x].strMeal}</h3>
                        </div>
                    </div>
                </div>`
                
            }
            document.getElementById('meals').innerHTML=boxMealsC
            document.querySelectorAll('.items').forEach((link)=>{
                link.addEventListener('click',function(){
                  $('#loading').fadeIn(300)
                   globalId=this.dataset.id;
                })
                link.addEventListener('click',()=>{
                    new GetAreaDet(globalId)
                    $('#home').fadeOut(500)
                    $('#detailsPage').fadeIn(500)
                    $('#loading').fadeOut(300)

                })
            })

    }
}
