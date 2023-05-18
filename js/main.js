const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')

if (document.getElementById("myModal")) {
    var modal = document.getElementById("")
}

function showPokemonGen(gen){
    const pokemonGen = {
        1:[1, 151],
        2:[152,251],
        3:[252, 386]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;
    
}

let pokemonGeneration = showPokemonGen(generationshow)

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e=>{
   
    if (generationshow < 4){
        modalSearch.innerHTML = '';
        generationshow += 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Generacion ' + generationshow
        drawPokemon()
   }
})


let arrowleft = document.getElementById('arrow-left').addEventListener('click', e=>{
    
     if (generationshow > 0){
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Generacion ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
 })


const drawPokemon = async () =>{
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
		await getPokemon(i);
	}
}

const getPokemon = async (name, modal) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    console.log(pokemon)
    createPokemon(pokemon, modal);
}

const colors = {
    fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#FFFFFF'
}

const main_types = Object.keys(colors)


function  createPokemon(pokemon, modal){
    let tipos = pokemon.types.map((type) => 
        `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join('')

    const pokemonEl = document.createElement('div');
    
	pokemonEl.classList.add('pokemon');
    
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	

	if (modal !==true){
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}
            </span>
            <h3 class="name">${name}</h3>
            <small class="tipo">Tipo: <p>${tipos}</p></small>
            <smal class="tipo">Habilidades:
                <p class="habs">${pokemon.abilities[0].ability.name}</p>
                <p class="habs">${pokemon.abilities[1].ability.name}</p>
            </small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else{
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
            <div class="pokemon">
                <div class="img-container">
                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${name}" />
                </div>
                <div class="info">
                    <span class="number">#${pokemon.id
                        .toString()
                        .padStart(3, '0')}
                    </span>
                    <h3 class="name">${name}</h3>
                    <small class="tipo">Tipo: <p>${tipos}</p></small>
                    <smal class="tipo">Habilidades:
                        <p class="habs">${pokemon.abilities[0].ability.name}</p>
                        <p class="habs">${pokemon.abilities[1].ability.name}</p>
                    </small>
                </div>
            </div>    
        </div>`;
                

    modalSearch.innerHTML = pokeInnerHTML;
        
    }
}

drawPokemon()

pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal(){
   const modalPokemon = document.getElementById('modalPokemon');
   modalPokemon.style.display ='none'
   drawPokemon()
}


