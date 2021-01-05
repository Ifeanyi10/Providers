$(function () {
    $("#otherBox").click(function () {
        if ($(this).is(":checked")) {
            $("#otherDiv").show();
        } else {
            $("#otherDiv").hide();
        }
    });
});

function logout(){
    window.localStorage.removeItem("token");
}

function notEligibleAlert(){
    swal({title: "Oops...", text: "This patient is not ELIGIBLE!! This tool is only designed to help patients reduce and stop up to two BZRAs for insomnia.", type: "error"},
                function(){ 
                    window.location.href = "provider-dashboard.html";
                }
                );
}


function hideDispaly1() {
    var x = document.getElementById('firstQ');
    var y = document.getElementById('secondQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('prescYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';           
    } else if (document.getElementById('prescNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'block'; 
        //notEligibleAlert();
    }
}

function hideDispaly2() {
    var x = document.getElementById('secondQ1');
    var y = document.getElementById('thirdQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('forSleepYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';            
    } else if (document.getElementById('forSleepNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'block'; 
    }
}

function hideDispaly3() {
    //Trial 1 Demography
    var x = document.getElementById('thirdQ2');
    var y = document.getElementById('trial1Demo');
    var t1M = document.getElementById('t1Male');
    var t1F = document.getElementById('t1Female');
    var t1O = document.getElementById('t1Other');

    if (document.getElementById('notForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('notForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly4() {
    var x = document.getElementById('thirdQ1');
    var y = document.getElementById('fourthQ1');

    if (document.getElementById('good').checked || document.getElementById('good2').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('bad').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly5() {
    var x = document.getElementById('fourthQ1');
    var y = document.getElementById('fifthQ1');

    if (document.getElementById('willingYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('willingNo').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function hideDispaly6() {
    //Trial 2 Demography
    var x = document.getElementById('fifthQ1');
    var y = document.getElementById('trial2Demo');
    var t1M = document.getElementById('t2Male');
    var t1F = document.getElementById('t2Female');
    var t1O = document.getElementById('t2Other');

    if (document.getElementById('t2NotForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('t2NotForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function displaySreeen2() {
    var x = document.getElementById('screen1');
    var y = document.getElementById('screen2');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function prpareScreen3(dispalyValue, otherDisplayValeu, medOptions){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    var drugOptions = "<option value ="+dispalyValue+">"+dispalyValue+"</option>";

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] != dispalyValue){
            if(drugs[i] != otherDisplayValeu){
                drugOptions += "<option value ="+drugs[i]+">"+drugs[i]+"</option>";
            }
        }       
    }
    document.getElementById(medOptions).innerHTML = drugOptions;

}

function validateStartDate(){
    var bt = document.getElementById('btnStartDate');
    var stDate = $("#mdate").val();
    window.localStorage.setItem("tapperStartDate", stDate);

    if(stDate != '') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        var date1 = new Date(today);
        var date2 = new Date(stDate); 

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        if(Difference_In_Days <= 14){
            bt.disabled = false;
        }else{
            bt.disabled = true;
        }
        
    } else {
        bt.disabled = true;
    }
  }

function validateMedCheck(){
    var btnMed = document.getElementById('btnMedSelect');
    var meds = document.forms['medForm'].elements['medCAT'];
    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            btnMed.disabled = false;
            return
        }else{
            btnMed.disabled = true;
        }
    }
}

function validateLastSubmit(){
    var btnCog = document.getElementById('btnSubmitTrial2');
    var cognitive = document.getElementById('chkLast');
      
        if(cognitive.checked == true){
            btnCog.disabled = false;
            return
        }else{
            btnCog.disabled = true;
        }
}

function displaySreeen3() {
    var x = document.getElementById('screen2');
    var y = document.getElementById('screen3');
    var z = document.getElementById('med2');
    var meds = document.forms['medForm'].elements['medCAT'];
    var firstSelectedValue = ""; 
    var secondSelectedValue = "";
    var initialCount = 0;
    let drugOptions1 = "idMedications1";
    let drugOptions2 = "idMedications2";

    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  meds[i].value;
                } 
                if(initialCount == 1){
                    secondSelectedValue =  meds[i].value;
                }    
                initialCount += 1;                            
            }
        } 
    }

    if(firstSelectedValue != ""){
        prpareScreen3(firstSelectedValue, secondSelectedValue, drugOptions1)
    }
    if(secondSelectedValue != ""){
        prpareScreen3(secondSelectedValue, firstSelectedValue, drugOptions2)
        z.style.display = 'block';
    }

    y.style.display = 'block';  
    x.style.display = 'none';
}

function displaySreeen4() {
    var x = document.getElementById('screen3');
    var y = document.getElementById('screen4');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function displaySreeen5() {
    var x = document.getElementById('screen4');
    var y = document.getElementById('screen5');

    document.getElementById('pName').innerHTML =  window.localStorage.getItem("patientName");
    document.getElementById('pFirstName').innerHTML =  window.localStorage.getItem("patientFName");

        y.style.display = 'block';         
        x.style.display = 'none';
}

function goBack(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
}


$(document).ready(function () {

    //Go back to select another medication
    $('#btnGoBack').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen4');
        y.style.display = 'none';
        displaySreeen3();
    });

    //Go back to screen 2
    $('#btnBackScreen3').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen3');
        y.style.display = 'none';
        var z = document.getElementById('screen2');
        z.style.display = 'block';
    });

    //Go back to screen 1
    $('#btnBackScreen2').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen2');
        y.style.display = 'none';
        var z = document.getElementById('screen1');
        z.style.display = 'block';
    });


 });




 function PrintDiv() {  
    var divContents = document.getElementById("printdivcontent").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Health enSuite Team</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


function PrintDiv2() {  
    var divContents = document.getElementById("printOneNow").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Health enSuite Team</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 

function PrintDiv3() {  
    var divContents = document.getElementById("printTwoNow").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Health enSuite Team</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


function cancelApplication(){
    window.location.href = "provider-dashboard.html";
}


function checkMedicationLimit() {

    var meds = document.forms['medForm'].elements['medCAT'];

    var initialCount = 0;

    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  meds[i].value;
                } 
                if(initialCount == 1){
                    secondSelectedValue =  meds[i].value;
                }    
                initialCount += 1;                            
            }
        } 
    }

}


