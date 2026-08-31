function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile) {
        document.getElementById("name").textContent = "Guest";
        return;
    }

    document.getElementById("name").textContent = profile.name;
}
loadProfile();

function checkout() {
    const cart = JSON.parse(localStorage.getItem("checkout")) || [];
    const con = document.getElementById("checkout-cart");

    if (cart.length === 0) {
        con.innerHTML = `
            <p class="text-gray-500 italic">
                Pesan minimal 1 barang
            </p>
        `;
        document.getElementById("subtotal").innerText = "Rp. 0";
        document.getElementById("shipping").innerText = "Rp. 0";
        document.getElementById("total").innerText = "Rp. 0";
        return;
    }

    let subtotal = 0;
    let output = "";

    cart.forEach((item, index) => {
        subtotal += item.harga * item.jumlah;

        output += `
        <div class="mb-5 border-b border-white/10 pb-3.75 flex flex-row justify-between items-center pr-2">
            <div class="flex flex-col gap-1">
                <h4 class="text-[20px]">${item.nama}</h4>
                <p class="text-white">${item.jumlah} pcs</p>
                <p class="text-white">
                    Rp. ${item.harga.toLocaleString("id-ID")}
                </p>
            </div>

            <div class="cursor-pointer text-rose-500 hover:text-rose-700 transition-colors">
            </div>
        </div>
        `;
    });

    con.innerHTML = output;

    const shipping = 30000;
    const total = subtotal + shipping;

    document.getElementById("subtotal").innerText =
        `Rp. ${subtotal.toLocaleString("id-ID")}`;

    document.getElementById("shipping").innerText =
        `Rp. ${shipping.toLocaleString("id-ID")}`;

    document.getElementById("total").innerText =
        `Rp. ${total.toLocaleString("id-ID")}`;

    feather.replace();
}

checkout();

function success() {
    const checkoutItems =
        JSON.parse(localStorage.getItem("checkout")) || [];

    if (checkoutItems.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Keranjang kosong"
        });
        return;
    }

    const subtotal = checkoutItems.reduce(
        (total, item) => total + (item.harga * item.jumlah),
        0
    );

    const shipping = 30000;
    const total = subtotal + shipping;

    const orders =
        JSON.parse(localStorage.getItem("order")) || [];

    const newOrder = {
        id: Date.now(),
        tanggal: new Date().toLocaleDateString("id-ID"),
        status: "Diproses",
        total: total,
        items: checkoutItems
    };

    orders.push(newOrder);

    localStorage.setItem("order", JSON.stringify(orders));

    localStorage.removeItem("checkout");

    checkout();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Pesanan berhasil dibuat",
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        window.location.href = "../view/home.html";
    });
}