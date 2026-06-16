const cards = document.querySelectorAll(".card");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const search = document.getElementById("search");

let currentIndex = 0;
let images = Array.from(cards);

const favCount = document.getElementById("favCount");
const imgCount = document.getElementById("imgCount");

imgCount.textContent = cards.length;

/* LIGHTBOX */
cards.forEach((card, index) => {
    card.addEventListener("click", (e) => {

        if (e.target.classList.contains("fav")) return;

        currentIndex = index;
        lightbox.style.display = "flex";
        lightboxImg.src = card.querySelector("img").src;
    });
});

document.getElementById("next").onclick = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    lightboxImg.src = cards[currentIndex].querySelector("img").src;
};

document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    lightboxImg.src = cards[currentIndex].querySelector("img").src;
};

document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};

/* SEARCH */
search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    cards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});

/* FILTER */
document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {

            if(filter === "all") {
                card.style.display = "block";
            }
            else if(filter === "favorites") {
                card.style.display = card.classList.contains("fav-active") ? "block" : "none";
            }
            else {
                card.style.display = card.classList.contains(filter) ? "block" : "none";
            }
        });
    });
});

/* FAVORITES */
document.querySelectorAll(".fav").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const card = btn.closest(".card");
        card.classList.toggle("fav-active");

        btn.style.color = card.classList.contains("fav-active") ? "red" : "white";

        updateFavCount();
    });
});

function updateFavCount(){
    const count = document.querySelectorAll(".fav-active").length;
    favCount.textContent = count;
}

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {

    if(lightbox.style.display === "flex") {

        if(e.key === "ArrowRight") document.getElementById("next").click();
        if(e.key === "ArrowLeft") document.getElementById("prev").click();
        if(e.key === "Escape") lightbox.style.display = "none";
    }
});