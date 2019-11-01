let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector("#toy-collection")
  const newToyForm = document.querySelector('.add-toy-form')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
    .then( res => res.json())
    .then( toys => {
      toys.map(toy => renderToy(toy))
    })


  function renderToy(toy){
    const div = document.createElement('div')
    div.className = "card"

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.setAttribute("src", toy.image)

    const pTag = document.createElement('p')
    pTag.innerText = `${toy.likes} Likes`

    const btn = document.createElement('button')
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    btn.addEventListener('click', () => {

      fetch("http://localhost:3000/toys/"+toy.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "likes": ++toy.likes // "i++" increments the value but it returns the original value so you have to use "++i" so it returns the new value of i
        })
      })
      .then(res => res.json())
      .then(updatedToy => {
        p.innerText = `${updatedToy.likes} Likes` //updating the DOM after our patch update
      })
 
    })

    div.append(h2, img, p, btn)
    toyCollection.append(div)

  }

  newToyForm.addEventListener("submit", () => {
    event.preventDefault()

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": event.target[0].value,
        "image": event.target[1].value,
        "likes": 0
      }) 
    })
    .then(res => res.json())
    .then(newToy => renderToy(newToy))
  })

  event.target.reset() 
  toyForm.style.display = 'none'

})
