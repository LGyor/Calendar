
/********************* HAMBURGER MENU ******************** */
let hamburger = document.getElementsByClassName("hamburger");

hamburger[0].addEventListener("click", () =>{
 if (document.getElementsByTagName("nav")[0].style.left === "0px"){
	 
	 document.getElementsByTagName("nav")[0].style.left = "-54%";	
	 hamburger[0].classList.toggle("close");
 }else{
	 document.getElementsByTagName("nav")[0].style.left = "0px";
    hamburger[0].classList.toggle("close");	 
 }	
});

/********************* CALENDAR ******************** */
let monthsOfName = ["Január", "Február", "Március", "Április", "Május", "Június", "Július",
 "Augusztus", "Szeptember", "Október", "November", "December"];
 
let daysOfName = ["Vasárnap", "Hétfő", "Kedd", "Szerda","Csütörtök", "Péntek", "Szombat" ];
let NumberOfDays = [ 7, 1, 2, 3, 4, 5, 6];

let dateNow = new Date();
let year = dateNow.getFullYear();
let month = dateNow.getMonth();
let day = dateNow.getDate();
let weekOfDay = dateNow.getDay();

let currDate = new Date(year, month, 1);
let firstDayOfMonth = currDate.getDay();

let newTrainig ={
  id: "",  
  year: 0,
  month: 0,
  day: 0,
  weekOfDay : "",
  arrCounter : -1 
};

let collectTraining = [];
/* console.log(year+"."+monthsOfName[month]+"."+id.innerHTML+" "+daysOfName[weekOfDay]+" --- "+id.id);*/

const backdrop = document.getElementById("backdrop");
const addModal = document.getElementById("add-modal");

const getUserInput = addModal.querySelectorAll("select");
const getOption = addModal.querySelectorAll("option");
const message = document.getElementsByTagName("textarea");
const buttonSave = document.getElementById("btn_save");
const buttonDelete = document.getElementById("btn_delete");

function drawCalendar(year, month, day, weekOfDay, firstDayOfMonth){
	let counter = 0;
	let emptyTds ="";

	//console.log(weekOfDay + " ----- "  +currDate.getDay());

	// write the empty cells
	for (let j=0; j!=(NumberOfDays[firstDayOfMonth]-1); j++){
		emptyTds=emptyTds+"<td class='td_empty'></td>";
		counter++;
	}
	let days = "<tr>" + emptyTds;
	
   //Determing if February (28,or 29)
   let FebNumberOfDays =" ";
	if (month == 1){
		if ( (year%100!=0) && (year%4==0) || (year%400==0)){
			FebNumberOfDays = "29";
		}else{
			FebNumberOfDays = "28";
		}
	}	
	let dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];	

	// write number of days	 
	for (let i = 1; i <= +dayPerMonth[month]; i++ ){
		if (counter === 7){
		  counter = 0;
		 days = days + "</tr><tr>";	  
		} 

	   if (day === i){
			days = days + "<td class='today'>"+ i +"</td>";	   
	   }else{
			days = days + "<td>"+ i +"</td>";
	   }	
		counter++;
	}

	days = days + "</tr>";	 


	/*     Header of the calendar with date    */
	let calendarHeader = "<tr> <th colspan='7'>" + 
		 "<button onclick='changeMonth(this)' class='btn btn_left'><<</button>" +
		year + " " + monthsOfName[month] +
		" " + day + ". "+ daysOfName[weekOfDay] +
		 "<button onclick='changeMonth(this)' class='btn btn_right' >>></button>" +	"</th></tr>";
	/*     Days    */	
	let calendarDayOfNames ="<tr class='dayNames'>  <th>H</th>  <th>K</th> <th>Sz</th>"+
			"<th>Cs</th> <th>P</th> <th>Sz</th> <th>V</th> </tr>";	

	/* Body of the calendar*/ 
	let calendarBody = "<table>" + calendarHeader + calendarDayOfNames + days + "</table>";
	 
	document.getElementById("calendar").innerHTML=calendarBody;
};//drawCalendar

drawCalendar(year, month, day, weekOfDay, firstDayOfMonth);

/* Choose a date  */

function addId (){
const tdElement = document.getElementsByTagName("td");
let i=tdElement.length;
let numOfDay =1;
console.log("Number of TD elements: " + i);

for (let i=0; i<tdElement.length; i++ ){
    if (tdElement[i].innerHTML != ""){
       tdElement[i].onclick = function() {showModalWindow(this)}; 
	  	  tdElement[i].setAttribute("id", "day"+numOfDay); // add ID to current element
	     numOfDay++;
    }
}
}; //addId
addId();

/* Change Month*/
const changeMonth =(id) =>{
 if (id.classList[1]==="btn_right"){
      
		if (month === 11){
	     year++;
	     month = 0;
      }else{
	     month++;  
      }
      		
		let dateNext = new Date(year, month, day); 
	   weekOfDay = dateNext.getDay();	
	   
		currDate = new Date(year, month, 1);
	   firstDayOfMonth = currDate.getDay();
	   
		console.log(year + "." + monthsOfName[month] + "." + day); 
	   drawCalendar(year, month, day, weekOfDay, firstDayOfMonth);
		addId();	
	
 }	 
 if (id.classList[1]==="btn_left"){
    
		if (month === 0){
	     year--;
	     month = 11;
      }else{
	     month--;  
      }
      		
		let dateNext = new Date(year, month, day); 
	   weekOfDay = dateNext.getDay();	
	   
		currDate = new Date(year, month, 1);
	   firstDayOfMonth = currDate.getDay();
	   
		console.log(year + "." + monthsOfName[month] + "." + day); 
	   drawCalendar(year, month, day, weekOfDay, firstDayOfMonth);
		addId();
 }
};//changeMonth




