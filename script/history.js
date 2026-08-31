function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return;
    document.getElementById("name").textContent = profile.name || "Guest";
}
loadProfile();

function loadOrder() {
    const orders =
        JSON.parse(localStorage.getItem("order")) || [];

    const container =
        document.getElementById("order");

    if (orders.length === 0) {
        container.innerHTML =
            "<p class='text-center'>Belum ada pesanan</p>";
        return;
    }

    let output = "";

    orders.forEach(order => {

        order.items.forEach(item => {

            output += `
            <div class="flex flex-row items-center gap-[30px] mb-5">
                <img class="w-[120px] h-[120px] object-cover" src="${item.img}" alt="${item.nama}">
                <div>
                    <h2 class="text-[24px] font-medium">${item.nama}</h2>
                    <p class="text-[#d1d1d1]">Jumlah: ${item.jumlah}</p>
                    <p class="text-[#d1d1d1]">Harga: Rp ${item.harga.toLocaleString("id-ID")}</p>
                    <p class="text-[#d1d1d1]">Total: Rp ${(item.harga * item.jumlah).toLocaleString("id-ID")}</p>
                    <p class="text-cyan-400">Status: ${order.status}</p>
                    <p class="text-gray-400">Tanggal: ${order.tanggal}</p>
                </div>
            </div>
            <hr class="border-gray-400 mb-4">
            `;
        });
    });
    container.innerHTML = output;
}
loadOrder();