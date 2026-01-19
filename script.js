
// ===============================
// 1. DATA CONFIGURATION
// ===============================
const fruits = [
  // { id: 101, name: "Royal Apple", price: 120, unit: "kg", type: "weight", img: "./royal_apple.png" ,available: false},
  { id: 102, name: "Mango", price: 40, unit: "250g", type: "weight", img: "./mango.png" ,available: false},
  { id: 103, name: "Banana", price: 35, unit: "half doz", type: "weight", img: "./banana.png" ,available: true},
  { id: 104, name: "Grapes", price: 60, unit: "250g", type: "weight", img: "./grapes.png" ,available: true},
  { id: 105, name: "Chiku", price: 40, unit: "250g", type: "weight", img: "./chiku.png" ,available: true},
  { id: 106, name: "Guava", price: 35, unit: "250g", type: "weight", img: "./guava.png" ,available: true},
  { id: 107, name: "Imported Apple", price: 190, unit: "500g", type: "weight", img: "./imported_apple.png" ,available: true},
  // { id: 108, name: "Kashmiri Big Apple", price: 70, unit: "250g", type: "weight", img: "./shimla_ba.png" ,available: true},
  { id: 109, name: "Kashmiri Small Apple", price: 40, unit: "250g", type: "weight", img: "./shimla_sa.png" ,available: true},
  { id: 110, name: "Kinnor(Kinnu)", price: 30, unit: "250g", type: "weight", img: "./orange.png" ,available: true},
  { id: 112, name: "Pears", price: 160, unit: "500g", type: "weight", img: "./pear.png" ,available: true},
  { id: 113, name: "Strawberry", price: 150, unit: "per box", type: "weight", img: "./strawberry.png" ,available: true},
  { id: 114, name: "Pomegranate", price:115 , unit: "500g", type: "weight", img: "./pomegranate.png" ,available: true},
  { id: 115, name: "Black Grapes", price: 80, unit: "250g", type: "weight", img: "./black_grapes.png" ,available: true},
  { id: 116, name: "Orange", price: 65, unit: "500g", type: "weight", img: "./orange.png" , available: true},
  { id: 117, name: "Musambi", price: 65, unit: "500g", type: "weight", img: "./musambi.png" , available: true},

  { id: 201, name: "Dragon Fruit", price: 129, unit: "pc", type: "piece", img: "./dragon.png" , available: true},
  { id: 202, name: "Kiwi", price: 45, unit: "pc", type: "piece", img: "./kiwi.png" , available: true},
  { id: 204, name: "Papaya", price: 80, unit: "pc", type: "piece", img: "./papaya.png" ,available: true},
  { id: 203, name: "Banana", price: 6, unit: "pc", type: "piece", img: "./banana.png" , available: true},
  // { id: 204, name: "Coconut Water", price: 60, unit: "pc", type: "piece", img: "./coconut.png" , available: true},
  { id: 205, name: "Mango", price: 25, unit: "pc", type: "piece", img: "./mango.png" , available: false},
  { id: 206, name: "Watermelon", price: 90, unit: "pc", type: "piece", img: "./watermelon.png" , available: true},
  // { id: 207, name: "Guava", price: 20, unit: "pc", type: "piece", img: "./guava.png" , available: true},
  // { id: 208, name: "Plum", price: 30, unit: "pc", type: "piece", img: "./plum.png" , available: false},
  // { id: 209, name: "Pomegranate", price: 30, unit: "pc", type: "piece", img: "./pomegranate.png" , available: true},
  { id: 210, name: "Pineapple", price: 90, unit: "pc", type: "piece", img: "./pineapple.png" , available: true},
  // { id: 212, name: "Pear", price: 30, unit: "pc", type: "piece", img: "./pear.png" , available: true},
  // { id: 215, name: "Kashmiri Big Apple", price: 30, unit: "pc", type: "piece", img: "./shimla_ba.png" , available: true},
  // { id: 216, name: "Imported Apple", price: 30, unit: "pc", type: "piece", img: "./imported_apple.png" , available: true},
];