function findReservedDay(id){
  let counter = 0;
  for (const trainings of collectTraining){
		if (trainings.id === id){
		  return [false, counter];
		}
		counter++;
  }	
  return [true] ;		
};


function showModalWindow (id){
  let dateOfTraining = new Date(year, month, +id.innerHTML); 
  weekOfDay = dateOfTraining.getDay();
  const modal_header = document.getElementById("modal_header");   
  getUserInput[0].value="";
  getUserInput[1].value="";
  getUserInput[2].value="";
  getUserInput[3].value="";
  message[0].value="";  

 const ReservedDay = findReservedDay(id.id);

 if (ReservedDay[0]){
	 backdrop.classList.add("visible");	
	 addModal.classList.add("visible");  
	 modal_header.innerHTML = year+" "+monthsOfName[month]+" "+id.innerHTML+"."+" "+daysOfName[weekOfDay];
	 console.log("Modal: "+year+"."+monthsOfName[month]+"."+id.innerHTML+" "+daysOfName[weekOfDay]+" --- "+id.id);
	 newTrainig.id = id.id;
	 newTrainig.year = year; 
	 newTrainig.month = monthsOfName[month];
	 newTrainig.day = id.innerHTML;  
	 newTrainig.weekOfDay = daysOfName[weekOfDay]; 
    newTrainig.arrCounter = -1; 	 
 } else{
	console.log("ID: " +collectTraining[ReservedDay[1]].id); 
	console.log("Year: " +collectTraining[ReservedDay[1]].year); 
	console.log("Month: " +collectTraining[ReservedDay[1]].month); 
	console.log("Day: " +collectTraining[ReservedDay[1]].day); 
	console.log("weekday: " +collectTraining[ReservedDay[1]].weekOfDay); 
	console.log("Array counter: " + ReservedDay[1]); 	
	console.log("********************************"); 
   backdrop.classList.add("visible");	
	addModal.classList.add("visible");	
	modal_header.innerHTML = collectTraining[ReservedDay[1]].year+" "+collectTraining[ReservedDay[1]].month+" "+collectTraining[ReservedDay[1]].day+" "+collectTraining[ReservedDay[1]].weekOfDay;	
  getUserInput[0].value=collectTraining[ReservedDay[1]].place;	
  getUserInput[1].value=collectTraining[ReservedDay[1]].beginHour;
  getUserInput[2].value=collectTraining[ReservedDay[1]].beginMinute;
  getUserInput[3].value=collectTraining[ReservedDay[1]].maxPerson;
  message[0].value=collectTraining[ReservedDay[1]].message;	
  
  newTrainig.id = collectTraining[ReservedDay[1]].id;
  newTrainig.year = +collectTraining[ReservedDay[1]].year; 
  newTrainig.month = +collectTraining[ReservedDay[1]].month;
  newTrainig.day = +collectTraining[ReservedDay[1]].day;  
  newTrainig.weekOfDay = +collectTraining[ReservedDay[1]].weekOfDay; 
  newTrainig.arrCounter = ReservedDay[1];
 } 

};//showModalWindow

const closeMovieModal = () =>{
  backdrop.classList.remove("visible");	
  addModal.classList.remove("visible"); 

};//closeMovieModal
const removeData = ()=>{
  getUserInput[0].value="";
  getUserInput[1].value="";
  getUserInput[2].value="";
  getUserInput[3].value="";
  
  message[0].value="";	
};//removeData

const saveData = () =>{
  const trainingDay = document.getElementById(newTrainig.id);
  const trainingDetails ={
	 id: newTrainig.id,
    year: newTrainig.year,
    month: newTrainig.month,
	 day: +newTrainig.day,
	 weekOfDay: newTrainig.weekOfDay,
	 place: getUserInput[0].value,
	 beginHour: getUserInput[1].value,
	 beginMinute: getUserInput[2].value,
	 maxPerson: getUserInput[3].value,
	 message: message[0].value 
  };

  if (newTrainig.arrCounter === -1){
    trainingDay.classList.add("actTraining");
    collectTraining.push(trainingDetails); 
	
    console.log("New data: ");
    console.log(collectTraining);	
  }else{
    collectTraining[newTrainig.arrCounter].place = trainingDetails.place;	
    collectTraining[newTrainig.arrCounter].beginHour = trainingDetails.beginHour;
    collectTraining[newTrainig.arrCounter].beginMinute = trainingDetails.beginMinute;
    collectTraining[newTrainig.arrCounter].maxPerson = trainingDetails.maxPerson;
    collectTraining[newTrainig.arrCounter].message = trainingDetails.message;
	
    console.log("Array counter: " + newTrainig.arrCounter + " Edited data: "); 	
    console.log(collectTraining); 
  }  
  closeMovieModal();
  removeData();
}; //saveData

const deleteData = () =>{
  const trainingDay = document.getElementById(newTrainig.id);	
  //alert(newTrainig.id+" ****** "+newTrainig.arrCounter);
  
  if (newTrainig.arrCounter === -1){
    closeMovieModal();
    removeData();	  
  }else{
	collectTraining.splice(newTrainig.arrCounter, 1);
   console.log(collectTraining); 
   trainingDay.classList.remove("actTraining");
   closeMovieModal();
   removeData();	   
  }  
  
	
}//deleteData

backdrop.addEventListener("click", closeMovieModal);
buttonSave.addEventListener("click", saveData);
buttonDelete.addEventListener("click", deleteData);



