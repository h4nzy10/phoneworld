function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile) return;

    document.getElementById("fullName").value = profile.name || "Guest"
    document.getElementById("phone").value = profile.phone
    document.getElementById("emailInput").value = profile.email

    document.getElementById("name").textContent = profile.name || "Guest"
    document.getElementById("name2").textContent = profile.name || "Guest"
    document.getElementById("email").textContent = profile.email
}

function saveProfile() {
    const profile = {
        name: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("emailInput").value
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    document.getElementById("name").textContent = profile.name || "Guest";
    document.getElementById("email").textContent = profile.email;

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Profil berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500
    });
}
loadProfile();