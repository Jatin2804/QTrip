import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("Hii from init")
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const citiesResponse = await fetch(`${config.backendEndpoint}/cities`);
    if (!citiesResponse.ok) {
      throw new Error('Failed to fetch cities data');
    }
    const data = await citiesResponse.json();
    return data; 
  } catch(error) {
    // console.error(error);
    return null; // Return null to indicate failure
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //create a city tile
  // const cityTile = document.createElement("div");
  // cityTile.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4');

  // creating ancor tag
  // const tileLink = document.createElement('a');
  // tileLink.classList.add('tile-link');
  // tileLink.href = `./../pages/adventures/?city=${id}" id="${id}`;
  // tileLink.id = id;


  // //create tile body
  // const tilebody = document.createElement('div');
  // // tilebody.id = id;
  // tilebody.classList.add('tile');

  // // createing tile content
  // const tilecontent = document.createElement('div');
  // tilecontent.classList.add('tile-text', 'text-center');

  // //creating heading
  // const tileTitle = document.createElement('h5');
  // tileTitle.textContent = city;
  // //creating para
  // const tilePara = document.createElement('p');
  // tilePara.textContent = description;

  // tilecontent.append(tileTitle, tilePara);

  // //creating image
  // const tileImage = document.createElement('img');
  // tileImage.classList.add('img-responsive');
  // tileImage.src = image;
  // tileImage.alt = city;

  // tilebody.append(tilecontent, tileImage);

  // tileLink.append(tilebody);
  // cityTile.append(tileLink);

  // const row = document.getElementById('data');
  // if (row) {
  //   row.append(cityTile);
  // }
  // else {
  //   console.error("row not found");
  // }

  let ele = document.createElement("div");
  ele.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
  ele.innerHTML = `
            <a href="pages/adventures/?city=${id}" id="${id}">
 
              <div class="tile">
                <div class="tile-text text-center">
                  <h5>${city}</h5>
                  <p>${description}</p>
                </div>
                <img class="img-responsive" src="${image}" /></div>
            </a>
          `;

  document.getElementById("data").appendChild(ele);



}


export { init, fetchCities, addCityToDOM };
