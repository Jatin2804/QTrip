import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try {
    let params = new URLSearchParams(search);
    let adventureId = params.get("adventure");
    console.log(adventureId);
    return adventureId;
  }
  catch {
    return null;
  }


}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
  catch {
    return null;

  }

}

//Implementation of DOM manipulation to add adventure details to DOM
//function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  // const { id, name, content, images = [], subtitle } = adventure;

  // const adventureNameElement = document.getElementById("adventure-name");
  // const adventureContentElement = document.getElementById("adventure-content");
  // const adventureSubtitleElement = document.getElementById("adventure-subtitle");

  //  const photoGalleryElement = document.getElementById("photo-gallery");

  // adventureNameElement.textContent = name;
  // adventureContentElement.textContent = content;
  // adventureSubtitleElement.textContent = subtitle;
  // adventure.images.map((image)=>{
  //   let ele = document.createElement("div");
  //   ele.innerHTML = `<img src='${image}' class='activity-card-image' alt='Info'>`
  //   document.getElementById("photo-gallery").appendChild(ele)
  // })


  // images.forEach(image => {
  //   const imageContainer = document.createElement("div");
  //   imageContainer.className = "col-lg-8 w-100"

  //   imageContainer.innerHTML = `
  //   <img
  //   src = ${image}
  //   alt = "image"
  //   class = "activity-card-image w-100"
  //   />`
  //   photoGalleryElement.append(imageContainer);

  // })

//}

function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  const { id, name, content, images = [], subtitle } = adventure;

  document.getElementById("adventure-name").append(name);
  document.getElementById("adventure-subtitle").append(subtitle);
  images.map((image)=>{
    let ele = document.createElement("div");
    ele.innerHTML = `<img src='${image}' class='activity-card-image' alt='Info'>`
    document.getElementById("photo-gallery").appendChild(ele)
  })
  document.getElementById("adventure-content").append(content);
}


//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <div class="carousel-indicators" id="button-section">
  
  </div>
  <div class="carousel-inner" id = "image-section" >
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`;

  images.forEach((key, index) => {
    let divElement = document.createElement("div");
    divElement.setAttribute("class", `carousel-item ${index === 0 ? "active" : ""}`);
    divElement.innerHTML = `
    <img src=${key} class="activity-card-image pb-3"/>
  `;
    document.getElementById("image-section").appendChild(divElement);
  });

  images.forEach((key, index) => {
    let divElement = document.createElement("button");
    divElement.setAttribute("class", `${index === 0 ? "active" : ""}`);
    divElement.type = "button";
    divElement.dataset.bsTarget = "#carouselExampleIndicators";
    divElement.dataset.bsSlideTo = index;
   
    document.getElementById("button-section").appendChild(divElement);
  });
  //  const carouseInnerContainer = document.getElementById("carousel-inner-container");


  //  images.forEach((image,index)=>{
  //   const divContainers = document.createElement("div");
  //     divContainers.className = `carousel-item  ${index == 0 ? 'active' : ''}`

  //     divContainers.innerHTML = `
  //     <img
  //     src = ${image}
  //     alt = "image"
  //     class = "activity-card-image w-100"
  //     />`
  //     carouseInnerContainer.append(divContainers);

  //  })
  //  const photoGalleryElement = document.getElementById("photo-gallery");
  //  photoGalleryElement.innerHTML = outerBody;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const {available,costPerHead} = adventure;

  const reservationPersonCostElement = document.getElementById("reservation-person-cost");
  reservationPersonCostElement.textContent = costPerHead;

  const reservationPanelAvailableElement  = document.getElementById("reservation-panel-available");
  const reservationPanelSoldoutElement = document.getElementById("reservation-panel-sold-out");

  if(available){
    reservationPanelAvailableElement.style.display = "block";
    reservationPanelSoldoutElement.style.display = "none";
  }
  else{
    reservationPanelAvailableElement.style.display = "none";
    reservationPanelSoldoutElement.style.display = "block";
  
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead} = adventure;
  const totalCost = Number(costPerHead)* Number(persons);
  const resevationCost = document.getElementById("reservation-cost");
  resevationCost.textContent = totalCost;

}
 
//Implementation of reservation form submission
function captureFormSubmit(adve) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
    try {
      const formElement = document.getElementById("myForm");
  
      formElement.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const name = formElement.elements["name"].value;
        const date = formElement.elements["date"].value;
        const person = formElement.elements["person"].value;
        const adventure = adve.id;
  
        const payload = {
          name,
          date,
          person,
          adventure,
        };
  
        const url = config.backendEndpoint + "/reservations/new"
  
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        })
      const data = await response.json();
       return;
      })
    } catch (error) {
      console.error("Error capturing form submission:", error);
    }
  }
  


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const {reserved} = adventure;
  const reservedBannerElement = document.getElementById("reserved-banner")
  if(reserved){
    reservedBannerElement.style.display ="block";
  }
  else{
    reservedBannerElement.style.display ="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
