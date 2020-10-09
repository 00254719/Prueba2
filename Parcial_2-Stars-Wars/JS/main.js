const baseSwAPI = 'https://swapi.dev/api/';
let alldata=[];
const endPointStarShip = baseSwAPI + "starships/";

/**
 * 
 * @param {object} starships contiene al info sobre la nave a mostrar 
 */

const createShipCard = (starships) => {
    const {name, model, passengers, max_atmosphering_speed, consumables} = starships;
    let wrapper = document.createElement('div');
    wrapper.classList.add('tarjeta');
    const cardimg ="./IMG/Nave1.jpg" //Imagen por defecto
    //contenido de la tarjeta
    const card = ` 
    <img src="${cardimg}" alt="${starships.name}">
    <h4>${starships.name}</h4>
    <p>Modelo: ${starships.model}</p>
    <p>Pasajeros: ${starships.passengers}</p>
    <p>Velocidad ME: ${starships.max_atmosphering_speed}</p>
    <p>Consumibles: ${starships.consumables}</p>
    <div class="foot-view" ><a href="#">View</a></div>`;
    wrapper.innerHTML = card;
    return wrapper;
};

const parseStarShip = (starShipP) => {
    const starships = {
        name: starShipP.name,
        model: starShipP.model,
        passengers: starShipP.passengers,
        max_atmosphering_speed: starShipP.max_atmosphering_speed,
        consumables: starShipP.consumables,
    }

    return starships;
}


const createAllShips = async (array) => {

    const cardContainer = document.querySelector(".contenedor");
    cardContainer.innerHTML="";
    array.forEach(ship => {
        cardContainer.appendChild(createShipCard(ship));
});
}

/**
 * obtiene  lista de naves
 * @param {function} action callback cuando la funcion termina de obtener datos
 */
const getExploreStarship =(url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let nextdataURL= data.next;

            data.results.forEach(element => {
                alldata.push(parseStarShip(element));
            });

            if(data.next!=null){
                getExploreStarship(nextdataURL);
            }

            if(data.next===null){
                createAllShips(alldata);
            }
        })
        .catch( error => {
            console.log('Error obteniendo la lisa de starship', error);
    });
};

const App = () => {
    getExploreStarship(endPointStarShip);
};
window.onload = App;