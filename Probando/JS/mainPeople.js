const baseSWApi = 'https://swapi.dev/api';
let data = {
    offset: Math.floor( Math.random()*1050) + 1,
    limit: 4,
};

/**
 * Crea la estructura html de un card con la informacion de una nave
 * Toma en cuenta si la nave forma parte de los favoritos
 * @param {Object} people contiene info sobre la nave a mostrar 
 */
const createPeopleCard = (people) => {
    let wrapper = document.createElement('div');
    wrapper.classList.add('tarjeta2');
     
    const cardImg2 = people.img || "./IMG/YodaBueno.jpg" // Imagen por defecto
    //contenido de la tarjeta
    const card = `<img src="${cardImg2}" alt= "${people.name}">
                <h4> ${people.name}</h4>
                <p>Altura: ${people.height} </p>
                <p>Peso: ${people.mass} </p>
                <p>Genero: ${people.gender} </p>
                <p>Nacimiento: ${people.birth_year} </p>
                <div class="foot-view2" >
                <button class="btn-add" type="submit">ADD</button>
                <button class="btn-rem" type="submit">RM</button>`;
            wrapper.innerHTML = card;
            return wrapper;
};
/**
 * Muestra una lista de cartas en el elemento especificado
 * rRemplazara el contenido actual por el de la lista
 * @param {array} list 
 * @param {DOMEIment} target 
 */
const showListPeople = (list,target) => {
  list.forEach(people => {
      target.appendChild(createPeopleCard(people));
  });
}

/**
 * Obtiene una lista de naves a mostrar 
 * @param {function} action callback cuando la funcion termine de obtener los datos
 */
const getExplorePeople = (action) => {
   //Obtener data de Fetch
   const endPoint = baseSWApi + `/people?limit=${data.limit}=4&offset=${data.offset}`;
    fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            action(data);
        })
        .catch(err => {
            console.log('Error obteniendo la lista para Explore', err);
        });
    };


    const createPeople = (data) =>{
        let people = {
            name: data.name, 
            img: "./IMG/YodaBueno.gif",
            height: data.height,
            mass: data.mass,
            gender: data.gender,
            birth_year: data.birth_year

    
        }
        console.log(people)
        return people;
    }

    const showPeople = async () => {
        const PeopleE = [];
        for(const PeoplepMetaData of data.People.results) {
            const response = await fetch(PeoplepMetaData.url);
            const data = await response.json();
            let people = createPeople(data);
            PeopleE.push(people);
        };
        let dest = document.querySelector(".contenedor2");
        console.log(PeopleE)
        showListPeople(PeopleE, dest);
    };


    const App = () => {
        console.log('star App');
        getExplorePeople ( (People) => {
            data.People = People;
            showPeople();
        })
    //showList(ships, document.querySelector(".contenedor"));
};

window.onload = App;