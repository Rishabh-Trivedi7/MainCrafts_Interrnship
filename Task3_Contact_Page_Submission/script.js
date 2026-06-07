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

            const submission = {

                name: name.value.trim(),

                email: email.value.trim(),

                destination: destination.value,

                message: message.value.trim(),

                submittedAt: new Date().toLocaleString()

            };

            const existingSubmissions =
                JSON.parse(localStorage.getItem("nivanaSubmissions")) || [];

            existingSubmissions.push(submission);

            localStorage.setItem(
                "nivanaSubmissions",
                JSON.stringify(existingSubmissions)
            );

            alert("Inquiry submitted successfully!");

            contactForm.reset();

        }

    });

}
/* ================= DISPLAY SUBMISSIONS ================= */

const submissionsContainer =
    document.getElementById("submissionsContainer");

const emptyState =
    document.getElementById("emptyState");

if(submissionsContainer){

    const submissions =
        JSON.parse(localStorage.getItem("nivanaSubmissions")) || [];

    if(submissions.length === 0){

        emptyState.style.display = "block";

    }

    else{

        emptyState.style.display = "none";

        [...submissions].reverse().forEach((submission, displayIndex) => {

            const actualIndex =
                submissions.length - 1 - displayIndex;

            const card = document.createElement("div");

            card.classList.add("submission-card");

            card.innerHTML = `

                <div class="submission-header">

                    <h3>${submission.name}</h3>

                    <span>${submission.destination}</span>

                </div>

                <p class="submission-email">
                    ${submission.email}
                </p>

                <p class="submission-message">
                    ${submission.message}
                </p>

                <p class="submission-date">
                    Submitted: ${submission.submittedAt}
                </p>

                <button
                    class="delete-btn"
                    data-index="${actualIndex}">
                    Delete
                </button>

            `;

            submissionsContainer.appendChild(card);

        });

    }

}
/* ================= DELETE SUBMISSION ================= */

document.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        const index =
            parseInt(e.target.dataset.index);

        let submissions =
            JSON.parse(
                localStorage.getItem("nivanaSubmissions")
            ) || [];

        submissions.splice(index, 1);

        localStorage.setItem(
            "nivanaSubmissions",
            JSON.stringify(submissions)
        );

        location.reload();

    }

});