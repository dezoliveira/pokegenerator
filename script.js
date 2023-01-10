let pokemon = document.getElementById('pokemon')
let searchPokemon = document.getElementById('searchPokemon')
searchPokemon.addEventListener('click', loadPokemon)

function loadPokemon() {
  let pokemonName = ''
  if(pokemon != ''){
    pokemonName = pokemon.value.toLowerCase()
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        
    }
  })
  .then((res) => {
    if(res.status == 200){
      return res.json()
    }
    else{
      alert('pokemon não encontrado na base de dados')
      return
    }
  })
  .then(data => {
    mountPokemon(data)
  })
}

function mountPokemon(data) {
  console.log(data)
}