//menu
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
};
// my typing
var typed = new Typed(".typing",{
    strings: ["Web Developer","logo designer","Youtuber"],
    typeSpeed:100,
    loop:true
})


//emailjs-recaptcha  connection
function showToast(message, type) {
    const toast = document.getElementById("toast");

    toast.innerHTML = message;
    toast.className = "show " + type;

    setTimeout(() => {
        toast.className = "";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("7QYDOTsf0jA8oBJL0");

    const form = document.querySelector(".contact-data");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.fullname.value.trim();
        const email = form.email.value.replace(/\s+/g, "").trim();
        const phone = form.phonenum.value.replace(/\s+/g, "").trim();
        const subject = form.emailsubject.value.trim();
        const message = form.message.value.trim();

        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
        const phonePattern = /^(?:\+94\d{9}|0\d{9})$/;

        
        if (name === "") {
            showToast("❗ Name is required", "error");
            return;
        }

        
        if (email === "") {
            showToast("❗ Email is required", "error");
            return;
        }

        if (!emailPattern.test(email)) {
            showToast("❗ Enter valid email (example@gmail.com)", "error");
            return;
        }

        
        if (phone === "") {
            showToast("❗ Phone number is required", "error");
            return;
        }

        if (!phonePattern.test(phone)) {
            showToast("❗ Enter valid phone (0771234567 or +94771234567)", "error");
            return;
        }

    
        if (subject === "") {
            showToast("❗ Subject is required", "error");
            return;
        }

        
        if (message === "") {
            showToast("❗ Message is required", "error");
            return;
        }

        if (message.length < 5) {
            showToast("❗ Message too short", "error");
            return;
        }

        
        const recaptcha = grecaptcha.getResponse();
        if (recaptcha.length === 0) {
            showToast("❗ Please verify reCAPTCHA", "error");
            return;
        }

        
        const formData = { name, email, phone, subject, message };

     emailjs.send("service_6zaeheh", "template_h11a56h", {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message
})
.then(() => {
    showToast("✅ Message sent successfully!", "success");
    form.reset();
    grecaptcha.reset();
})
.catch((error) => {
    console.log(error); 
    showToast("❌ Failed to send message!", "error");
});
    });

    
    form.phonenum.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9+]/g, "");

        if (this.value.startsWith("0") && this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }

        if (this.value.startsWith("+94") && this.value.length > 12) {
            this.value = this.value.slice(0, 12);
        }
    });

    form.email.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, "");
    });

});