const combos = [
  { 
    id: "exotic", 
    name: "Exotic Escape", 
    price: 329, 
    unit: "pack", 
    img: "./exotic.png",
    contents: ["1 Dragon Fruit", "2 Kiwis", "1 Avocado"],
    available: true,
  },
  { 
    id: "essential", 
    name: "Daily Essentials", 
    price: 119, 
    unit: "pack", 
    img: "./essential.png",
    contents: ["2 Bananas", "2 Apples", "1 Orange"],
    available: true,
  },
  { 
    id: "gym", 
    name: "Gym Freak", 
    price: 99, 
    unit: "pack", 
    img: "./gym.png",
    contents: ["1 Mosambi", "1 Guava", "2 Bananas","1 Orange"],
    available: true,
  }
];

let cart = {};
let deliveryCharge = 0;
let finalTotalAmount = 0;

// ===============================
// 2. INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const deliveryDateInput = document.getElementById("deliveryDate");

if (deliveryDateInput) {
    // --- CONFIGURATION ---
    const launchDate = "2026-01-21"; 
    const now = new Date();
    const currentHour = now.getHours();
    
    // 1. Format Today's Date String
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // 2. 4 PM Cutoff Logic
    // If it is 4 PM (16:00) or later, the earliest delivery is tomorrow
    let earliestPossible = todayStr;
    if (currentHour >= 16) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      earliestPossible = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    }

    // 3. Apply Launch Date (Earliest selection is Jan 21)
    const minSelectable = earliestPossible < launchDate ? launchDate : earliestPossible;
    deliveryDateInput.min = minSelectable;

    // 4. Logic to toggle the message text
    const msgPara = document.getElementById("sameDayMsg");
    
    if (msgPara) {
      function checkDate() {
        const selected = deliveryDateInput.value;
        if (!selected) {
          msgPara.style.display = "none";
          return;
        }

        msgPara.style.display = "block";
        
        if (selected === todayStr) {
          // This only happens if they order BEFORE 4 PM on or after launch day
          msgPara.innerHTML = "✅ Order placed before 4 PM: Your fruits will be delivered <strong>today</strong> (6 PM - 8 PM).";
          msgPara.style.color = "#FFEB3B"; 
        } else {
          msgPara.innerHTML = "ℹ️ Order Policy: Orders placed after 4 PM are delivered the next day. Your selected slot is confirmed.";
          msgPara.style.color = "#fff";
        }
      }

      deliveryDateInput.addEventListener("change", checkDate);
      checkDate(); // Run once on load
    }
  }


  renderGrid();
  initLeafRain();
  initPaymentHandlers();
  initTreeEvolution();
  setupFormSubmission();
});

// ===============================
// 3. UI RENDERING
// ===============================
function renderGrid() {
  const weightContainer = document.getElementById("fruitContainerWeight");
  const pieceContainer  = document.getElementById("fruitContainerPiece");
  const comboContainer  = document.getElementById("comboContainer");

  fruits.forEach(fruit => {
    (fruit.type === "weight" ? weightContainer : pieceContainer)
      ?.insertAdjacentHTML("beforeend", createCard(fruit));
  });

  combos.forEach(combo => {
    comboContainer?.insertAdjacentHTML("beforeend", createCard(combo, true));
  });
}

function createCard(item, isCombo = false) {
  // 1. Check availability (default to true if property is missing)
  const isAvailable = item.hasOwnProperty('available') ? item.available : true;

  // 2. Generate Combo details (same as before)
  const comboListHtml = isCombo && item.contents 
    ? `<div class="combo-details">
        ${item.contents.map(content => `<span>• ${content}</span>`).join('')}
       </div>` 
    : "";

  // 3. Determine the Footer (Buttons OR Unavailable Message)
  let actionHtml = '';
  
  if (isAvailable) {
    // Render standard +/- buttons
    actionHtml = `
      <div class="qty-pill">
        <button onclick="updateCart('${item.id}', -1)" type="button">-</button>
        <span id="qty-${item.id}">0</span>
        <button onclick="updateCart('${item.id}', 1)" type="button">+</button>
      </div>`;
  } else {
    // Render "Not Available" badge
    actionHtml = `
      <div class="out-of-stock-badge">
        Currently Unavailable
      </div>`;
  }

  // 4. Return the card with a dynamic class 'unavailable-card' if needed
  return `
    <div class="item-card ${isCombo ? "combo-card" : ""} ${!isAvailable ? "unavailable-card" : ""}">
      <div class="img-box">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="item-name">${item.name}</div>
      <div class="item-price">
        ₹${item.price}
        <span class="item-unit"> / ${item.unit}</span>
      </div>
      
      ${comboListHtml} 
      ${actionHtml}
    </div>
  `;
}

