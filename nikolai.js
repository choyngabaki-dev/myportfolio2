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


/* =========================================================
   PREMIUM INTERACTION POLISH
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       1. SCROLL REVEAL
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        "section, .project-card, .skill-card, .profile-card, .contact-card"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal-on-scroll");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* -----------------------------------------------------
       2. ACTIVE NAVIGATION
       ----------------------------------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${currentId}`) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* -----------------------------------------------------
       3. NAVBAR SCROLL EFFECT
       ----------------------------------------------------- */

    const navbar = document.querySelector("header, .navbar, nav");

    if (navbar) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }

            },
            { passive: true }
        );

    }


    /* -----------------------------------------------------
       4. SMOOTH NAVIGATION
       ----------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("mobile-open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }

    });


    /* Close menu after clicking a navigation link */

    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("mobile-open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("mobile-open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

}