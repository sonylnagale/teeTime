// var appointment = new Object();

// $("#teeTime").submit(function(event) {
// 	event.preventDefault();
// 	var appointment = ($("#teeTime").result;
// 	console.log(appointment);
// )});


// submit hutk in hs_context

$(document).ready(function () {
    var cookies = document.cookie;
	var splitc = cookies.split(";");
	var utk = [];
	for (let i = 0; i < splitc.length; i++) {
    	var c = splitc[i].split("=");
    if (c[0]==' hubspotutk'){
		utk.push(c[1]);
	};
};

var hsContext = new Object();
hsContext.hutk = utk[0];
hsContext.pageUrl = window.location.href;
hsContext.pageName = document.title;

document.querySelector("[name=hs_context]").value = JSON.stringify(hsContext);
});

// on form submit convert JS to JSON string, concatenate, and send to HubSpot

$("#teeTime").submit(function(event) {
    event.preventDefault();
    teeTime = ($("#teeTime").serializeArray());
    var comboTeeTime = '{ "fields": ' + JSON.stringify(teeTime) + '}';
    var firstName = (teeTime[0].value);
    var lastName = (teeTime[1].value);
    var email = (teeTime[2].value);
    var date = (teeTime[3].value);
    var golfers = (teeTime[4].value);
    

// send data through HubSpot Form

    $.ajax({
      type: "POST",
      url: "https://api.hsforms.com/submissions/v3/integration/submit/416460/e4a90282-b8cc-4e2f-9990-a0fc715657ad",
      contentType: "application/json",
      data: comboTeeTime,
      success: function(){
          var confirmation = `<div>
            <h1>Tee Time Confirmed!</h4>
            <p>${firstName}<p>
            <p>${lastName}</p>
            <p>${email}</p>
            <p>${date}</p>
            <p>${golfers}</p>
            </div>`;
    $("#capture").empty();
    $("#capture").append(confirmation);
      },
    });
});



//get data from HubSpot and display in a pop up modal

// $("#teeTime").submit(function(event) {
// 	event.preventDefault();
// });
