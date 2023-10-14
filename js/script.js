const tg = window.Telegram.WebApp;

const MENU = [
    {
        name:  "Kappa maki",
        about: "Огурец, семена сезама",
        price: "$3.50",
        image: "images/position_1.avif"
    },
    {
        name:  "Avocado maki",
        about: "Авокадо, семена сезама",
        price: "$4.50",
        image: "images/position_2.avif"
    },
    {
        name:  "Kappa avocado maki",
        about: "Огурец, авокадо, кремсыр, семена сезама",
        price: "$6.50",
        image: "images/position_3.avif"
    },
    {
        name:  "Unagi maki",
        about: "Креветки, семена сезама",
        price: "$6.00",
        image: "images/position_4.avif"
    }
];

const shushiDiv = document.querySelector(".sushi");

const buy = document.createElement("button");
buy.id = "buy";
buy.textContent = "Оплатить";
shushiDiv.appendChild(buy);

for (let i = 0; i < MENU.length; i++) {
    const item = document.createElement("div");
    item.className = "item";
    
    item.innerHTML = `
    <div class="text">
    <p>${MENU[i].name}</p>
    <p>${MENU[i].about}</p>
    <p>${MENU[i].price}</p>
    </div>
    <div class="image">
    <img src="${MENU[i].image}">
    </div>
    <div class="buttons">
    <button id="plus${i}">+</button>
    <p id="count${i}" class="hide" >0</p>
    <button id="minus${i}" class="hide" >-</button>
    </div>
    `;
    shushiDiv.appendChild(item);
    
    let money = document.createElement("p");
    money.classList.add("hide");
    money.textContent = "$0";
    item.appendChild(money);
    const plus = document.getElementById(`plus${i}`);
    const count = document.getElementById(`count${i}`);
    const minus = document.getElementById(`minus${i}`);
    plus.addEventListener("click", () => {
        count.classList.remove("hide");
        money.classList.remove("hide");
        minus.classList.remove("hide");
        count.textContent = +count.textContent +1;
        money.textContent = `$${+money.textContent.slice(1) + +MENU[i].price.slice(1)}`;  // 0 + "$3.50"
    });
    minus.addEventListener("click", () => {
        count.textContent = +count.textContent -1;
        money.textContent = `$${+money.textContent.slice(1) - +MENU[i].price.slice(1)}`;
        if (count.textContent <= 0) {
            money.classList.add("hide");
            count.classList.add("hide");
            minus.classList.add("hide");
        }
    });
}

buy.addEventListener("click", () => {
    const check = [];
    const items = shushiDiv.querySelectorAll(".item");
    for (let j = 0; j < items.length; j++) {
        const text = items[j].querySelector(".text");
        const buttons = items[j].querySelector(".buttons");
        const item = {
            name: text.children[0].textContent,
            price: +text.children[2].textContent.slice(1),
            count: +buttons.querySelector("p").textContent,
            last_price: +text.children[2].textContent.slice(1) * +buttons.querySelector("p").textContent
        };
        check.push(item);
    }
    const newCheck = JSON.stringify(check);
    tg.sendData(newCheck);
});
