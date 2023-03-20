export class Validation{
    constructor(){
        this.name=document.getElementById('name')
        this.phone=document.getElementById('phone')
        this.pass=document.getElementById('password')
        this.email=document.getElementById('email')
        this.age=document.getElementById('age')
        this.rePass=document.getElementById('rePassword')
        this.submit=document.getElementById('formBtn')
        this.submit.addEventListener('click',()=>{
        })
        this.getValues()
    }
    getValues(){
        let phoneVal=this.phone.value
        let pasVal=this.pass.value
        let emailVal=this.email.value
        let ageVal=this.age.value
        let repassVal=this.rePass.value
        this.name.addEventListener('keyup',()=>{
           let nameVal=this.name.value
            this.validName(nameVal)
        })
        this.phone.addEventListener('keyup',()=>{
        let phoneVal=this.phone.value
            this.validPhone(phoneVal)
        })
        this.pass.addEventListener('keyup',()=>{
        let pasVal=this.pass.value
            this.validPass(pasVal)
        })
        this.email.addEventListener('keyup',()=>{
        let emailVal=this.email
            this.validEmail(emailVal)
        })
        this.age.addEventListener('keyup',()=>{
        let ageVal=this.age.value
            this.validAge(ageVal)
        })
        this.rePass.addEventListener('keyup',()=>{
           let pasVal=this.pass
            let repassVal=this.rePass
            this.validRepass(repassVal,pasVal)
        })
    }
    validName(n){
        let regexName=/^[A-z]{1,}$/;
            if(regexName.test(n) !==true){  
                $('#messegeNameWarring').fadeIn(10)
            }
            else{
                $('#messegeNameWarring').fadeOut(10)
            }
    }
    validPhone(ph){
        let regexPhone=/^[0-9]{11,12}$/;
        if(regexPhone.test(ph)!==true){
            $('#messegePhoneWarring').fadeIn(10)
        }else{
            $('#messegePhoneWarring').fadeOut(10)
        }
    }
    validPass(ps){
        let regexPass=/^[A-z]{8,}[0-9]{1}$/;
        if(regexPass.test(ps)!==true){
            $('#messegePassWarring').fadeIn(10)
        }else{
            $('#messegePassWarring').fadeOut(10)
        }
    }
    validEmail(em){
        let regexEmail=/^[A-z]{1,}@[A-z]{1,}\.[A-z]{1,}$/;
        this.email.addEventListener('keyup',()=>{
            if(regexEmail.test(em.value)!==true){
                $('#messegeEmailWarring').fadeIn(10)
            }else{
                $('#messegeEmailWarring').fadeOut(10)
            }
        })
    }
    validAge(age){
        let regexAge=/^[1-9]{1}[0-9]?$/;
        if(regexAge.test(age)!==true){
            // alert('age warning')
            $('#messegeAgeWarring').fadeIn(10)
        }else{
            $('#messegeAgeWarring').fadeOut(10)
        }
        
    }
    validRepass(reps,pass){
        if(reps.value !==pass.value){
            $('#messegeRepasWarring').fadeIn(10)
        }else{
            $('#messegeRepasWarring').fadeOut(10)
        }

    }

}
