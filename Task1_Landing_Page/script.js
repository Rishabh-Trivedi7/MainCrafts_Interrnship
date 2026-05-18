const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* ================= DROPDOWN ================= */

const dropdown = document.querySelector(".dropdown");

const exploreToggle = document.querySelector("#exploreToggle");

exploreToggle.addEventListener("click", (e) => {

    e.preventDefault();

    dropdown.classList.toggle("active");

});


/* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */

document.addEventListener("click", (e) => {

    if(!dropdown.contains(e.target)){

        dropdown.classList.remove("active");

    }

});