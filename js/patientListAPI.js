$(document).ready(function () {
    $("#nameSearch").keyup(populateTB);
})

function retrieveRefCode(){
    var x = document.getElementById('patientListTB');
    var y = document.getElementById('printSampleRecov');
    var rowId = event.target.parentNode.parentNode.id; 
    //this gives id of tr whose button was clicked 
    var data = document.getElementById(rowId).querySelectorAll("td");    
    /*returns array of all elements  within the row with given id*/ 
    var pID = data[0].innerHTML; 
    //alert("Patient ID: " + pID); 
    let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/retrieveRefcode/'+ pID;  

    let authToken = window.localStorage.getItem("token");
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
       
        success: function(result){

            console.log(result);
            
            document.getElementById('refCodeRecov').innerHTML = result.referalCode;
            // document.getElementById('usName').innerHTML = result.userName;
            // document.getElementById('ps').innerHTML= result.password;
            y.style.display = 'block';         
            x.style.display = 'none';
            
        }, 
        error: function(msg){
            sweetAlert("Unable to retrieve Referral Code!","Please try again shortly","error");
        }
    });

}

function PrintDivRecov() {  
    var divContents = document.getElementById("printdivcontentRecovery").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Health enSuite Team</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 

function populateTB(){
    var name = document.getElementById('nameSearch').value;
    
    let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/search/' + name;
    let authToken = window.localStorage.getItem("token");
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
        success: function(result){
            console.log(result);
            var data = result;
            $("#patTB").find("tbody").empty(); //clear all the content from tbody here.
            
            //$.each(result, function() {
                
                $(result).each(function(i, def) {
                /// do stuff
                //alert(def.firstName);
                $("#patientTBody").append($("<tr>").attr({"id":i+ 1})
                    .append($("<td>").append(def.id))
                    .append($("<td>").append(def.firstName))
                    .append($("<td>").append(def.lastName))
                    .append($("<td>").append("Trial "+def.trialType))
                    .append($("<td>").append("<input type='button' class='btn mb-1 btn-outline-light' value='Retrieve RefCode' onclick='retrieveRefCode()'/>")))
                        //console.log(def.lastName);
            });
            
            // });

        }, 
        error: function(msg){
            console.log("Loading Provider details failed");
        }
    });
}