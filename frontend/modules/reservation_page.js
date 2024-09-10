import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
 try {
  const url = config.backendEndpoint + "/reservations/";
  const response = await fetch(url);
  const data = await response.json();
  return data;
 } catch (error) {
  return null;
}
 }

  // Place holder for functionality to work in the Stubs
  

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  console.log(reservations,'reservations');
  const reservationTableParentElement = document.getElementById("reservation-table-parent");

  const reservationTableElement = document.getElementById("reservation-table");
  

  const noreservationBannerElement = document.getElementById("no-reservation-banner");

  if(reservations.length > 0){
    noreservationBannerElement.style.display = "none";
    reservationTableParentElement.style.display = "block";
  }
  else{
    noreservationBannerElement.style.display = "block";
    reservationTableParentElement.style.display = "none";
  }

 

  reservations.forEach( reservation => {
    const {adventureName ,date ,id, name, person, price, time, adventure} = reservation;
    const tableRowElement = document.createElement("tr");
    

     // Formatting date

  const formattedDate = new Date(date);
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const dateText = formattedDate.toLocaleDateString("en-IN", options);
  console.log(dateText);

  // Formatting time
  const formattedTime = new Date(time);
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const timeText = formattedTime.toLocaleTimeString("en-IN", timeOptions);
  
  const options2 = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateText2 = formattedTime.toLocaleDateString("en-IN", options2);
  
  const dateTimeText = `${dateText2}, ${timeText}`;
  
  console.log(dateTimeText); // Output: "4 November 2020, 9:32:31 pm"
  



    tableRowElement.innerHTML=`
    <th>${id}</th>
    <td>${name}</td>
    <td>${adventureName}</td>
    <td>${person}</td>
    <td>${dateText}</td>
    <td>${price}</td>
    <td>${dateTimeText}</td>
    <td>
    <div class="reservation-visit-button" id="${id}">
      <a href="../detail/?adventure=${adventure}">Visit Adventure</a>
    </div>
    </td>
    `;
    reservationTableElement.append(tableRowElement);
    
  });

}

export { fetchReservations, addReservationToTable };
