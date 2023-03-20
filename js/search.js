import { Details } from "./details.js"
export class Search{
    constructor(){
        $('#SearchInputs').fadeIn(300)
        this.searchName=document.getElementById('searchName')
        this.searchFrist=document.getElementById('searchFirst')
        this.searchName.addEventListener('keyup',()=>{
        $('#loading').fadeIn(300)
            this.searchValues()
            
        })
        this.searchFrist.addEventListener('keyup',()=>{
        $('#loading').fadeIn(300)
            this.searchValues()

        })
    }
    async searchValues(){
        let byName=this.searchName.value
        let fristLetter=this.searchFrist.value
        await this.fetchByName(byName)
        await this.fetchByFirst(fristLetter)   
        $('#loading').fadeOut(300)

    }
    async fetchByFirst(valueLetter){
        if(valueLetter !==""){
            let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueLetter}`)
            api=await api.json()
            api=api.meals
            new Details().displayInSideCatergory(api)
        }else{
            valueLetter="b"
            let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueLetter}`)
            api=await api.json()
            api=api.meals
            new Details().displayInSideCatergory(api)
        }


        
    }
    async fetchByName(valueName){

        if(valueName!==""){
            let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueName}`)
            api=await api.json()
            api=api.meals
            new Details().displayInSideCatergory(api)
        }
        else{
            valueName="cobra"
            let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueName}`)
            api=await api.json()
            api=api.meals
            new Details().displayInSideCatergory(api)

        }
    }
}