window.onload = mountComboBox

let count = 0

let cmbPokemon = document.getElementById('cmbPokemon')
cmbPokemon.addEventListener('change', showCard)

let btnAdd = document.getElementById('btnAdd')

function loadPokemon(pokemon) {
  const url = "https://pokeapi.co/api/v2/pokemon/"
  const param1 = "?limit=1000"
  let param2 = pokemon

  let params = 
    pokemon ? 
      param2.toLowerCase() 
    : param1

  let x =
    fetch(`${url}${params}`,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
    })
    .then((res) => res.json())
    .then(data => {
      return(data)
    })

    return x
}

async function mountComboBox() {
  let data = await loadPokemon()
  console.log(data)
  let pokeArray = data.results.sort((a, b) => {
    if(a.name < b.name) { 
      return -1 
    }
    if(a.name > b.name) { 
      return 1 
    }
    return 0
  })

  let html = ''

  for (let i = 0; i < pokeArray.length; i++){
    html += `
      <option value="${i}">
        ${captalizeText(
          pokeArray[i].name)
        }
      </option>
    `
  }

  cmbPokemon.innerHTML = `
    <option value="0">
      Selecione um pokemon
    </option>
    ${html}
  `
}

function captalizeText(text) {
  return (
    text
      .charAt(0)
        .toUpperCase() 
          + text.slice(1)
  )
}

async function showCard() {
  let card = document.getElementById("card")
  let cmbPokemon = document.getElementById('cmbPokemon')
  let pokemon = cmbPokemon.options[cmbPokemon.selectedIndex].text

  let data = await loadPokemon(pokemon)

  console.log(data)

  let name = document.getElementById('name')
  let type = document.getElementById('type')
  let weight = document.getElementById('weight')
  let hp = document.getElementById('hp')
  let atk = document.getElementById('atk')
  let def = document.getElementById('def')
  let special = document.getElementById('special')
  let image = document.getElementById('image')

  let abl1 = document.getElementById('abl1')
  let abl2 = document.getElementById('abl2')

  let check1 = document.getElementById('check1')
  let check2 = document.getElementById('check2')

  let isHidden1
  let isHidden2

  card.style.display = "flex"

  name.textContent = captalizeText(data.name)
  type.textContent = captalizeText(data.types[0].type.name)
  weight.textContent = data.weight

  let arr = [hp, atk, def, special]

  for (a in arr) {
    arr[a].textContent = data.stats[a].base_stat
  }

  image.src = data.sprites.other.dream_world.front_default
  circleColor(data.types[0].type.name)

  abl1.textContent = data.abilities[0].ability.name
  isHidden1 = data.abilities[0].is_hidden

  isHidden1 ? check1.checked = false : check1.checked = true
  check1.disabled = true

  abl2.textContent = data.abilities[1].ability.name
  isHidden2 = data.abilities[1].is_hidden

  isHidden2 ? check2.checked = false : check2.checked = true
  check2.disabled = true
}

function circleColor(type){

  let hex = getHex(type)

  let circle = document.querySelector('.circle')
  circle.style.background = `${hex}`
}

function getHex(type) {

  const colors = [
    {type: "normal", hex: "#B7B7A9"},
    {type: "fire", hex: "#FF6144"},
    {type: "water", hex: "#39f"},
    {type: "eletric", hex: "#fc3"},
    {type: "grass", hex: "#7c5"},
    {type: "ice", hex: "#6cf"},
    {type: "fighting", hex: "#b54"},
    {type: "poison", hex: "#a59"},
    {type: "ground", hex: "#db5"},
    {type: "flying", hex: "#89f"},
    {type: "psychic", hex: "#f59"},
    {type: "bug", hex: "#ab2"},
    {type: "rock", hex: "#ba6"},
    {type: "ghost", hex: "#66b"},
    {type: "dragon", hex: "#76e"},
    {type: "dark", hex: "#754"},
    {type: "steel", hex: "#aab"},
    {type: "fairy", hex: "#e9e"},
  ]

  let x = colors.filter(h => h.type == type)
  return x[0].hex
}

async function addToPokedex(pokemon){
  count = count + 1

  let pokeList = document.getElementById('pokeList')
  let name = pokemon
              .parentNode
                .parentNode
                  .children
                    .name
                      .textContent

  let data = await loadPokemon(name)
  let image = data
                  .sprites
                    .other
                      .dream_world.front_default

  if (count >= 3){
    btnAdd.disabled = true
  }else{
    btnAdd.disabled = false
  }

  let div = document.createElement('div')
  div.id = data.id
  div.className = "box"
  div.style = `
    margin: 20px; 
    height: 240px
  `
  
  let div2 = document.createElement('div2')
  div2.className = "image"

  let ul = document.createElement('ul')
  let li = document.createElement('li')
  let span = document.createElement('span')
  let span2 = document.createElement('span')
  let span3 = document.createElement('span')

  let img = document.createElement('img')
  img.src = data
                .sprites
                  .other
                    .dream_world.
                      front_default

  let button = document.createElement('button')
  button.id = "btnClose"
  button.className = `
    delete 
    is-medium 
    has-background-primary
  `

  button.onclick = ((x) => {
    let pokemon = x
              .target
                .parentNode
                  .parentNode
                    .parentNode
                      .parentNode
    pokemon.style.display = "none"
    count = count - 1

    if (count >= 3){
      btnAdd.disabled = true
    }else{
      btnAdd.disabled = false
    }
  })

  span2.textContent = captalizeText(data.name)
  span3.className = "close-icon"

  li.style.position = "relative"

  div.appendChild(ul)
  ul.appendChild(li)
  li.appendChild(span)
  span.appendChild(div2)
  div2.appendChild(img)
  li.appendChild(span2)
  li.appendChild(span3)
  span3.appendChild(button)

  pokeList.appendChild(div)
}