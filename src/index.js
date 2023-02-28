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
              let editRamen = document.createElement("form");
              editRamen.id = "edit-ramen";
              editRamen.innerHTML = `
              <h4>Update the Featured Ramen</h4>
              <label for="rating">Rating: </label>
              <input type="number" name="rating" id="new-rating-two" />
              <label for="new-comment-two">Comment: </label>
              <textarea name="new-comment" id="new-comment-two"></textarea>
              <input type="submit" value="Update" />`
              document.getElementById("comment-display").appendChild(editRamen);
              editRamen.addEventListener("submit", (f) => {
                f.preventDefault();
                if (document.getElementById("new-rating-two").value !== "" && document.getElementById("new-comment-two").value !== "") {
                  let ramenEditObj = {
                    rating: document.getElementById("new-rating-two").value,
                    comment: document.getElementById("new-comment-two").value
                  }
                  let ramenEditSettings = {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      "Accepts": "application/json"
                    },
                    body: JSON.stringify(ramenEditObj)
                  }
                  fetch(`http://localhost:3000/ramens/${e.id}`, ramenEditSettings)
                    .then((resp) => resp.json())
                    .then((data) => {
                      document.getElementById("rating-display").textContent = document.getElementById("new-rating-two").value;
                      document.getElementById("comment-display").textContent = document.getElementById("new-comment-two").value;
                      console.log(data);
                    })                  
                }            
              })
              let delBtn = document.createElement("button");
              delBtn.textContent = "Delete Entry";
              document.getElementById("comment-display").appendChild(delBtn);
              delBtn.addEventListener("click", () => {
                let delConfig = {
                  method: "DELETE"
                }
                fetch(`http://localhost:3000/ramens/${e.id}`, delConfig)
                  .then((resp) => resp.json())
                  .then((data) => {
                    document.getElementById("ramen-menu").innerHTML = "";
                    initialLoad();
                    data;
                  });
              })
            })
        })
      }) 
    })
}

function initialLoad() {
  loadAll();
  fetch(`http://localhost:3000/ramens/1`)
    .then((resp) => resp.json())
    .then((data) => {
      document.querySelector("img.detail-image").src = data.image;
      document.querySelector("h2.name").textContent = data.name;
      document.querySelector("h3.restaurant").textContent = data.restaurant;
      document.querySelector("#rating-display").textContent = data.rating;
      document.querySelector("#comment-display").textContent = data.comment;      
    })
}

document.addEventListener("DOMContentLoaded", initialLoad)

document.querySelector("#new-ramen").addEventListener("submit", (f) => {
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
      document.querySelector("#new-ramen").reset();
      console.log(data);
    })
})