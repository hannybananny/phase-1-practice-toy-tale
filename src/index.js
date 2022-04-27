let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysArr => toysArr.forEach(toy => renderToy(toy)))
  }

  function renderToy(toy){
    let toyCard = document.createElement('div')
    toyCard.classList.add('card')
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}">
      <p>${toy.likes} ' likes'<p>
      <button class="like-btn" id"${toy.id}">Like ❤️</button>
      </div>
    `
    toyFormContainer.appendChild(toyCard)
  }


getToys()
});