limit = 0; //set limit

checkboxes = document.forms['medForm'].elements['medCAT']; //select all checkboxes

function checker(elem) {
  if (elem.checked) { //if checked, increment counter
    limit++;
  } else {
    limit--; //else, decrement counter
  }

  for (i = 0; i < checkboxes.length; i++) { // loop through all 

    if (limit == 2) {
      if (!checkboxes[i].checked) {
        checkboxes[i].disabled = true; // and disable unchecked checkboxes

      }

    } else { //if limit is less than two

      if (!checkboxes[i].checked) {
        checkboxes[i].disabled = false; // enable unchecked checkboxes
      }

    }
  }

}

for (i = 0; i < checkboxes.length; i++) {
  checkboxes[i].onclick = function() { //call function on click and send current element as param
    checker(this);
  }
}

$('#bzra').tooltip({
    title: "BZRAs is a benzodiazepine receptor agonists and includes the benzodiazepines and Z-drugs. Patients...",
    placement: "right",
    trigger: 'hover'
})

$('#regimen').tooltip({
    title: "Some BZRAs are not easily tapered due to dosage formulation limitations. This includes...",
    placement: "right",
    trigger: 'hover'
})


$('#tipTapLength').tooltip({
    title: "Increase or decrease the total number of weeks and click 'Recompute'",
    placement: "right",
    trigger: 'hover'
})

$('#tipReset').tooltip({
    title: "Click 'Reset' to return to the original computer generated taper schedule",
    placement: "right",
    trigger: 'hover'
})
tipStartDate

$('#tipStartDate').tooltip({
    title: "This program is currently designed to support patients who are willing to start tapering within 2 weeks",
    placement: "right",
    trigger: 'hover'
})

$('#tipGoBack').tooltip({
    title: "Click Back button to adjust medication taper values",
    placement: "right",
    trigger: 'hover'
})
