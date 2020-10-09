const baseSWApi = 'https://swapi.dev/api';
let data = {
    offset: Math.floor( Math.random()*1050) + 1,
    limit: 4,
};

/**
 * Crea la estructura html de un card con la informacion de una nave
 * Toma en cuenta si la nave forma parte de los favoritos
 * @param {Object} ship contiene info sobre la nave a mostrar 
 */
const createShipCard = (ship) => {
    let wrapper = document.createElement('div');
    wrapper.classList.add('tarjeta');
     
    const cardImg = ship.img || "./IMG/NaveBuena.jpg" // Imagen por defecto
    //contenido de la tarjeta
    const card = `<img src= "${cardImg}" alt= "${ship.name}" >
                <h4> ${ship.name} </h4>
                <p>Modelo: ${ship.model} </p>
                <p>Pasajeros: ${ship.passengers} </p>
                <p>Velocidad: ${ship.max_atmosphering_speed} </p>
                <p>Consumibles: ${ship.consumables} </p>
                <div class="foot-view" ><a href="./People.html">View</a></div>`;
            wrapper.innerHTML = card;
            return wrapper;
};
/**
 * Muestra una lista de cartas en el elemento especificado
 * rRemplazara el contenido actual por el de la lista
 * @param {array} list 
 * @param {DOMEIment} target 
 */
const showList = (list,target) => {
  list.forEach(ship => {
      target.appendChild(createShipCard(ship));
  });
}

/**
 * Obtiene una lista de naves a mostrar 
 * @param {function} action callback cuando la funcion termine de obtener los datos
 */

const getExploreShip = (action) => {
    //Obtener data de Fetch
    const endPoint = baseSWApi + `/starships?limit=${data.limit}=4&offset=${data.offset}`;
     fetch(endPoint)
         .then(response => response.json())
         .then(data => {
             action(data);
         })
         .catch(err => {
             console.log('Error obteniendo la lista para Explore', err);
         });
     };
 

    const createShip = (data) =>{
        let ship = {
            name: data.name, 
            img: "./IMG/NaveBuena.jpg",
            model: data.model,
            passengers: data.passengers,
            max_atmosphering_speed: data.max_atmosphering_speed,
            consumables: data.consumables
        }
        console.log(ship)
        return ship;
    }

    const showExplorer = async () => {
        const shipE = [];
        for(const shipMetaData of data.Explore.results) {
            const response = await fetch(shipMetaData.url);
            const data = await response.json();
            let ship = createShip(data);
            shipE.push(ship);
        };
        let dest = document.querySelector(".contenedor");
        console.log(shipE)
        showList(shipE, dest);
    };

   
    const App = () => {
        console.log('star App');
        getExploreShip ( (Explore) => {
            data.Explore = Explore;
            showExplorer();
        })
    //showList(ships, document.querySelector(".contenedor"));
};


window.onload = App;

