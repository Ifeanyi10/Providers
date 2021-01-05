 //insomnia trial 1 gender
 function getTrial1Gender(elementName) {
    var genderInfo = document.forms['formInsomnia'].elements[elementName];
    var gender = ""; 

    for (i = 0; i < genderInfo.length; i++) {    
        if(genderInfo[i].checked == true){        
            gender =  genderInfo[i].value;               
        } 
    }
    return gender;
}

function fillAllFields(){
    var bt = document.getElementById('btnTrial1');
    var fName = $("#patFName").val();
    var lName = $("#patLName").val();
    var ag = $("#patAge").val();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17){
            bt.disabled = false;
            $("#ageError").html("");
        }else{
            $("#ageError").html("Please ensure patient is up to 18 years");
        }
        
    } else {
        bt.disabled = true;
    }
}

function fillAllFields2(){
    var bt = document.getElementById('btnTrial2');
    var fName = $("#pat2FName").val();
    var lName = $("#pat2LName").val();
    var ag = $("#pat2Age").val();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17){
            bt.disabled = false;
            $("#ageError2").html("");
        }else{
            $("#ageError2").html("Please ensure patient is up to 18 years");
        }
    } else {
        bt.disabled = true;
    }
}

function fillBasicMedicationFields(){
    var bt = document.getElementById('btnMedication');
    var ds2 = document.getElementById('dosage2');
    var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var dose = $("#dosage").val();
    var duration = $("#inputDuration").val();
    
    if (meds != '' && dose != '')  {
        ds2.disabled = false;
        if(med2 == '' && duration != ''){bt.disabled = false;
        }else{$('#idMedications2, #dosage2').keyup(fillBasicMedicationFields2);}
        
    } else {
        ds2.disabled = true;
        bt.disabled = true;
    }
}

function fillBasicMedicationFields2(){
    var bt = document.getElementById('btnMedication');
    bt.disabled = true;
    var meds = $("#idMedications2").val();
    var dose = $("#dosage2").val();
    var duration = $("#inputDuration2").val();
    
    if (meds != '' && dose != '' && duration != '')  {
        bt.disabled = false;
    } else {
        //alert(duration);
        bt.disabled = true;
    }
}


function checkDuration(){
    var bt = document.getElementById('btnMedication');
    var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var dose = $("#dosage").val();
    var dose2 = $("#dosage2").val();
    var duration = $("#inputDuration").val();
    var duration2 = $("#inputDuration2").val();
    
    if (meds != '' && dose != '' && duration != '')  {

        if(med2 != ''){
            if (dose2 != '' && duration2 != ''){
                bt.disabled = false;
            }else{
                bt.disabled = true;
            }
        }else{
            bt.disabled = false;
        }
        
    } else {
        bt.disabled = true;
    }
}


function getConceptID(selecteValue){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    let conceptId = 0;

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] == selecteValue){
            conceptId = i + 1;
            return conceptId;
        }       
    }
    return conceptId;
}

//Display patient details
function getPatDetatail(){
    var x = document.getElementById('duplicateScreen');
    var y = document.getElementById('printSampleRecov');
    var rowId = event.target.parentNode.parentNode.id; 
    //this gives id of tr whose button was clicked 
    // var data = document.getElementById(rowId).querySelectorAll("td");    
    // /*returns array of all elements  within the row with given id*/ 
    // var pID = data[0].innerHTML; 
    // alert("Patient ID: " + pID); 
    // let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/retrieveRefcode/'+ pID;  

    // let authToken = window.localStorage.getItem("token");
    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json', 
    //         'Accept': '*/*',
    //         'Authorization': 'Bearer '+ authToken
    //     },
    
    //     success: function(result){

    //         console.log(result);
            
    //         document.getElementById('refCodeRecov').innerHTML = result.referalCode;
    //         // document.getElementById('usName').innerHTML = result.userName;
    //         // document.getElementById('ps').innerHTML= result.password;
    //         y.style.display = 'block';         
    //         x.style.display = 'none';
            
    //     }, 
    //     error: function(msg){
    //         sweetAlert("Oops...","Unable to retrieve Ref. Code. Please try again shortly","error");
    //     }
    // });
}


