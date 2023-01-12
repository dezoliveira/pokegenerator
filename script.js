let cmbPokemon = document.getElementById('cmbPokemon')

window.onload = loadPokemon

function loadPokemon() {
  try{
    fetch(`https://pokeapi.co/api/v2/pokemon/`,{
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
        console.log('Ocorreu um erro de api')
        return
      }
    })
    .then(data => {
      mountComboBox(data)
    })
  } catch(e) {
    logMyErrors(e)
  }
  
}

function mountComboBox(data) {
  let html = ''
  console.log(data)
  for (let i = 0; i < data.results.length; i++){
    html += `
      <option value="${i}">
        ${data.results[i].name}
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