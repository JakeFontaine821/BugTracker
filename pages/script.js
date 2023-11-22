/*********************************************************************************************/
/*                                 Landing Page Traversal                                    */
/*********************************************************************************************/
const body = document.querySelector("body"),
      landing_menu = body.querySelector("main"),
      login_button = body.querySelector(".login-button"),
      signup_button = body.querySelector(".signup-button"),
      login_menu = body.querySelector(".login-page"),      
      signup_menu = body.querySelector(".signup-page"),
      back_buttons = body.querySelectorAll(".back-button");

const Pages = {
    Landing: 0,
    Login: 1,
    Signup: 2
}
let current_page = Pages.Landing;

function SwitchPages(_nextPage) {
    // Close current page
    switch (current_page) {
        case Pages.Landing:
            landing_menu.classList.toggle("off-screen");
            break;
            
        case Pages.Login:
            login_menu.classList.toggle("off-screen");
            break;

        case Pages.Signup:
            signup_menu.classList.toggle("off-screen");
            break;
    }
    // Open new page
    switch (_nextPage) {
        case Pages.Landing:
            landing_menu.classList.toggle("off-screen");
            break;

        case Pages.Login:
            login_menu.classList.toggle("off-screen");
            break;

        case Pages.Signup:
            signup_menu.classList.toggle("off-screen");
            break;
    }
    // Switch to current page
    current_page = _nextPage;
}

login_button.addEventListener("click", () => {
    SwitchPages(Pages.Login);
})

signup_button.addEventListener("click", () => {
    SwitchPages(Pages.Signup);
})

for (let i = 0; i < back_buttons.length; i++) {
    back_buttons[i].addEventListener("click", () => {
        SwitchPages(Pages.Landing);
    })   
}

login_menu.style.visibility='hidden';
signup_menu.style.visibility='hidden';
setTimeout(() => {
    login_menu.style.visibility='visible';
    signup_menu.style.visibility='visible';
}, 800)

/*********************************************************************************************/
/*                                  Sign Up Username Check                                   */
/*********************************************************************************************/
const submit_signup_button = body.querySelectorAll(".submit-button"),
      username_input = body.querySelector("#signup-username"),
      username_error = document.getElementById("signup-username-error"),
      interval = 1000/5; // 5 times a second
let current_username_entry = "";

let username_check = setInterval(function(){
    if(current_page == Pages.Signup && 
        current_username_entry != username_input.value) { 
            // Only run if were on sign in page and username entry has changed
            current_username_entry = username_input.value

            // Set up request
            let requestData = {
                username: current_username_entry
            }

            // Make Server request
            fetch("/checkExistingUsername", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            }).then(function(_accountObject){
                _accountObject.json().then(function(accounts){
                    if(accounts._accountInfo.length > 0) {
                        submit_signup_button[1].disabled = true;
                        username_error.innerHTML = "Username is taken.";
                    }
                    else {
                        submit_signup_button[1].disabled = false;
                        username_error.innerHTML = "";
                    }
                })
            })
    }
}, interval)

/*********************************************************************************************/
/*                                  Log in Username Check                                    */
/*********************************************************************************************/
const login_form = body.querySelector(".login-form"),
      login_username = document.getElementById("login-username"),
      login_password = document.getElementById("login-password"),
      login_error = document.getElementById("login-username-error");

login_form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let requestData = {
        username: login_username.value,
        password: login_password.value
    }

    fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    }).then(function(_errorObject) {
        _errorObject.json().then(function(error){
            // login_error.innerHTML = error.username;
            console.log(error);
        })
    })
});