$(document).ready(function () {

    var btT1 = document.getElementById('btnTrial1');
    btT1.disabled = true;
    $('#patFName, #patLName, #patAge').keyup(fillAllFields);

    var btT2 = document.getElementById('btnTrial2');
    btT2.disabled = true;
    $('#pat2FName, #pat2LName, #pat2Age').keyup(fillAllFields2);

    var btMed = document.getElementById('btnMedication');
    btMed.disabled = true;
    $('#idMedications1, #dosage').keyup(fillBasicMedicationFields);

    //Trial 1
    $('#btnTrial1').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        var email = document.getElementById("patEmail").value;
        var gender= getTrial1Gender("optradio5");

        var x = document.getElementById("screen1");
        var y = document.getElementById("printSample");
        //var z = document.getElementById("elligHead");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        let authToken = window.localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender, "email" : email, 
            "trialType" : 1, "verify": true }),
            success: function(result){

                console.log(result);

                duplicateValue = result.identicalProfiles;
                
                if(!(duplicateValue == null)){
                    var a = document.createElement('a');
                    $.each(result.identicalProfiles, function(i, def) {
                        
                        $("#duplicateTBody").append($("<tr>").attr({"id":i+ 1})
                            .append($("<td>").append(def.id))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                            .append($("<td>").append(def.age))
                            .append($("<td>").append(def.gender))
                            .append($("<td>").append(def.patientReferralEntity.date_Created))
                            .append($("<td>").append(def.tapperStartDate)))
                    });

                    dup.style.display = 'block';         
                    x.style.display = 'none';
                    //z.style.display = 'none';
                }
                else{
                    document.getElementById('refCode').innerHTML = result.referalCode;
                    window.localStorage.setItem("patientID", result.id);
                    // document.getElementById('usName').innerHTML = result.userName;
                    // document.getElementById('ps').innerHTML= result.password;
                    swal({title: "Patient Recommended Successfully!!", text: "Referral code generated. App Type: Trial 1", type: "success"},
                    function(){ 
                        //window.location.href = "provider-dashboard.html";
                        y.style.display = 'block';         
                        x.style.display = 'none';
                        //z.style.display = 'none';
                    }
                    );
                }
                
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to submit patient's record");
            }
        });
    });


    //Trial 1 Duplicate
    $('#btnIgnoreDuplicate').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        var email = document.getElementById("patEmail").value;
        var gender= getTrial1Gender("optradio5");

        var y = document.getElementById("printSample");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        let authToken = window.localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender, "email" : email, 
            "trialType" : 1, "verify": false }),
            success: function(result){

                console.log(result);
                
                document.getElementById('refCode').innerHTML = result.referalCode;
                window.localStorage.setItem("patientID", result.id);
                // document.getElementById('usName').innerHTML = result.userName;
                // document.getElementById('ps').innerHTML= result.password;
                swal({title: "Patient Recommended Successfully!!", text: "Referral code generated. App Type: Trial 1", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    dup.style.display = 'none';
                    }
                );
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer").html("Unable to submit patient's record");
            }
        });
    });


    //Trial 2
    $('#btnTrial2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        var email = document.getElementById("pat2Email").value;
        var gender= getTrial1Gender("optradio21");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen1');
        var y = document.getElementById('screen2');
        var dup = document.getElementById("duplicateScreen2");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"age": age, "email": email, "firstName": firstName, "gender": gender, "lastName": lastName,
            "trialType" : 2, "verify": true }),
            success: function(result){
                console.log(result);
                duplicateValue = result.identicalProfiles;
                
                if(!(duplicateValue == null)){
                    $.each(result.identicalProfiles, function(i, def) {
                        $("#duplicate2TBody").append($("<tr>").attr({"id":i+ 1})
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                            .append($("<td>").append(def.age))
                            .append($("<td>").append(def.gender))
                            .append($("<td>").append(def.patientReferralEntity.date_Created))
                            .append($("<td>").append(def.tapperStartDate)))
                    });
                    dup.style.display = 'block';         
                    x.style.display = 'none';
                }else{
                    window.localStorage.setItem("patientName", firstName+" "+lastName);
                    window.localStorage.setItem("patientFName", firstName);
                    window.localStorage.setItem("trial2RefCode", result.referalCode);
                    document.getElementById('refCode1').innerHTML = result.referalCode;
                    window.localStorage.setItem("patientID", result.id);
                    //document.getElementById('usName1').innerHTML = result.userName;
                    //document.getElementById('ps1').innerHTML= result.password;
                    document.getElementById('refCode2').innerHTML = result.referalCode;
                    // document.getElementById('usName2').innerHTML = result.userName;
                    // document.getElementById('ps2').innerHTML= result.password;
                    y.style.display = 'block';         
                    x.style.display = 'none';
                }
            }, 
            error: function(msg){
                $("#errorContainer2").html("Unable to submit patient's record");
            }
        });
    });


    //Trial 2 Duplicate
    $('#btnIgnoreDuplicate2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        var email = document.getElementById("pat2Email").value;
        var gender= getTrial1Gender("optradio21");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen1');
        var y = document.getElementById('screen2');
        var dup = document.getElementById("duplicateScreen2");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"age": age, "email": email, "firstName": firstName, "gender": gender, "lastName": lastName,
            "trialType" : 2, "verify": false }),
            success: function(result){
                console.log(result);
                window.localStorage.setItem("patientName", firstName+" "+lastName);
                    window.localStorage.setItem("patientFName", firstName);
                    window.localStorage.setItem("trial2RefCode", result.referalCode);
                    document.getElementById('refCode1').innerHTML = result.referalCode;
                    window.localStorage.setItem("patientID", result.id);
                    //document.getElementById('usName1').innerHTML = result.userName;
                    //document.getElementById('ps1').innerHTML= result.password;
                    document.getElementById('refCode2').innerHTML = result.referalCode;
                    // document.getElementById('usName2').innerHTML = result.userName;
                    // document.getElementById('ps2').innerHTML= result.password;
                y.style.display = 'block';         
                dup.style.display = 'none';
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer2").html("Unable to submit patient's record");
            }
        });
    });


    //Move patient to tial 1
    function revertToTrialOne(){
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/updatetrial';
        let authToken = window.localStorage.getItem("token");
        let patRefCode = window.localStorage.getItem("trial2RefCode");
        var x = document.getElementById('screen3');
        var y = document.getElementById("printSample");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"code" :  patRefCode}),
            success: function(result){
                console.log(result);
                document.getElementById('refCode').innerHTML = patRefCode;
                swal({title: "Patient moved to Trial 1!!", text: "The patient category is Trial 1", type: "success"},
                function(){ 
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    }
                );
                
                
            }, 
            error: function(msg){
                $("#errorContainer3").html("Attempt made to move patient to Trial 1 failed.");
            }
        });
    }


    // $("#patNametxt1").on('click', 'a', function(event) {
    //     event.preventDefault();
    //     alert("Patient ID: ");
    //     //getPatDetatail();
    // });


    

    //Tapering Generation
    $('#btnMedication').on('click', function(event){
        event.preventDefault();

        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable1Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = document.getElementById("idMedications1").value;
        window.localStorage.setItem("med1Store", med1);
        var dosage = document.getElementById("dosage").value;
        var duration = document.getElementById("inputDuration").value;
        var med2 = document.getElementById("idMedications2").value;
        window.localStorage.setItem("med2Store", med2);
        var dosage2 = document.getElementById("dosage2").value;
        var duration2 = document.getElementById("inputDuration2").value;
        let conceptId1 = getConceptID(med1);
        window.localStorage.setItem("conceptId1Store", conceptId1);

        
        
            let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/tapper/create';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            //alert(authToken);
            var x = document.getElementById('screen3');
            var y = document.getElementById('screen4');
            var tableBody = '#taperTBody';
            var secondTB = document.getElementById('secondTB');
            var captionName = 'drugNm';
            let floatDosage = parseFloat(dosage);
            window.localStorage.setItem("dosageStore", floatDosage);
            let intDuration = parseInt(duration);
            window.localStorage.setItem("durationStore", intDuration);

            if(med2 != ''){
                if(duration != 10 && duration2 != 10){
                    var tableBodyPrint = '#taperTBody2Print';
                    var captionNamePrint = 'drugNmP1';
                    let conceptId2 = getConceptID(med2);
                    window.localStorage.setItem("conceptId2Store", conceptId2);
                    let floatDosage2 = parseFloat(dosage2);
                    window.localStorage.setItem("dosage2Store", floatDosage2);
                    let intDuration2 = parseInt(duration2);
                    window.localStorage.setItem("duration2Store", intDuration2);
                    //var secondTB = document.getElementById('secondTB');
                    //var tableBody = '#taperTBody';
                    //var tableBodyPrint = '#taperTBody2Print';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"regimenDTOList":
                        [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "conceptID" : conceptId1
                        },
                        {
                        "sleepMedication" : med2,
                        "currentDose" : floatDosage2,
                        "medicationDuration" : intDuration2,
                        "conceptID" : conceptId2
                        }]
                        
                    }),
                        success: function(result){
                            console.log(result);
                            
                            $(result.tapaschedules).each(function(i, taper){
                                document.getElementById(captionName).innerHTML  = taper.drugName;
                                document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                                window.localStorage.setItem("taperLength", taper.taperLength);
                                //alert(taper.drugName);

                                $(taper.weeklyDose).each(function(i, def){

                                    window["td"+i+1]= document.createElement('td');
                                    window["td"+i+1].style.border = '1px solid #dddddd';
                                    window["td"+i+1].style.textAlign = 'left';
                                    window["td"+i+1].style.padding = '8px';

                                    window["td"+i+2] = document.createElement('td');
                                    window["td"+i+2].style.border = '1px solid #dddddd';
                                    window["td"+i+2].style.textAlign = 'left';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'left';
                                    window["td"+i+3].style.padding = '8px';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'left';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '150px';
                                    $(def.dose_Combination).each(function(i, drop){
                                        const option = document.createElement("option");
                                        option.value = drop;
                                        option.text = drop;
                                        selectList.appendChild(option);
                                    })

                                    $(tableBody).append($("<tr>")
                                    .append($(window["td"+i+1]).append(i + 1))
                                    .append($(window["td"+i+2]).append(def.unrounded))
                                    .append($(window["td"+i+4]).append(def.newDose))
                                    .append($(window["td"+i+3]).append(selectList)));

                                    window["tdp2"+i+1] = document.createElement('td');
                                    window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+1].style.textAlign = 'left';
                                    window["tdp2"+i+1].style.padding = '8px';

                                    window["tdp2"+i+2] = document.createElement('td');
                                    window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+2].style.textAlign = 'left';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'left';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'left';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    $(def.dose_Combination).each(function(i, dropPrint){
                                        const optionPrint = document.createElement("option");
                                        optionPrint.value = dropPrint;
                                        optionPrint.text = dropPrint;
                                        selectListPrint.appendChild(optionPrint);
                                    })

                                    $(tableBodyPrint).append($("<tr>")
                                    .append($(window["tdp2"+i+1]).append(i + 1))
                                    .append($(window["tdp2"+i+2]).append(def.unrounded))
                                    .append($(window["tdp2"+i+4]).append(def.newDose))
                                    .append($(window["tdp2"+i+3]).append(selectListPrint)));
                                });
                                tableBody = '#taperTBody2';
                                tableBodyPrint ='#taperTHead3Print';
                                captionName = 'drugNm2';
                                captionNamePrint = 'drugNmP2';
                            });


                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'block';
                            window.localStorage.setItem("medQuantity", 2);
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                            // document.getElementById('drugNm').innerHTML  = 'Chlordiazepoxide';
                            // $(tableBody).append($("<tr>")
                            // .append($("<td>").append(1))
                            // .append($("<td>").append("5 X 1"))
                            // .append($("<td>").append("")));

                            // document.getElementById('drugNm2').innerHTML  = 'Lorazepam';
                            // tableBody = '#taperTBody2';
                            // $(tableBody).append($("<tr>")
                            // .append($("<td>").append(1))
                            // .append($("<td>").append("5 X 1"))
                            // .append($("<td>").append("")));

                            // var td = document.createElement('td');
                            // td.style.border = '1px solid #dddddd';
                            // td.style.textAlign = 'left';
                            // td.style.padding = '8px';
                            // var td2 = document.createElement('td');
                            // td2.style.border = '1px solid #dddddd';
                            // td2.style.textAlign = 'left';
                            // td2.style.padding = '8px';
                            // var td6 = document.createElement('td');
                            // td6.style.border = '1px solid #dddddd';
                            // td6.style.textAlign = 'left';
                            // td6.style.padding = '8px';

                            // var tdp = document.createElement('td');
                            // tdp.style.border = '1px solid #dddddd';
                            // tdp.style.textAlign = 'left';
                            // tdp.style.padding = '8px';
                            // var tdp2 = document.createElement('td');
                            // tdp2.style.border = '1px solid #dddddd';
                            // tdp2.style.textAlign = 'left';
                            // tdp2.style.padding = '8px';
                            // var tdp6 = document.createElement('td');
                            // tdp6.style.border = '1px solid #dddddd';
                            // tdp6.style.textAlign = 'left';
                            // tdp6.style.padding = '8px';

                            // document.getElementById('drugNmP1').innerHTML  = 'Chlordiazepoxide';
                            // $(tableBodyPrint).append($("<tr>")
                            // .append($(td).append(1))
                            // .append($(td2).append("(3.75mg,5mg) X 0"))
                            // .append($(td6).append("")));

                            // document.getElementById('drugNmP2').innerHTML  = 'Lorazepam';
                            // tableBodyPrint = '#taperTBody3Print';
                            // $(tableBodyPrint).append($("<tr>")
                            // .append($(tdp).append(1))
                            // .append($(tdp2).append("5mg X 1"))
                            // .append($(tdp6).append("")));
                            
                        }
                    });
                }else{
                    revertToTrialOne();
                }
            }else{
                if(duration != 10){
                    var tableBodyPrint = '#taperTBody1Print';
                    var captionNamePrint = 'drugNmP';

                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"regimenDTOList":
                        [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "conceptID" : conceptId1
                        }]
                    }),
                        success: function(result){
                            console.log(result);
                            $(result.tapaschedules).each(function(i, taper){
                                document.getElementById(captionName).innerHTML  = taper.drugName;
                                document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                                window.localStorage.setItem("taperLength", taper.taperLength);
                                //alert(taper.drugName);

                                $(taper.weeklyDose).each(function(i, def){

                                    window["td"+i+1]= document.createElement('td');
                                    window["td"+i+1].style.border = '1px solid #dddddd';
                                    window["td"+i+1].style.textAlign = 'left';
                                    window["td"+i+1].style.padding = '8px';

                                    window["td"+i+2] = document.createElement('td');
                                    window["td"+i+2].style.border = '1px solid #dddddd';
                                    window["td"+i+2].style.textAlign = 'left';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'left';
                                    window["td"+i+3].style.padding = '8px';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'left';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '150px';
                                    $(def.dose_Combination).each(function(i, drop){
                                        const option = document.createElement("option");
                                        option.value = drop;
                                        option.text = drop;
                                        selectList.appendChild(option);
                                    })

                                    $(tableBody).append($("<tr>")
                                    .append($(window["td"+i+1]).append(i + 1))
                                    .append($(window["td"+i+2]).append(def.unrounded))
                                    .append($(window["td"+i+4]).append(def.newDose))
                                    .append($(window["td"+i+3]).append(selectList)));

                                    window["tdp2"+i+1] = document.createElement('td');
                                    window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+1].style.textAlign = 'left';
                                    window["tdp2"+i+1].style.padding = '8px';

                                    window["tdp2"+i+2] = document.createElement('td');
                                    window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+2].style.textAlign = 'left';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'left';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'left';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    $(def.dose_Combination).each(function(i, dropPrint){
                                        const optionPrint = document.createElement("option");
                                        optionPrint.value = dropPrint;
                                        optionPrint.text = dropPrint;
                                        selectListPrint.appendChild(optionPrint);
                                    })

                                    $(tableBodyPrint).append($("<tr>")
                                    .append($(window["tdp2"+i+1]).append(i + 1))
                                    .append($(window["tdp2"+i+2]).append(def.unrounded))
                                    .append($(window["tdp2"+i+2]).append(def.newDose))
                                    .append($(window["tdp2"+i+3]).append(selectListPrint)));
                                });
        
                            });


                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'none';
                            window.localStorage.setItem("medQuantity", 1);
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                        }
                    });
                }else{
                    revertToTrialOne();
                }  

            }
    });



    //Reset Tapering Generation
    $('#btnReset').on('click', function(event){
        event.preventDefault();
        
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable1Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        var med2 = window.localStorage.getItem("med2Store");
        
        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        
        
            let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/tapper/create';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            //alert(authToken);
            var x = document.getElementById('screen3');
            var y = document.getElementById('screen4');
            var tableBody = '#taperTBody';
            var secondTB = document.getElementById('secondTB');
            var captionName = 'drugNm';
            let floatDosage = window.localStorage.getItem("dosageStore");
            let intDuration = window.localStorage.getItem("durationStore");

            if(med2 != ''){
                var tableBodyPrint = '#taperTBody2Print';
                var captionNamePrint = 'drugNmP1';
                let conceptId2 = window.localStorage.getItem("conceptId2Store");
                let floatDosage2 = window.localStorage.getItem("dosage2Store");
                let intDuration2 = window.localStorage.getItem("duration2Store");
                
                //var secondTB = document.getElementById('secondTB');
                //var tableBody = '#taperTBody';
                //var tableBodyPrint = '#taperTBody2Print';
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"regimenDTOList":
                    [{
                    "sleepMedication" : med1,
                    "currentDose" : floatDosage,
                    "medicationDuration" : intDuration,
                    "conceptID" : conceptId1
                    },
                    {
                    "sleepMedication" : med2,
                    "currentDose" : floatDosage2,
                    "medicationDuration" : intDuration2,
                    "conceptID" : conceptId2
                    }]
                    
                }),
                    success: function(result){
                        console.log(result);
                        
                        $(result.tapaschedules).each(function(i, taper){
                            document.getElementById(captionName).innerHTML  = taper.drugName;
                            document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                            window.localStorage.setItem("taperLength", taper.taperLength);
                            //alert(taper.drugName);

                            $(taper.weeklyDose).each(function(i, def){

                                window["td"+i+1]= document.createElement('td');
                                window["td"+i+1].style.border = '1px solid #dddddd';
                                window["td"+i+1].style.textAlign = 'left';
                                window["td"+i+1].style.padding = '8px';

                                window["td"+i+2] = document.createElement('td');
                                window["td"+i+2].style.border = '1px solid #dddddd';
                                window["td"+i+2].style.textAlign = 'left';
                                window["td"+i+2].style.padding = '8px';

                                window["td"+i+3] = document.createElement('td');
                                window["td"+i+3].style.border = '1px solid #dddddd';
                                window["td"+i+3].style.textAlign = 'left';
                                window["td"+i+3].style.padding = '8px';

                                window["td"+i+4] = document.createElement('td');
                                window["td"+i+4].style.border = '1px solid #dddddd';
                                window["td"+i+4].style.textAlign = 'left';
                                window["td"+i+4].style.padding = '8px';

                                const selectList = document.createElement("select");
                                selectList.style.width = '150px';
                                $(def.dose_Combination).each(function(i, drop){
                                    const option = document.createElement("option");
                                    option.value = drop;
                                    option.text = drop;
                                    selectList.appendChild(option);
                                })

                                $(tableBody).append($("<tr>")
                                .append($(window["td"+i+1]).append(i + 1))
                                .append($(window["td"+i+2]).append(def.unrounded))
                                .append($(window["td"+i+4]).append(def.newDose))
                                .append($(window["td"+i+3]).append(selectList)));

                                window["tdp2"+i+1] = document.createElement('td');
                                window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                window["tdp2"+i+1].style.textAlign = 'left';
                                window["tdp2"+i+1].style.padding = '8px';

                                window["tdp2"+i+2] = document.createElement('td');
                                window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                window["tdp2"+i+2].style.textAlign = 'left';
                                window["tdp2"+i+2].style.padding = '8px';

                                window["tdp2"+i+3] = document.createElement('td');
                                window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                window["tdp2"+i+3].style.textAlign = 'left';
                                window["tdp2"+i+3].style.padding = '8px';

                                window["tdp2"+i+4] = document.createElement('td');
                                window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                window["tdp2"+i+4].style.textAlign = 'left';
                                window["tdp2"+i+4].style.padding = '8px';

                                const selectListPrint = document.createElement("select");
                                selectListPrint.style.width = '150px';
                                $(def.dose_Combination).each(function(i, dropPrint){
                                    const optionPrint = document.createElement("option");
                                    optionPrint.value = dropPrint;
                                    optionPrint.text = dropPrint;
                                    selectListPrint.appendChild(optionPrint);
                                })

                                $(tableBodyPrint).append($("<tr>")
                                .append($(window["tdp2"+i+1]).append(i + 1))
                                .append($(window["tdp2"+i+2]).append(def.unrounded))
                                .append($(window["tdp2"+i+4]).append(def.newDose))
                                .append($(window["tdp2"+i+3]).append(selectListPrint)));
                            });
                            tableBody = '#taperTBody2';
                            tableBodyPrint ='#taperTHead3Print';
                            captionName = 'drugNm2';
                            captionNamePrint = 'drugNmP2';
                        });


                        y.style.display = 'block';         
                        x.style.display = 'none';
                        secondTB.style.display = 'block';
                        window.localStorage.setItem("medQuantity", 2);
                    }, 
                    error: function(msg){
                        $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                    }
                });

            }else{
                var tableBodyPrint = '#taperTBody1Print';
                var captionNamePrint = 'drugNmP';

                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"regimenDTOList":
                    [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "conceptID" : conceptId1
                    }]
                }),
                    success: function(result){
                        console.log(result);
                        $(result.tapaschedules).each(function(i, taper){
                            document.getElementById(captionName).innerHTML  = taper.drugName;
                            document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                            window.localStorage.setItem("taperLength", taper.taperLength);
                            //alert(taper.drugName);

                            $(taper.weeklyDose).each(function(i, def){

                                window["td"+i+1]= document.createElement('td');
                                window["td"+i+1].style.border = '1px solid #dddddd';
                                window["td"+i+1].style.textAlign = 'left';
                                window["td"+i+1].style.padding = '8px';

                                window["td"+i+2] = document.createElement('td');
                                window["td"+i+2].style.border = '1px solid #dddddd';
                                window["td"+i+2].style.textAlign = 'left';
                                window["td"+i+2].style.padding = '8px';

                                window["td"+i+3] = document.createElement('td');
                                window["td"+i+3].style.border = '1px solid #dddddd';
                                window["td"+i+3].style.textAlign = 'left';
                                window["td"+i+3].style.padding = '8px';

                                window["td"+i+4] = document.createElement('td');
                                window["td"+i+4].style.border = '1px solid #dddddd';
                                window["td"+i+4].style.textAlign = 'left';
                                window["td"+i+4].style.padding = '8px';

                                const selectList = document.createElement("select");
                                selectList.style.width = '150px';
                                $(def.dose_Combination).each(function(i, drop){
                                    const option = document.createElement("option");
                                    option.value = drop;
                                    option.text = drop;
                                    selectList.appendChild(option);
                                })

                                $(tableBody).append($("<tr>")
                                .append($(window["td"+i+1]).append(i + 1))
                                .append($(window["td"+i+2]).append(def.unrounded))
                                .append($(window["td"+i+4]).append(def.newDose))
                                .append($(window["td"+i+3]).append(selectList)));

                                window["tdp2"+i+1] = document.createElement('td');
                                window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                window["tdp2"+i+1].style.textAlign = 'left';
                                window["tdp2"+i+1].style.padding = '8px';

                                window["tdp2"+i+2] = document.createElement('td');
                                window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                window["tdp2"+i+2].style.textAlign = 'left';
                                window["tdp2"+i+2].style.padding = '8px';

                                window["tdp2"+i+3] = document.createElement('td');
                                window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                window["tdp2"+i+3].style.textAlign = 'left';
                                window["tdp2"+i+3].style.padding = '8px';

                                window["tdp2"+i+4] = document.createElement('td');
                                window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                window["tdp2"+i+4].style.textAlign = 'left';
                                window["tdp2"+i+4].style.padding = '8px';

                                const selectListPrint = document.createElement("select");
                                selectListPrint.style.width = '150px';
                                $(def.dose_Combination).each(function(i, dropPrint){
                                    const optionPrint = document.createElement("option");
                                    optionPrint.value = dropPrint;
                                    optionPrint.text = dropPrint;
                                    selectListPrint.appendChild(optionPrint);
                                })

                                $(tableBodyPrint).append($("<tr>")
                                .append($(window["tdp2"+i+1]).append(i + 1))
                                .append($(window["tdp2"+i+2]).append(def.unrounded))
                                .append($(window["tdp2"+i+2]).append(def.newDose))
                                .append($(window["tdp2"+i+3]).append(selectListPrint)));
                            });
    
                        });


                        y.style.display = 'block';         
                        x.style.display = 'none';
                        secondTB.style.display = 'none';
                        window.localStorage.setItem("medQuantity", 1);
                    }, 
                    error: function(msg){
                        $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                    }
                }); 
            }
        
    });


    //Recompute Tapering Generation
    $('#btnRecompute').on('click', function(event){
        event.preventDefault();
        
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable1Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        var med2 = window.localStorage.getItem("med2Store");
        
        var tpLength = document.getElementById("tpLength").value;
        let intTpLength = parseInt(tpLength);

        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        

        
        
            let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/tapper/create';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            //alert(authToken);
            var x = document.getElementById('screen3');
            var y = document.getElementById('screen4');
            var tableBody = '#taperTBody';
            var secondTB = document.getElementById('secondTB');
            var captionName = 'drugNm';
            let floatDosage = window.localStorage.getItem("dosageStore");
            let intDuration = window.localStorage.getItem("durationStore");

            if(med2 != ''){
                var tableBodyPrint = '#taperTBody2Print';
                var captionNamePrint = 'drugNmP1';
                let conceptId2 = window.localStorage.getItem("conceptId2Store");
                let floatDosage2 = window.localStorage.getItem("dosage2Store");
                let intDuration2 = window.localStorage.getItem("duration2Store");
                
                //var secondTB = document.getElementById('secondTB');
                //var tableBody = '#taperTBody';
                //var tableBodyPrint = '#taperTBody2Print';
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"regimenDTOList":
                    [{
                    "sleepMedication" : med1,
                    "currentDose" : floatDosage,
                    "medicationDuration" : intDuration,
                    "taperLength" : intTpLength,
                    "conceptID" : conceptId1
                    },
                    {
                    "sleepMedication" : med2,
                    "currentDose" : floatDosage2,
                    "medicationDuration" : intDuration2,
                    "taperLength" : intTpLength,
                    "conceptID" : conceptId2
                    }]
                    
                }),
                    success: function(result){
                        console.log(result);
                        
                        $(result.tapaschedules).each(function(i, taper){
                            document.getElementById(captionName).innerHTML  = taper.drugName;
                            document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                            window.localStorage.setItem("taperLength", intTpLength);
                            //alert(taper.drugName);

                            $(taper.weeklyDose).each(function(i, def){

                                window["td"+i+1]= document.createElement('td');
                                window["td"+i+1].style.border = '1px solid #dddddd';
                                window["td"+i+1].style.textAlign = 'left';
                                window["td"+i+1].style.padding = '8px';

                                window["td"+i+2] = document.createElement('td');
                                window["td"+i+2].style.border = '1px solid #dddddd';
                                window["td"+i+2].style.textAlign = 'left';
                                window["td"+i+2].style.padding = '8px';

                                window["td"+i+3] = document.createElement('td');
                                window["td"+i+3].style.border = '1px solid #dddddd';
                                window["td"+i+3].style.textAlign = 'left';
                                window["td"+i+3].style.padding = '8px';

                                window["td"+i+4] = document.createElement('td');
                                window["td"+i+4].style.border = '1px solid #dddddd';
                                window["td"+i+4].style.textAlign = 'left';
                                window["td"+i+4].style.padding = '8px';

                                const selectList = document.createElement("select");
                                selectList.style.width = '150px';
                                $(def.dose_Combination).each(function(i, drop){
                                    const option = document.createElement("option");
                                    option.value = drop;
                                    option.text = drop;
                                    selectList.appendChild(option);
                                })

                                $(tableBody).append($("<tr>")
                                .append($(window["td"+i+1]).append(i + 1))
                                .append($(window["td"+i+2]).append(def.unrounded))
                                .append($(window["td"+i+4]).append(def.newDose))
                                .append($(window["td"+i+3]).append(selectList)));

                                window["tdp2"+i+1] = document.createElement('td');
                                window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                window["tdp2"+i+1].style.textAlign = 'left';
                                window["tdp2"+i+1].style.padding = '8px';

                                window["tdp2"+i+2] = document.createElement('td');
                                window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                window["tdp2"+i+2].style.textAlign = 'left';
                                window["tdp2"+i+2].style.padding = '8px';

                                window["tdp2"+i+3] = document.createElement('td');
                                window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                window["tdp2"+i+3].style.textAlign = 'left';
                                window["tdp2"+i+3].style.padding = '8px';

                                window["tdp2"+i+4] = document.createElement('td');
                                window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                window["tdp2"+i+4].style.textAlign = 'left';
                                window["tdp2"+i+4].style.padding = '8px';

                                const selectListPrint = document.createElement("select");
                                selectListPrint.style.width = '150px';
                                $(def.dose_Combination).each(function(i, dropPrint){
                                    const optionPrint = document.createElement("option");
                                    optionPrint.value = dropPrint;
                                    optionPrint.text = dropPrint;
                                    selectListPrint.appendChild(optionPrint);
                                })

                                $(tableBodyPrint).append($("<tr>")
                                .append($(window["tdp2"+i+1]).append(i + 1))
                                .append($(window["tdp2"+i+2]).append(def.unrounded))
                                .append($(window["tdp2"+i+4]).append(def.newDose))
                                .append($(window["tdp2"+i+3]).append(selectListPrint)));
                            });
                            tableBody = '#taperTBody2';
                            tableBodyPrint ='#taperTHead3Print';
                            captionName = 'drugNm2';
                            captionNamePrint = 'drugNmP2';
                        });


                        y.style.display = 'block';         
                        x.style.display = 'none';
                        secondTB.style.display = 'block';
                        window.localStorage.setItem("medQuantity", 2);
                    }, 
                    error: function(msg){
                        $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                    }
                });

            }else{
                var tableBodyPrint = '#taperTBody1Print';
                var captionNamePrint = 'drugNmP';

                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"regimenDTOList":
                    [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "taperLength" : intTpLength,
                        "conceptID" : conceptId1
                    }]
                }),
                    success: function(result){
                        console.log(result);
                        $(result.tapaschedules).each(function(i, taper){
                            document.getElementById(captionName).innerHTML  = taper.drugName;
                            document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                            window.localStorage.setItem("taperLength", intTpLength);
                            //alert(taper.drugName);

                            $(taper.weeklyDose).each(function(i, def){

                                window["td"+i+1]= document.createElement('td');
                                window["td"+i+1].style.border = '1px solid #dddddd';
                                window["td"+i+1].style.textAlign = 'left';
                                window["td"+i+1].style.padding = '8px';

                                window["td"+i+2] = document.createElement('td');
                                window["td"+i+2].style.border = '1px solid #dddddd';
                                window["td"+i+2].style.textAlign = 'left';
                                window["td"+i+2].style.padding = '8px';

                                window["td"+i+3] = document.createElement('td');
                                window["td"+i+3].style.border = '1px solid #dddddd';
                                window["td"+i+3].style.textAlign = 'left';
                                window["td"+i+3].style.padding = '8px';

                                window["td"+i+4] = document.createElement('td');
                                window["td"+i+4].style.border = '1px solid #dddddd';
                                window["td"+i+4].style.textAlign = 'left';
                                window["td"+i+4].style.padding = '8px';

                                const selectList = document.createElement("select");
                                selectList.style.width = '150px';
                                $(def.dose_Combination).each(function(i, drop){
                                    const option = document.createElement("option");
                                    option.value = drop;
                                    option.text = drop;
                                    selectList.appendChild(option);
                                })

                                $(tableBody).append($("<tr>")
                                .append($(window["td"+i+1]).append(i + 1))
                                .append($(window["td"+i+2]).append(def.unrounded))
                                .append($(window["td"+i+4]).append(def.newDose))
                                .append($(window["td"+i+3]).append(selectList)));

                                window["tdp2"+i+1] = document.createElement('td');
                                window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                window["tdp2"+i+1].style.textAlign = 'left';
                                window["tdp2"+i+1].style.padding = '8px';

                                window["tdp2"+i+2] = document.createElement('td');
                                window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                window["tdp2"+i+2].style.textAlign = 'left';
                                window["tdp2"+i+2].style.padding = '8px';

                                window["tdp2"+i+3] = document.createElement('td');
                                window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                window["tdp2"+i+3].style.textAlign = 'left';
                                window["tdp2"+i+3].style.padding = '8px';

                                window["tdp2"+i+4] = document.createElement('td');
                                window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                window["tdp2"+i+4].style.textAlign = 'left';
                                window["tdp2"+i+4].style.padding = '8px';

                                const selectListPrint = document.createElement("select");
                                selectListPrint.style.width = '150px';
                                $(def.dose_Combination).each(function(i, dropPrint){
                                    const optionPrint = document.createElement("option");
                                    optionPrint.value = dropPrint;
                                    optionPrint.text = dropPrint;
                                    selectListPrint.appendChild(optionPrint);
                                })

                                $(tableBodyPrint).append($("<tr>")
                                .append($(window["tdp2"+i+1]).append(i + 1))
                                .append($(window["tdp2"+i+2]).append(def.unrounded))
                                .append($(window["tdp2"+i+2]).append(def.newDose))
                                .append($(window["tdp2"+i+3]).append(selectListPrint)));
                            });
    
                        });


                        y.style.display = 'block';         
                        x.style.display = 'none';
                        secondTB.style.display = 'none';
                        window.localStorage.setItem("medQuantity", 1);
                    }, 
                    error: function(msg){
                        $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                    }
                }); 
            }
        
    });


    //Final Submit of Trial 2
    $('#btnSubmitTrial2').on('click', function(event){
        event.preventDefault();

        var patID = window.localStorage.getItem("patientID");
        var med1 = window.localStorage.getItem("med1Store");
        var med2 = window.localStorage.getItem("med2Store");       
        var tpLength = window.localStorage.getItem("taperLength");
        var tapperStartDate = window.localStorage.getItem("tapperStartDate");
        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        

        
        
            let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/tapper/save';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");

            let floatDosage = window.localStorage.getItem("dosageStore");
            let intDuration = window.localStorage.getItem("durationStore");

            if(med2 != ''){
                let conceptId2 = window.localStorage.getItem("conceptId2Store");
                let floatDosage2 = window.localStorage.getItem("dosage2Store");
                let intDuration2 = window.localStorage.getItem("duration2Store");

                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"patientID": patID, "regimenDTOList":
                    [{
                    "sleepMedication" : med1,
                    "currentDose" : floatDosage,
                    "medicationDuration" : intDuration,
                    "taperLength" : tpLength,
                    "tapperStartDate": tapperStartDate, 
                    "conceptID" : conceptId1
                    },
                    {
                    "sleepMedication" : med2,
                    "currentDose" : floatDosage2,
                    "medicationDuration" : intDuration2,
                    "taperLength" : tpLength,
                    "tapperStartDate": tapperStartDate, 
                    "conceptID" : conceptId2
                    }]
                    
                }),
                    success: function(result){
                        console.log(result);
                        if (result) {
                            displayPrintPreview();
                        } else{
                            $("#errorFinalContainer").html("Unable to submit final medication");
                        }
                        
                    }, 
                    error: function(msg){
                        $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                    }
                });

            }else{

                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"patientID": patID, "tapperStartDate": tapperStartDate, "regimenDTOList":
                    [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "taperLength" : tpLength,
                        "tapperStartDate": tapperStartDate, 
                        "conceptID" : conceptId1
                    }]
                }),
                    success: function(result){
                        console.log(result);
                        if (result) {
                            displayPrintPreview();
                        } else{
                            $("#errorFinalContainer").html("Unable to submit final medication");
                        }
                    }, 
                    error: function(msg){
                        $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                    }
                }); 
            }
        
    });

    function displayPrintPreview() {
        var x = document.getElementById('screen5');
        var y = document.getElementById('printAreaWithOneMed');
        var z = document.getElementById('printAreaWithTwoMed');
    
        var medicationQuantity = window.localStorage.getItem("medQuantity");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = dd + '/' + mm + '/' + yyyy;
    
        if(medicationQuantity == 1){
            document.getElementById('provName').innerHTML =  window.localStorage.getItem("providerName");
            document.getElementById('provAdd').innerHTML =  window.localStorage.getItem("providerAddress");
            document.getElementById('provPh').innerHTML =  window.localStorage.getItem("providerPhone");
            document.getElementById('patiName').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate').innerHTML =  today;
            document.getElementById('patiName3').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate3').innerHTML =  today;
            z.style.display = 'none';         
            x.style.display = 'none';
            y.style.display = 'block';
        }else if(medicationQuantity == 2){
            document.getElementById('provName2').innerHTML =  window.localStorage.getItem("providerName");
            document.getElementById('provAdd2').innerHTML =  window.localStorage.getItem("providerAddress");
            document.getElementById('provPh2').innerHTML =  window.localStorage.getItem("providerPhone");
            document.getElementById('patiName2').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate2').innerHTML = today;
            document.getElementById('patiName32').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate32').innerHTML =  today;
            z.style.display = 'block';         
            x.style.display = 'none';
            y.style.display = 'none';
        }
    
    }


 });