/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");
        const originalButton = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span>Sending...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;

        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success !== false) {
                formStatus.textContent =
                    "Message sent successfully! I'll get back to you soon.";

                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                throw new Error("Submission failed.");
            }

        } catch (error) {

            formStatus.textContent =
                "Something went wrong. Please try again or email me directly.";

            formStatus.classList.add("error");

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButton;

        }
    });
}
/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    /* Close menu after clicking a link */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}

/* ================= SCROLL REVEAL ================= */

const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                sectionObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});

/* ================= ACTIVE NAV LINK ================= */

const allSections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    allSections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});

/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

