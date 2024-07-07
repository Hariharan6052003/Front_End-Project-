const cartIcon = document.querySelector(".follow");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click", () => {
 cart.classList.add("active");
 });

 closeCart.addEventListener("click", () => {
   cart.classList.remove("active");
  });

  if (document.readyState == "loading") {
   document.addEventListener("DOMContentLoaded", start);
 } else {
    start();
 }


   function start() {
    addEvents();
   }

    function update() {
            addEvents();
            updateTotal();
     }
     

function addEvents() {

 let cartRemove_btns = document.querySelectorAll(".cart-remove");
 console.log(cartRemove_btns);
 cartRemove_btns.forEach((btn) => {
 btn.addEventListener("click", handle_removeCartItem);
}); 

let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach((input) => {
input.addEventListener("change", handle_changeItemQuantity);
});

// Add item to cart
let addCart_btns = document.querySelectorAll(".but1");
addCart_btns.forEach((btn) => {
btn.addEventListener("click", handle_addCartItem);
});

// Buy Order
const buy_btn = document.querySelector(".buy-btn");
buy_btn.addEventListener("click", handle_buyOrder);
}

let itemsAdded = [];

function handle_addCartItem() {
let product = this.parentElement;
let title = product.querySelector(".yt").innerHTML;
let price = product.querySelector(".a1").innerHTML;
let imgSrc = product.querySelector(".prod-img").src;
console.log(title, price, imgSrc);

let newToAdd = {
title,
price,
imgSrc,
};

// handle item is already exist
if (itemsAdded.find((el) => el.title == newToAdd.title)) {
alert("This Item Is Already Exist!");
return;
} else {
itemsAdded.push(newToAdd);
}

// Add product to cart
let cartBoxElement = CartBoxComponent(title, price, imgSrc);
let newNode = document.createElement("div");
newNode.innerHTML = cartBoxElement;
const cartContent = cart.querySelector(".cart-content");
cartContent.appendChild(newNode);

update();
}

function handle_removeCartItem() {
this.closest(".cart-box").remove();
let title = this.parentElement.querySelector(".prod1-title").innerHTML;
itemsAdded = itemsAdded.filter((el) => el.title !== title);
updateTotal();
}

function handle_changeItemQuantity() {
if (isNaN(this.value) || this.value < 1) {
this.value = 1;
}
this.value = Math.floor(this.value); // to keep it integer

update();
}

function handle_buyOrder() {
if (itemsAdded.length <= 0) {
alert("There is No Order to Place Yet! \nPlease Make an Order first.");
return;
}
const cartContent = cart.querySelector(".cart-content");
cartContent.innerHTML = "";
alert("Your Order is Placed Successfully :)");
itemsAdded = [];

update();
}



function updateTotal() {
let cartBoxes = document.querySelectorAll(".cart-box");
const totalElement = cart.querySelector(".total-price");
let total = 0;
cartBoxes.forEach((cartBox) => {
let priceElement = cartBox.querySelector(".prod-price");
let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
let quantity = cartBox.querySelector(".cart-quantity").value;
total += price * quantity;
});

// keep 2 digits after the decimal point
total = total.toFixed(2);
// or you can use also
// total = Math.round(total * 100) / 100;

totalElement.innerHTML = "₹" + total;
}

function CartBoxComponent(title, price, imgSrc) {
return `
<div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
    <div class="detail-box">
        <div class="prod1-title">${title}</div>
        <div class="prod-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- REMOVE CART  -->
    <i class='bx bxs-trash cart-remove' ></i>
</div>`;
}












