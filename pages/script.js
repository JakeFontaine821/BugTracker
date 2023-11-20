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
    switch (current_page) {
        case Pages.Landing:
        case 0:
            landing_menu.classList.toggle("off-screen");
            break;
            
        case Pages.Login:
        case 1:
            login_menu.classList.toggle("off-screen");
            break;

        case Pages.Signup:
        case 2:
            signup_menu.classList.toggle("off-screen");
            break;
    }
    
    switch (_nextPage) {
        case Pages.Landing:
        case 0:
            landing_menu.classList.toggle("off-screen");
            break;

        case Pages.Login:
        case 1:
            login_menu.classList.toggle("off-screen");
            break;

        case Pages.Signup:
        case 2:
            signup_menu.classList.toggle("off-screen");
            break;
    }

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


var queryData = window.location.search;
var entries = new URLSearchParams(queryData);
try {
    let page = parseInt(entries.get("page"));
    if(page === 0 || page === 1 || page === 2) {
        SwitchPages(page);
    }
} 
catch (err) {
    console.log(err);
}