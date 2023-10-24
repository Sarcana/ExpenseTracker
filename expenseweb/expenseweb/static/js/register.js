console.log("register working")
// # for id and . for class
const usernameField = document.querySelector('#userNameField');
const feedbackArea= document.querySelector('.invalid-feedback');
const emailField=document.querySelector('#emailField');
const emailfeedbackArea=document.querySelector('.emailfeedbackArea');
const usernameSuccessOutput=document.querySelector(".usernameSuccessOutput");
const showPwd=document.querySelector(".showPwd");
const passwordField=document.querySelector('#passwordField');
emailField.addEventListener("keyup",(e)=>{
    const emailVal = e.target.value;
    console.log("email", emailVal); 
    
   
    if (emailVal.length > 0) {
        fetch('/authentication/validate-email', {
            body: JSON.stringify({ email: emailVal }),
            method: "POST",
        })
            .then(res => res.json()). 
            // dot nahi thi
            then(data => {
                console.log("data", data);
                if(data.email_error){
                    emailField.classList.add("is-invalid");
                    emailfeedbackArea.style.display = "block";
                    emailfeedbackArea.innerHTML = `<p>${data.email_error}</p>`
                }
                if(data.email_valid){
                    emailField.classList.remove("is-invalid");
                    emailfeedbackArea.style.display = "none";
        
                }
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

});
// e returns an event key up says when someones types somehing
usernameField.addEventListener("keyup", (e) => {
    
    //saves the username value
    const usernameVal = e.target.value;
    console.log("username", usernameVal);

    usernameSuccessOutput.style.display="block";
    usernameSuccessOutput.textContent=`Checking ${usernameVal}`;

//follwoing block is to remove the error line when username is changedf to valid
// usernameField.classList.remove("is-invalid");
// feedbackArea.style.display="block"; 

                    

    //API Call which allows us to do stuff just like in Postman
    //checking in console what is tghe username
    //checking if list isnt empty
    if (usernameVal.length > 0) {
        fetch('/authentication/validate-username', {
            body: JSON.stringify({ username: usernameVal }),
            // body: { username: usernameVal },
            method: "POST",
        })
            .then(res => res.json()).
            then(data => {
                console.log("data", data)
                //how does it know usernmae eror koacces karna
                // if(data.username_error){
                //     usernameField.classList.add("is-invalid");
                //     feedbackArea.style.display="block"; 
                //     feedbackArea.innerHTML=`<p>${data.username_error}</p>`
                    
                // }
                usernameSuccessOutput.style.display="none";
                if(data.username_error){
                    usernameField.classList.add("is-invalid");
                    feedbackArea.style.display = "block";
                    feedbackArea.innerHTML = `<p>${data.username_error}</p>`
                }
                if(data.username_valid){
                    usernameField.classList.remove("is-invalid");
                    feedbackArea.style.display = "none";
        
                }
            });
    }

});

const handleToggleInput=(e)=>{
    if( showPwd.textContent=="SHOW"){
        showPwd.textContent="HIDE";
        passwordField.setAttribute("type","text");
    }
    else if(showPwd.textContent=="HIDE"){
        showPwd.textContent="SHOW";
        passwordField.setAttribute("type","password");
    }
};
showPwd.addEventListener('click',handleToggleInput);


