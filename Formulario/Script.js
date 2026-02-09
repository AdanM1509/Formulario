document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const submitButton = document.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        const consent = document.getElementById("consent");
        const generalOption = document.getElementById("generalOption");
        const supportOption = document.getElementById("supportOption");

        // Reset estilos
        [firstName, lastName, email, message].forEach(el => {
            el.style.border = "1px solid #cbd5e0";
        });
        generalOption.style.border = "1px solid #cbd5e0";
        supportOption.style.border = "1px solid #cbd5e0";

        // Ocultar errores
        document.querySelectorAll(".error-message").forEach(err => {
            err.classList.remove("show");
        });

        let isValid = true;

        // Validaciones
        if (firstName.value.trim() === "") {
            firstName.style.border = "1px solid #e53e3e";
            document.getElementById("firstNameError").classList.add("show");
            isValid = false;
        }

        if (lastName.value.trim() === "") {
            lastName.style.border = "1px solid #e53e3e";
            document.getElementById("lastNameError").classList.add("show");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.style.border = "1px solid #e53e3e";
            document.getElementById("emailError").classList.add("show");
            isValid = false;
        }

        const queryTypeSelected = document.querySelector('input[name="queryType"]:checked');
        if (!queryTypeSelected) {
            generalOption.style.border = "1px solid #e53e3e";
            supportOption.style.border = "1px solid #e53e3e";
            document.getElementById("queryTypeError").classList.add("show");
            isValid = false;
        }

        if (message.value.trim() === "") {
            message.style.border = "1px solid #e53e3e";
            document.getElementById("messageError").classList.add("show");
            isValid = false;
        }

        if (!consent.checked) {
            document.getElementById("consentError").classList.add("show");
            isValid = false;
        }

        if (!isValid) return;

        // Preparar datos para PHP
        const formData = new FormData(form);

        // Estado botón
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
        submitButton.style.backgroundColor = "#138f76";

        try {
            const response = await fetch("guardar.php", {
                method: "POST",
                body: formData
            });

            const result = await response.text();

            if (result.trim() === "OK") {
                alert("Formulario enviado correctamente ✅");
                form.reset();
            } else {
                console.error("Respuesta inesperada:", result);
            }

        } catch (error) {
            console.error("Error real:", error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
            submitButton.style.backgroundColor = "#16a085";
        }
    });

    // Limpiar errores en tiempo real
    document.getElementById("firstName").addEventListener("input", () => {
        document.getElementById("firstNameError").classList.remove("show");
    });

    document.getElementById("lastName").addEventListener("input", () => {
        document.getElementById("lastNameError").classList.remove("show");
    });

    document.getElementById("email").addEventListener("input", () => {
        document.getElementById("emailError").classList.remove("show");
    });

    document.getElementById("message").addEventListener("input", () => {
        document.getElementById("messageError").classList.remove("show");
    });

    document.querySelectorAll('input[name="queryType"]').forEach(radio => {
        radio.addEventListener("change", () => {
            document.getElementById("queryTypeError").classList.remove("show");
            document.getElementById("generalOption").style.border = "1px solid #cbd5e0";
            document.getElementById("supportOption").style.border = "1px solid #cbd5e0";
        });
    });

    document.getElementById("consent").addEventListener("change", () => {
        document.getElementById("consentError").classList.remove("show");
    });

});
