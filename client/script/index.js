"use strict";

const form = document.querySelector("form");
const input = document.querySelector(".input");

//for mobiles to scroll up
input.addEventListener("blur", function () {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
});
