const contactDetailsDiv = document.getElementById("contact-details");

function toggleContactDetails() {
    contactDetailsDiv.classList.toggle("hidden");
}

function copyPhoneNumber() {
    var phoneNumber = document.getElementById("phone-number").innerText;
    navigator.clipboard.writeText(phoneNumber);
    document.getElementById("phone-number").style.color = "red";
    alert("Phone number copied to clipboard: " + phoneNumber);
}

function copyEmailAddress() {
    var emailAddress = document.getElementById("email-address").innerText;
    navigator.clipboard.writeText(emailAddress);
    document.getElementById("email-address").style.color = "red";
    alert("Email address copied to clipboard: " + emailAddress);
}