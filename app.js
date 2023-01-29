import { menuArray } from "./data.js";

const itemOuter = document.querySelector(".item-outer");
let menuArray1 = menuArray;
render();

const name = document.getElementById("name");
const cardNumber = document.getElementById("card-number");
const cvvNo = document.getElementById("cvv-no");
const yourOrder = document.querySelector(".your-order");
const orderItemDiv = document.querySelector(".order-items-div");
const userExperienceModal = document.querySelector(".user-experience-modal");

document.addEventListener("click", handleTrgetClick);
let isModalHidden = false;
function handleTrgetClick(e) {
  if (e.target.dataset.add) {
    addItemBtn(e.target.dataset.add);
  }

  toggleModal(e.target.id);
  if (e.target.id) {
    starIcon(e.target.dataset.star);
  }
}

setTimeout(() => {
  userExperienceModal.classList.remove("hidden");
}, 20000);
const star = document.querySelectorAll("#star");

function starIcon(id) {
  let starArr = [];
  star.forEach((el) => {
    el.classList.remove("gold");
    starArr.push(el);
  });

  starArr.splice(id, star.length);
  starArr.forEach((l) => {
    l.classList.add("gold");
  });
}

function toggleModal(id) {
  if (id == "purchase-order") {
    document.querySelector(".modal").classList.remove("hidden");
  } else if (id == "") {
    document.querySelector(".modal").classList.add("hidden");
    userExperienceModal.classList.add("hidden");
  }
}

let count = 0;
let menuArr = [];
function addItemBtn(itemId) {
  yourOrder.classList.remove("hidden");

  menuArray1.forEach((menu) => {
    if (menu.id == itemId) {
      menuArr.push(menu);

      const createList = (arr) => {
        orderItemDiv.innerHTML = "";
        arr.forEach((todo, i) => {
          let list = document.createElement("li");
          let spanWithValue = document.createElement("p");
          let spanWithBtn = document.createElement("span");
          let pPrice = document.createElement("p");
          spanWithValue.className = "item";
          spanWithBtn.className = "removeItem";
          pPrice.className = "price";
          spanWithValue.innerText = todo.name;
          spanWithBtn.innerText = "remove";
          pPrice.innerText = `$${todo.price}`;

          list.appendChild(spanWithValue);
          list.appendChild(spanWithBtn);
          list.append(pPrice);
          orderItemDiv.appendChild(list);

          spanWithBtn.addEventListener("click", () => {
            deleteTodo(i);
            count = 0;
            menuArr.forEach((el) => {
              count += el.price;
            });

            totalPrice.textContent = `$${count}`;
          });
        });
        /////////////

        //////////
        count += menu.price;
        totalPrice.textContent = `$${count}`;
      };

      totalPrice.textContent = `$${count}`;

      const deleteTodo = (index) => {
        menuArr.splice(index, 1);

        createList(menuArr);
      };

      createList(menuArr);
    }
  });

  menuArray1.forEach((mEl) => {
    let disc = 0;
    if (mEl.id == itemId) {
      if (
        menuArr.some((m) => m.name === "Hamburger") ||
        menuArr.some((m) => m.name === "Pizza")
      ) {
        if (menuArr.some((m) => m.name === "Beer")) {
          alert(`discount will be added `);
          console.log(menuArr);

          menuArr.forEach((el) => {
            disc += el.price;
            console.log(disc);
          });
          disc = disc - (15 / 100) * disc;
          console.log(disc);

          totalPrice.textContent = `$${disc}`;
        }
      } else return;
    }
  });
}
const totalPrice = document.querySelector(".total-price");

yourOrder.classList.remove("hidden");
const payOrder = document.querySelector(".pay");
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value && cardNumber.value && cvvNo.value) {
    getYourOrder();
  }
});

function getItems(items) {
  let htmlItems = "";

  items.forEach((item) => {
    ////htm-litems
    htmlItems += `<div class="item-inner">
   <img src="${item.emoji}" />
   <div class="item-text">
     <h1 class="item-name">${item.name}</h1>
     <p class="item-ingredients">${item.ingredients}</p>
     <p class="item-price">$${item.price}</p>
   </div>
   <div class="add-item" data-add="${item.id}">+</div>
 </div>
 <hr>`;
  });
  return htmlItems;
}

function render() {
  itemOuter.innerHTML = getItems(menuArray1);
}
function getYourOrder() {
  document.querySelector(".modal").classList.add("hidden");
  yourOrder.innerHTML = `<div class="order-complete">Thanks, ${name.value} ! Your order is on its way! </div>`;
}
