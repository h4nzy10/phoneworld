function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return;
    document.getElementById("name").textContent = profile.name || "Guest";
}

loadProfile();

function cart() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart");

    if (cartData.length === 0) {
        cartContainer.innerHTML = `
            <p class="w-[930px] bg-[#2d3440] rounded-[20px] p-[30px] mt-[10px] text-center text-[30px]">
                Keranjang masih kosong
            </p>
        `;
      return;
    }

    let output = "";
    cartData.forEach((item, index) => {
        output += `
        <div class="bg-[#2d3440] w-[930px] rounded-[20px] p-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.2)] transition-all duration-300 mt-[10px] mb-[10px] hover:translate-y-[-3px]">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center gap-[25px] h-[150px] w-[350px] rounded-md overflow-hidden">
                    <img src="${item.img}" alt="${item.nama}" class="h-[130px] w-[130px] object-cover">
                    <div class="flex flex-col gap-[10px]">
                        <h2 class="text-[20     px] font-bold">${item.nama}</h2>
                        <p class="text-white text-[17px]">IDR ${item.harga.toLocaleString("id-ID")}</p>
                        <div class="flex gap-[10px] items-center">
                            <button class="text-white text-[18px] px-[5px] cursor-pointer hover:text-[#00d9ff]" onclick="kurang(${index})">-</button>
                            <p class="text-white text-[18px] px-[5px]">${item.jumlah}</p>
                            <button class="text-white text-[18px] px-[5px] cursor-pointer hover:text-[#00d9ff]" onclick="tambah(${index})">+</button>
                            <p id="total-item" class="text-white text-[18px] pr-[100px]">Total: IDR ${(item.harga * item.jumlah).toLocaleString("id-ID")}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button class="border-none bg-rose-600 text-white py-[12px] px-[30px] rounded-[12px] cursor-pointer hover:bg-rose-700" onclick="del(${index})">Hapus</button>
                    <input type="checkbox" class="w-[20px] h-[20px]" ${item.check ? "checked" : ""} onchange="chbox(${index})">
                </div>
            </div>
        </div>
        `;
    });

    cartContainer.innerHTML = output;
}

cart();

function sum() {
    const cartData =
        JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = cartData.reduce((total, item) => {
        return item.check
            ? total + (item.harga * item.jumlah)
            : total;
    }, 0);

    const shipping = 30000;
    const total = subtotal + shipping;

    document.getElementById("subtotal").innerText =
        `IDR ${subtotal.toLocaleString("id-ID")}`;

    document.getElementById("shipping").innerText =
        `IDR ${shipping.toLocaleString("id-ID")}`;

    document.getElementById("total").innerText =
        `IDR ${total.toLocaleString("id-ID")}`;
}

sum();

function del(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    cart();
    sum();
}

function tambah(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData[index].jumlah++;
    localStorage.setItem("cart", JSON.stringify(cartData));
    cart();
    sum();
}

function kurang(index) {
    let cartData =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cartData[index].jumlah > 1) {
        cartData[index].jumlah--;
        localStorage.setItem("cart", JSON.stringify(cartData));
        cart();
        sum();
    } else {
        del(index);
    }
}

function chbox(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData[index].check = !cartData[index].check;
    localStorage.setItem("cart", JSON.stringify(cartData));
    sum();
}

function checkout() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const selectedItems = cartData.filter(item => item.check);
    if (selectedItems.length === 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Pilih minimal 1 produk",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    localStorage.setItem("checkout",JSON.stringify(selectedItems)
    );
    window.location.href = "../view/checkout.html";
}