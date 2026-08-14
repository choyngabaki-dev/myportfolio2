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