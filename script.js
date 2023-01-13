let cmbPokemon = document.getElementById('cmbPokemon')
cmbPokemon.addEventListener('change', showCard)
window.onload = mountComboBox

function loadPokemon(name) {
  const url = "https://pokeapi.co/api/v2/pokemon/"
  const param1 = "?limit=250"
  let param2 = name

  let params = 
    name ? 
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
  let e = document.getElementById('cmbPokemon')
  let name = e.options[e.selectedIndex].text
  let data = await loadPokemon(name)
  console.log(data)
}