
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let city = params.get("city");
  console.log(city);
  return city;

}




//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // try {
    
  //   const response = await fetch(`${config.backend}/adventures?city=${city}`);
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch adventures');
  //   }
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching adventures:', error);
  //   return null;
  // }
  try{
    console.log(config.backendEndpoint + `/adventures/?city=${city}`)
    const data1 = await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    return data1.json();
   }
  catch{
    return null;

  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {


    // TODO: MODULE_ADVENTURES
    // 1. Populate the Adventure Cards and insert those details into the DOM
 
  //  for(let i=0;i<adventures.length;i++)
  //   {
  //     const div=document.createElement("div");
  //     div.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-3");
  //     div.innerHTML = `
  //       <a id=${adventures[i].id} href="detail/?adventure=${adventures[i].id}">
  //         <div class="card activity-card">
  //           <img src=${adventures[i].image}>
  //             <div class="category-banner">${adventures[i].category}</div>
  //             <div class="card-body col-md-12 mt-2">
  //               <div class="d-flex justify-content-between">
  //                 <p>${adventures[i].name}</p>
  //                 <p>₹${adventures[i].costPerHead}</p>
  //               </div>
  //               <div class="d-flex justify-content-between">
  //                 <p>Duration</p>
  //                 <p>${adventures[i].duration} Hours</p>
  //               </div>
  //             </div>
  //         </div>
  //       </a>`
  //     document.getElementById("data").append(div);
  //   }
    const datacontainer = document.getElementById("data");
    datacontainer.innerHTML = "";

   adventures.forEach( element => {
     const ele = document.createElement("div");
     ele.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-3");
     ele.innerHTML=`
     <a href="detail/?adventure=${element.id}" id=${element.id}>
     <div class="card activity-card">
         <img src=${element.image} class="img-responsive" alt="">
         <div class="category-banner">
             ${element.category}
         </div>
         <div class="card-body col-md-12 mt-2">
             <div class="d-flex justify-content-between">
               <p>${element.name}</p>
               <p>${element.costPerHead}</p>
             </div>
             <div class="d-flex justify-content-between">
                 <p>Duration</p>
                 <p>${element.duration}</p>
              
             </div>
         </div>
     </div>
 </a>
     `;
 datacontainer.append(ele);
    
   });
           
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(adventureList, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   return adventureList.filter( adventure =>{
    let duration = Number(adventure.duration);

    if(duration >= Number(low) && duration <= Number(high)){
      console.log(adventure.name);
      return true;
    }
    else{
      return false;
    }
   })

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(adventureList, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filterList = adventureList.filter( adventure => categoryList.includes(adventure.category));
  return filterList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(alladventures, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  console.log(alladventures,filters,'debug');
  
  if(filters["duration"].length && filters["category"].length){
  
  const duration = filters["duration"];
  const splitDuration = duration.split("-");
  const low = splitDuration[0];
  const high = splitDuration[1];
  // console.log(alladventures,low,high);

  let filterAdventureFromDuration = filterByDuration(alladventures,low,high);
  
  const categoryList = filters["category"];
  let filterAdventureFromCategory = filterByCategory(filterAdventureFromDuration,categoryList);
  return filterAdventureFromCategory;
  }
  
  else if(filters["duration"].length){
  
    const duration = filters["duration"];
  const splitDuration = duration.split("-");
  const low = splitDuration[0];
  const high = splitDuration[1];
  
  let filterAdventureFromDuration = filterByDuration(alladventures,low,high);
  return filterAdventureFromDuration;
  }
  
  else if(filters["category"].length){
    const categoryList = filters["category"];
    let filterAdventureFromCategory = filterByCategory(alladventures,categoryList);
    return filterAdventureFromCategory;
    }
  
  else{
    return alladventures;// Place holder for functionality to work in the Stubs
  }
    
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

   const stringFilter = localStorage.getItem("filters");
   return JSON.parse(stringFilter);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryFilter = filters["category"];
  categoryFilter.forEach(category =>{
    let newItem = document.createElement("div");
    newItem.className = "category-filter";
    newItem.innerHTML= `
    <div>${category}</div>
    `
    document.getElementById("category-list").append(newItem);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
