let product = [];
let products = [];
const detailId = localStorage.getItem("detail");
const api = `https://miiufffgfuechgznxdcj.supabase.co/rest/v1/phoneworldapi?id=eq.${detailId}`;

async function data() {
  try {
    const res = await fetch(api, {
      headers: {
        apikey: "sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
        authorization: "Bearer sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
      },
    });
    const data = await res.json();
    product = data[0];
    if (!product) {
      document.getElementById("detail").innerHTML =
        "<p class='text-white'>Produk tidak ditemukan.</p>";
      return;
    }
    document.getElementById("detail").innerHTML = `
                <div class="w-[430px] h-[430px] border-[3px] border-[#3aa0ff] rounded-[10px] bg-white flex justify-center items-center p-4">
                    <img class="w-full h-full object-contain" src="${product.image}" alt="">
                </div>
                <div class="flex flex-col w-[50%] items-start">
                    <h2 class="text-[60px] font-bold mb-[10px] leading-tight">${product.serial}</h2>
                    <div class="flex items-center gap-[25px] mb-[20px]">
                        <p class="text-yellow-400 text-[20px] font-semibold flex items-center gap-2">&#9733; <span class="text-white">${product.rating}</span></p>
                        <p class="text-[18px] text-[#d1d1d1]">${product.sold} terjual</p>
                    </div>
                    <p class="text-[20px] font-medium mb-[30px]">${product.description}</p>
                    <p class="text-[58px] font-bold mb-[30px]">IDR ${product.price.toLocaleString("id-ID")}</p>
                    <div class="flex flex-row justify-between gap-[50px] items-center">
                        <button class="p-[15px] w-[250px] rounded-[10px] border-none bg-[#00ADB5] text-white text-[20px] font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-white hover:text-[#00ADB5] active:bg-[#00ADB5] active:text-white" onclick="AddToCart(${product.id})">Tambah ke keranjang</button>
                    </div>
                </div>
        `;
  } catch (error) {
    console.error("Error ambil detail produk:", error);
  }
}
data();

function AddToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let i = cart.findIndex((item) => item.id === id);

  if (i !== -1) {
    cart[i].jumlah++;
  } else {
    cart.push({
      img: product.image,
      id: product.id,
      nama: product.serial,
      harga: product.price,
      jumlah: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  alert("Berhasil menambahkan ke keranjang");
}

let api2 = "https://miiufffgfuechgznxdcj.supabase.co/rest/v1/phoneworldapi?select=*";

async function getProduct() {
  const response = await fetch(api2, {
    headers: {
      apikey: "sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
      authorization: "Bearer sb_publishable_lu0S4Bmx1q3xOdTJMFICjQ_Nwj7Pswq",
    },
  });
  const data = await response.json();
  products = data;
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  let output = "";
  shuffled.forEach((element) => {
    output += `
        <div class="flex overflow-y-hidden flex-col items-center justify-center bg-[#393E46] pb-[25px] px-[25px] rounded-[20px] h-[440px] min-w-[270px] w-[270px] transition-all duration-200 ease-in-out cursor-pointer hover:translate-y-[-25px] active:translate-y-0" onclick="goToDetail(${element.id})">
            <div class="mt-[25px] flex flex-col items-center justify-between gap-[30px] w-full">
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
  document.getElementById("output").innerHTML = output;
}
getProduct();

function goToDetail(id) {
  localStorage.setItem("detail", id);
  window.location.reload();
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return;
    document.getElementById("name").textContent = profile.name;
}
loadProfile();