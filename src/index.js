// write your code here

function loadAll() {
  fetch(`http://localhost:3000/ramens`)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((e) => {
        let ramenImage = document.createElement("img");
        ramenImage.src = e.image;
        document.getElementById("ramen-menu").appendChild(ramenImage);
        ramenImage.addEventListener("click", () => {
          fetch(`http://localhost:3000/ramens/${e.id}`)
            .then((resp) => resp.json())
            .then((data) => {
              document.querySelector("img.detail-image").src = data.image;
              document.querySelector("h2.name").textContent = data.name;
              document.querySelector("h3.restaurant").textContent = data.restaurant;
              document.querySelector("#rating-display").textContent = data.rating;
              document.querySelector("#comment-display").textContent = data.comment;
            })
        })
      }) 
    })
}

document.addEventListener("DOMContentLoaded", loadAll)

document.querySelector("form").addEventListener("submit", (f) => {
  f.preventDefault();
  let ramenObj = {
    name: document.getElementById("new-name").value,
    restaurant: document.getElementById("new-restaurant").value,
    image: document.getElementById("new-image").value,
    rating: document.getElementById("new-rating").value,
    comment: document.getElementById("new-comment").value
  }
  let ramenSettings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify(ramenObj)
  }
  fetch(`http://localhost:3000/ramens`, ramenSettings)
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById("ramen-menu").innerHTML = "";
      loadAll();
      console.log(data);
    })
})