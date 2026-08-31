    let products = [];
    let api = "https://miiufffgfuechgznxdcj.supabase.co/rest/v1/phoneworldapi?select=*";
    async function getProduct() {
    const response = await fetch(api, {
        headers: {
        apikey: "sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
        authorization: "Bearer sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
        },
    });
    const data = await response.json();
    products = data.sort(() => 0.5 - Math.random());
    console.log(products);
    renderProducts(products);
    }

    function renderProducts(data) {
    let output = "";
    if (data.length === 0) {
        output = `<div class="col-span-full text-center text-white text-2xl mt-10">Produk tidak ditemukan</div>`;
    } else {
        data.forEach((element) => {
            output += `
                <div class="flex overflow-y-hidden flex-col items-center justify-center bg-[#393E46] pb-[25px] px-[25px] rounded-[20px] h-[440px] w-[270px] transition-all duration-200 ease-in-out cursor-pointer hover:translate-y-[-25px] active:translate-y-0" onclick="detail(${element.id})">
                    <div class="mt-[25px] flex flex-col items-center justify-between gap-[30px]">
                        <div class="h-[220px] w-[220px] object-contain rounded-[15px] flex justify-center overflow-y-hidden bg-white/5 p-2">
                        <img class="h-full object-contain" src="${element.image}" alt="">
                        </div>
                        <div class="flex flex-col gap-[10px] overflow-hidden items-start justify-center w-full">
                            <h2 class="text-[15px] font-normal text-white truncate w-full">${element.serial}</h2>
                            <p class="text-2xl font-bold overflow-y-hidden object-contain py-[2px] text-white">Rp. ${element.price.toLocaleString("id-ID")}</p>
                            <div class="flex flex-row justify-between items-center w-full text-center">
                                <p class="text-yellow-400 text-[20px] mt-[-5px] flex gap-1 items-center">&#9733; <span class="text-white text-sm mt-1">${element.rating}</span></p>
                                <p class="items-center text-[14px] text-gray-300">${element.sold} terjual</p>
                            </div>
                            <p class="overflow-y-hidden py-[2px] text-gray-400 text-sm">Tangerang</p>
                        </div>
                    </div>
                </div>
                `;
        });
    }
    document.getElementById("product").innerHTML = output;
    }
    getProduct();

function detail(id) {
  localStorage.setItem("detail", id);
  window.location.href = "detail.html";
}

function searchProduct() {
    const searchTerm = document
        .getElementById("src")
        .value
        .toLowerCase()
        .trim();

    const filteredProducts = products.filter(product =>
        product.serial.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);

    const banner = document.getElementById("banner");

    if (searchTerm === "") {
        banner.style.display = "flex";
    } else {
        banner.style.display = "none";
    }
}

function filterProducts(category) {
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => {
            const productCategory = product.category ? product.category.toLowerCase() : "";
            return productCategory === category.toLowerCase();
        });
    } else {
        filteredProducts = [...products].sort(() => 0.5 - Math.random());
    }

    renderProducts(filteredProducts);

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('border-[#00ADB5]', 'bg-[#00ADB5]');
        btn.classList.add('border-white/20', 'bg-[#393E46]');
    });

    const activeBtn = document.getElementById(`btn-${category.replace(' ', '')}`);
    if (activeBtn) {
        activeBtn.classList.remove('border-white/20', 'bg-[#393E46]');
        activeBtn.classList.add('border-[#00ADB5]', 'bg-[#00ADB5]');
    }
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return;
    document.getElementById("name").textContent = profile.name || "Guest";
}
loadProfile();