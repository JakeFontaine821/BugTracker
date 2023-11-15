const body = document.querySelector("body"),
      landing_menu = body.querySelector("main"),
      login_menu = body.querySelector(".login-page"),
      login_button = body.querySelector(".login-button"),
      back_buttons = body.querySelectorAll(".back-button");

login_button.addEventListener("click", () => {
    landing_menu.classList.toggle("off-screen");
    login_menu.classList.toggle("off-screen");
})

for (let i = 0; i < back_buttons.length; i++) {
    back_buttons[i].addEventListener("click", () => {
        landing_menu.classList.toggle("off-screen");
        login_menu.classList.toggle("off-screen");
    })   
}