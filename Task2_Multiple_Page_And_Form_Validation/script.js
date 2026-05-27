/* ================= MOBILE MENU ================= */

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* ================= DROPDOWN ================= */

const dropdown = document.querySelector(".dropdown");

const exploreToggle = document.querySelector("#exploreToggle");

if(exploreToggle){

    exploreToggle.addEventListener("click", (e) => {

        e.preventDefault();

        dropdown.classList.toggle("active");

    });

}


/* ================= CLOSE DROPDOWN ================= */

document.addEventListener("click", (e) => {

    if(dropdown && !dropdown.contains(e.target)){

        dropdown.classList.remove("active");

    }

});


/* ================= FORM VALIDATION ================= */

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");

        const email = document.getElementById("email");

        const destination = document.getElementById("destination");

        const message = document.getElementById("message");

        const nameError = document.getElementById("nameError");

        const emailError = document.getElementById("emailError");

        const destinationError = document.getElementById("destinationError");

        const messageError = document.getElementById("messageError");


        /* CLEAR ERRORS */

        nameError.textContent = "";

        emailError.textContent = "";

        destinationError.textContent = "";

        messageError.textContent = "";


        /* NAME */

        if(name.value.trim() === ""){

            nameError.textContent = "Please enter your name.";

            isValid = false;

        }


        /* EMAIL */

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if(email.value.trim() === ""){

            emailError.textContent = "Please enter your email.";

            isValid = false;

        }

        else if(!email.value.match(emailPattern)){

            emailError.textContent = "Please enter a valid email.";

            isValid = false;

        }


        /* DESTINATION */

        if(destination.value === ""){

            destinationError.textContent = "Please select a destination.";

            isValid = false;

        }


        /* MESSAGE */

        if(message.value.trim() === ""){

            messageError.textContent = "Please enter your message.";

            isValid = false;

        }

        else if(message.value.trim().length < 10){

            messageError.textContent = "Message should be at least 10 characters.";

            isValid = false;

        }


        /* SUCCESS */

        if(isValid){

            alert("Inquiry submitted successfully!");

            contactForm.reset();

        }

    });

}