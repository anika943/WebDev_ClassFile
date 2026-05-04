let items = [];
let currentFilter = "all";
let selectedIndex = null;

/* CLOSET OPEN / CLOSE */

function openCloset() {
  const frame = document.querySelector(".closet-frame");
  frame.classList.add("open");

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("app").style.display = "block";
  }, 1200);
}

function closeCloset() {
  const frame = document.querySelector(".closet-frame");

  document.getElementById("app").style.display = "none";
  document.getElementById("intro").style.display = "flex";

  setTimeout(() => {
    frame.classList.remove("open");
  }, 50);
}

/* 
   MODAL (UPLOAD)
*/

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function uploadItem() {
  const file = document.getElementById("fileInput").files[0];
  const category = document.getElementById("category").value;

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    items.push({
      image: e.target.result,
      category
    });

    render();
    closeModal();
  };

  reader.readAsDataURL(file);
}

/* =======================
   FILTER
======================= */

function filter(cat) {
  currentFilter = cat;
  render();
}

/* =======================
   DETAIL VIEW
======================= */

function openItem(index) {
  selectedIndex = index;

  const item = items[index];

  document.getElementById("detailImg").src = item.image;
  document.getElementById("detailCategory").innerText = item.category;

  document.getElementById("detailModal").style.display = "flex";
}

function closeItem() {
  document.getElementById("detailModal").style.display = "none";
  selectedIndex = null;
}

function deleteItem() {
  if (selectedIndex === null) return;

  items.splice(selectedIndex, 1);
  closeItem();
  render();
}

/* SHUFFLE*/

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/* RENDER */

function render() {
  const gallery = document.getElementById("gallery");
  const empty = document.getElementById("emptyState");

  gallery.innerHTML = "";

  let filtered = items
    .map((item, index) => ({ ...item, index }));

    
  // apply category filter
  filtered = filtered.filter(i =>
    currentFilter === "all" || i.category === currentFilter
  );


  // RANDOMIZE ONLY ALL
  if (currentFilter === "all") {
    filtered = shuffle(filtered);
  }

  empty.style.display = filtered.length === 0 ? "block" : "none";

  filtered.forEach(i => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `<img src="${i.image}" />`;

    div.onclick = () => openItem(i.index);

    gallery.appendChild(div);
  });
}