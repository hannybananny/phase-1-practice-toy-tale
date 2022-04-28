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
  
  const toyForm = document.querySelector("form")
  toyForm.addEventListener('submit', handleSumbit)

  function handleSumbit(e){
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
  }
  addNewToy(toyObj)
  toyForm.reset()
}

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysArr => toysArr.forEach(toy => renderToy(toy)))
  }

  function renderToy(toy){
    let toyCollection = document.getElementById("toy-collection")
    let toyCard = document.createElement('div')
      toyCard.classList.add('card')
    let h2 = document.createElement('h2')
      h2.innerText = `${toy.name}`
    let toyImg = document.createElement('img')
      toyImg.classList.add('toy-avatar')
      toyImg.src = `${toy.image}`
    let p = document.createElement('p')
      p.setAttribute('id', `${toy.name}`)
      p.innerText = `${toy.likes}` + ' likes'
    let likeBtn = document.createElement('button')
      likeBtn.classList.add('like-btn')
      likeBtn.setAttribute('id', `${toy.id}`)
      likeBtn.innerText = 'Like ❤️'
    toyCard.append(h2, toyImg, p, likeBtn)
    toyCollection.appendChild(toyCard)

    let indivLikeBtn = document.getElementById(`${toy.id}`)
    indivLikeBtn.addEventListener('click', () =>{
      toy.likes+= 1
      document.getElementById(`${toy.name}`).textContent = toy.likes + ' likes'
      updateLikes(toy)
    })
  }


  function addNewToy(toyObj){
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toy => renderToy(toy))
  }

  function updateLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      
      body: JSON.stringify(toy)
    
  })

  .then(res => res.json())
  }

getToys()
});
