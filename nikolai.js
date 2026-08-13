/* =========================================================
   NIKOLAI MADULA — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        /* Close menu when clicking a link */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

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

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-text, .about-stats, .skill-card, .project-card, .contact-box"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* ================= PROFILE CARD PARALLAX ================= */

    const profileCard = document.querySelector(".profile-card");

    if (profileCard && window.innerWidth > 700) {

        document.addEventListener("mousemove", (event) => {

            const x = (window.innerWidth / 2 - event.clientX) / 80;
            const y = (window.innerHeight / 2 - event.clientY) / 80;

            profileCard.style.transform =
                `rotate(${4 + x * 0.15}deg)
                 translate(${x}px, ${y}px)`;

        });

    }


    /* ================= IMAGE FALLBACK ================= */

    const profileImage = document.querySelector(".profile-image");
    const imagePlaceholder = document.querySelector(".image-placeholder");

    if (profileImage && imagePlaceholder) {

        profileImage.addEventListener("error", () => {

            profileImage.style.display = "none";
            imagePlaceholder.style.display = "flex";

        });

        profileImage.addEventListener("load", () => {

            imagePlaceholder.style.display = "none";

        });

    }


    /* ================= CURRENT YEAR ================= */

    const footerText = document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.innerHTML =
            `Designed & built by Nikolai Madula © ${currentYear}`;

    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});