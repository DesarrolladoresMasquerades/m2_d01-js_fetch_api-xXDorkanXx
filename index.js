console.log("JS Loaded")

fetch("https://pokeapi.co/api/v2/pokemon")
.then(response=> response.json())
.then(buildPokedex)
.catch(console.log);

/*
function buildPokedex(pokedex){
    pokedex.results.forEach(pokemon => {
        const newH1 = document.createElement("h1");
        newH1.innerText = pokemon.name;

        const newLink = document.createElement("a");
        newLink.innerText = "Link to Pokémon";
        newLink.href = pokemon.url;

        document.body.appendChild(newH1);
        document.body.appendChild(newLink);
    });
};
*/

/*
function buildPokedex(pokedex){
    pokedex.results.forEach(pokemon => {
        const newH1 = document.createElement("h1");
        newH1.innerText = pokemon.name;

        const newLink = document.createElement("a");
        newLink.innerText = "Link to Pokémon";
        newLink.href = pokemon.url;
        
        const newImg = document.createElement("img");
        fetch(pokemon.url)
        .then((response)=> response.json())
        .then((onePokemon)=>{
            newImg.src = onePokemon.sprites.font_shiny;
            document.body.appendChild(newH1);
            document.body.appendChild(newImg);
            document.body.appendChild(newLink);
        })
    });
};
*/

function buildPokedex(pokedex){
    const pokeNames = pokedex.results.map(pokemon=>pokemon.name)
    const pokeLinks = pokedex.results.map(pokemon=>pokemon.url)
    // const pokeImg = [];
    const fetchImgPromises = pokeLinks.map(link=>
        fetch(link).then(response => response.json()))
    

    //Promise.all( you give an array of promises )  and you receive an array of data
    Promise.all(fetchImgPromises)
    .then((arrayOfPokemons)=> {
        addToDom(pokeNames, pokeLinks, arrayOfPokemons)
    })
};

function addToDom(names, links, pokemons){

    for(let i=0; i<pokemons.length; i++){
        const newH1 = document.createElement("h1");
        newH1.innerText = names[i];

        const newLink = document.createElement("a");
        newLink.innerText = "Link to Pokémon";
        newLink.href = links[i];

        const newImg = document.createElement("img");
        newImg.src = pokemons[i].sprites.front_shiny;

        document.body.appendChild(newH1);
        document.body.appendChild(newImg);
        document.body.appendChild(newLink);
    }
}