// ===============================
// 4. CART LOGIC
// ===============================
function updateCart(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) qtyEl.innerText = cart[id];
  updateDock();
}

function updateDock() {
  let itemsTotal = 0;
  let totalItems = 0;

  [...fruits, ...combos].forEach(item => {
    if (cart[item.id]) {
      itemsTotal += item.price * cart[item.id];
      totalItems += cart[item.id];
    }
  });

  if (itemsTotal === 0) deliveryCharge = 0;
  else if (itemsTotal < 200) deliveryCharge = 20;
  else if (itemsTotal <= 350) deliveryCharge = 15;
  else deliveryCharge = 0;

  finalTotalAmount = itemsTotal + deliveryCharge;

  const priceEl = document.getElementById("totalPrice");
  const countEl = document.getElementById("itemCount");
  const dockEl  = document.getElementById("dock");

  if (priceEl)
    priceEl.innerText =
      `₹${finalTotalAmount} ${deliveryCharge ? `(+₹${deliveryCharge} del)` : ""}`;

  if (countEl) countEl.innerText = `${totalItems} Items`;
  if (dockEl) dockEl.classList.toggle("active", totalItems > 0);

  // Delivery Hint Logic
  if (dockEl) {
    let hint = document.getElementById("deliveryHint");
    if (!hint) {
      hint = document.createElement("div");
      hint.id = "deliveryHint";
      dockEl.appendChild(hint);
    }

    if (itemsTotal > 0 && itemsTotal < 200)
      hint.innerText = `Add ₹${200 - itemsTotal} more to reduce delivery`;
    else if (itemsTotal > 0 && itemsTotal <= 350)
      hint.innerText = `Add ₹${350 - itemsTotal} more to get FREE delivery`;
    else if (itemsTotal > 350)
      hint.innerText = `🎉 Free delivery unlocked`;
    else 
      hint.innerText = "";
  }
}

// ===============================
// 5. TREE EVOLUTION (Visuals)
// ===============================
function initTreeEvolution() {
  const tree = document.getElementById("evo-tree");
  const msg  = document.getElementById("tree-msg");
  if (!tree || !msg) return;

  const sections = [
    { el: document.querySelector(".split-hero"), stages: [0, 1] },
    { el: document.querySelector(".menu-section"), stages: [2, 3, 4, 5] },
    { el: document.querySelector(".delivery-instructions"), stages: [6, 7] },
    { el: document.querySelector(".contact-footer"), stages: [8, 9] }
  ];

  const stageText = [
    "Seed planted 🌱",
    "Roots forming",
    "First sprout",
    "Sapling growing",
    "Branches spreading",
    "Leaves flourishing",
    "Healthy tree",
    "Fruit forming",
    "Harvest ready 🍎",
    "Nature complete 🌳"
  ];

  function updateTree() {
    const viewport = window.innerHeight;
    let activeStage = 0;

    for (const section of sections) {
      if (!section.el) continue;

      const rect = section.el.getBoundingClientRect();
      const visible = Math.min(Math.max(viewport - rect.top, 0), rect.height);

      if (visible > rect.height * 0.25) {
        const progress = Math.min(visible / rect.height, 1);
        const index =
          section.stages[0] +
          Math.floor(progress * section.stages.length);

        activeStage = Math.min(index, section.stages.at(-1));
      }
    }

    tree.src = `tree_${activeStage + 1}.png`;
    msg.innerText = stageText[activeStage];

    const glow = 10 + activeStage * 3;
    tree.style.filter =
      `drop-shadow(0 0 ${glow}px rgba(96,108,56,0.6))`;
  }

  window.addEventListener("scroll", updateTree);
  window.addEventListener("resize", updateTree);
  updateTree();
}

// ===============================
// 6. FALLING LEAVES (Visuals)
// ===============================
function initLeafRain() {
  const fruits = ["🍎", "🍊", "🍌", "🍉", "🍇", "🥝"];

  for (let i = 0; i < 8; i++) {
    const fruit = document.createElement("div");
    fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];

    fruit.style.position = "fixed";
    fruit.style.top = "-40px";
    fruit.style.left = Math.random() * window.innerWidth + "px";
    fruit.style.fontSize = 18 + Math.random() * 14 + "px";
    fruit.style.opacity = 0.85;
    fruit.style.pointerEvents = "none";
    fruit.style.zIndex = "9999";

    document.body.appendChild(fruit);

    let y = -40;
    let speed = 0.6 + Math.random() * 1.8;
    let drift = Math.random() * 2 - 1;

    setInterval(() => {
      y += speed;
      fruit.style.top = y + "px";
      fruit.style.left = parseFloat(fruit.style.left) + drift + "px";

      if (y > window.innerHeight + 50) {
        y = -40;
        fruit.textContent =
          fruits[Math.floor(Math.random() * fruits.length)];
        fruit.style.left = Math.random() * window.innerWidth + "px";
        speed = 0.6 + Math.random() * 1.8;
        drift = Math.random() * 2 - 1;
      }
    }, 16);
  }
}
// ===============================
// 7. MODAL & THEME
// ===============================
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function openModal() {
  // Validate Header Inputs before opening modal
  const requiredIds = ["name", "phone", "hall", "deliveryDate"];
  let isValid = true;
  
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      el.style.border = "2px solid red";
      isValid = false;
    } else {
      el.style.border = "none";
    }
  });

  if (!isValid) {
    alert("⚠️ Please fill all details in the top form first.");
    document.querySelector('.split-hero').scrollIntoView({behavior: 'smooth'});
    return;
  }

  // Update Bill Summary in Modal
  const billBox = document.getElementById("billSummary");
  if (billBox) {
    billBox.innerHTML = `Total to Pay: <span style="font-size:1.2rem; color:#b08968;">₹${finalTotalAmount}</span>`;
  }

  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

// ===============================
// 8. PAYMENT & SUBMISSION HANDLERS
// ===============================
function initPaymentHandlers() {
  const fileInput = document.getElementById("paymentFile");
  const nameBox = document.getElementById("paymentFileName");
  const nameText = document.getElementById("fileNameText");

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        nameText.textContent = fileInput.files[0].name;
        nameBox.style.display = "block";
      }
    });
  }
}

function setupFormSubmission() {
  const form = document.getElementById("orderForm");
  
  form.addEventListener("submit", (e) => {
    // 1. Prepare Cart Data string
    const namedCart = {};
    [...fruits, ...combos].forEach(item => {
      if (cart[item.id]) {
        namedCart[item.name] = `${cart[item.id]} ${item.unit}`;
      }
    });

    if (Object.keys(namedCart).length === 0) {
      e.preventDefault();
      alert("Cart is empty!");
      return;
    }

    // 2. Populate Hidden Inputs
    document.getElementById("cartField").value = JSON.stringify(namedCart, null, 2);
    document.getElementById("finalAmountField").value = `₹${finalTotalAmount}`;
    
    // Copy instructions from textarea (outside form) to hidden input (inside form)
    const instructions = document.getElementById("deliveryInstructions").value;
    document.getElementById("hiddenInstructions").value = instructions;

    // 3. Show Loading State on Button
    const btn = document.getElementById("placeOrderBtn");
    btn.classList.add("loading");
    btn.innerText = "Sending...";
    
    // Form submits naturally to FormSubmit.co
  });
}





