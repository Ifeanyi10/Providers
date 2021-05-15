var urlDomain = window.localStorage.getItem("urlDomain");
 
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
            $("#ageError").html("This app is for patients 18 years and older. Please confirm the age of the patient.");
            bt.disabled = true;
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
            $("#ageError2").html("This app is for patients 18 years and older. Please confirm the age of the patient.");
            bt.disabled = true;
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

function addAction(tableId){
    $(tableId).each(function(i, def) {
            var $drop = $(this).find('select');
            $drop.on("change", function(e) {
                UpdateDropDownValues(tableId);
            });
    });
}

function UpdateDropDownValues(tableId){
    var seV = [];
    let rowIndex = event.target.parentNode.parentNode.rowIndex;
    var selection = '';
    $(tableId).each(function(i, def) {
        if(i == (rowIndex - 1)){
            selection = $(this).find('td:last option:selected').index();
            var drop = $(this).find('select');
            drop.find('option').each(function(index,element){
                seV.push(element.value);
            });
        }
    });

    var newSeV = seV.splice(parseInt(selection))
    //newSeV.reverse();
    $(tableId).each(function(i, def) {
        console.log('My i: ' + i)
        if (i > (rowIndex -1)){
            var select = $(this).find('select');
            select.empty();
            $.each(newSeV, function(i, p) {
                select.append($('<option></option>').val(p).html(p));
            });
        }
        
    });
}

function UpdateSelectedSingle(tableId){
    $('#taperTable tbody tr').each(function(i, def) {
        var selection = $(this).find('td:last option:selected').val();
        document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
    });
}

function UpdateSelectedDouble(tableId){
    $('#taperTable2 tbody tr').each(function(i, def) {
        var selection = $(this).find('td:last option:selected').val();
        document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
    });
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
    // let url = urlDomain + 'insomnia/v1/patient/retrieveRefcode/'+ pID;  

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

    var oneMedicationReturned = false;
    let authTokenPatient = '';
    var doCombi = [];

    $(window).focus(function () {
        //do something
        let authToken = window.localStorage.getItem("token");
        authTokenPatient = window.localStorage.getItem("patientToken");
        console.log("You are in this tab and the token is: "+authToken);
        if(authToken == null){
            //urlDomain = 'http://192.168.6.15:8083/';
            urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
            window.localStorage.setItem("urlDomain", urlDomain);
            $('#loginModal').modal('show');
        }
    });

    //Quick Provider Login
    $('#btnQuickLogin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('quickUsername').value;
        var password = document.getElementById('quickPass').value;
        let url = urlDomain + 'insomnia/v1/authentication/login';

        if(username != '' && password != ''){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*'            
                  },
                data: JSON.stringify({"password": password, "username": username}),
                success: function(result){
                    window.localStorage.setItem("token", result.token);
                    window.localStorage.setItem("patientToken", authTokenPatient);
                    $('#loginModal').modal('hide');
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
        }
        
    });//end of quick login
    
     //Randomization Test
     $('#btnTrial16').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        var email = document.getElementById("patEmail").value;
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var y = document.getElementById("printSample");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/randomization';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        //let authToken = window.localStorage.getItem("token");
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
                document.getElementById('pBlock').innerHTML = result.block;
                document.getElementById('pStrata').innerHTML = result.stratGroup;
                document.getElementById('pStrataV').innerHTML = result.stratValue;
                document.getElementById('pGroupID').innerHTML = result.studyGroupID;
                document.getElementById('pGroupN').innerHTML= result.groupName;
                swal({title: "Patient Randomized Successfully!!", text: "Click Ok to view details", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    dup.style.display = 'none';
                    }
                );
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer").html("Unable to submit patient's record");
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });

    //Trial 1
    $('#btnTrial1').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        age = parseInt(age)
        var email = document.getElementById("patEmail").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var x = document.getElementById("screen1");
        var y = document.getElementById("printSample");
        //var z = document.getElementById("elligHead");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/create';  

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
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender,
            "trialType" : 1, "verify": true }),
            success: function(result){

                console.log(result);

                duplicateValue = result.identicalProfiles;
                
                if(!(duplicateValue == null)){
                    var a = document.createElement('a');
                    var formattedDate = '';
                    $.each(result.identicalProfiles, function(i, def) {
                        formattedDate = def.patientReferralEntity.date_Created
                        formattedDate = formattedDate.split("T", 1)
                        $("#duplicateTBody").append($("<tr>").attr({"id":i+ 1})
                            .append($("<td>").append(def.id))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                            .append($("<td>").append(def.age))
                            .append($("<td>").append(def.gender))
                            .append($("<td>").append(formattedDate))
                            .append($("<td>").append(def.tapperStartDate)))
                    });

                    dup.style.display = 'block';         
                    x.style.display = 'none';
                    //z.style.display = 'none';
                }
                else{
                    document.getElementById('refCode').innerHTML = result.referalCode;
                    var patIDVar = result.referalCode;
                    window.localStorage.setItem("patientID", patIDVar.split("-",1));
                    window.localStorage.setItem("patientName", firstName+" "+lastName);
                    // document.getElementById('usName').innerHTML = result.userName;
                    // document.getElementById('ps').innerHTML= result.password;
                    swal({title: "Patient Recommended To Health enSuite Insomnia Study Successfully!", text: "Click OK to view/print the referral code.", type: "success"},
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
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });


    //Trial 1 Duplicate
    $('#btnIgnoreDuplicate').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        age = parseInt(age)
        var email = document.getElementById("patEmail").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var y = document.getElementById("printSample");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/create';  

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
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender,
            "trialType" : 1, "verify": false }),
            success: function(result){

                console.log(result);
                
                document.getElementById('refCode').innerHTML = result.referalCode;
                var patIDVar = result.referalCode;
                window.localStorage.setItem("patientID", patIDVar.split("-",1));
                window.localStorage.setItem("patientName", firstName+" "+lastName);
                // document.getElementById('usName').innerHTML = result.userName;
                // document.getElementById('ps').innerHTML= result.password;
                swal({title: "Patient Recommended Successfully!!", text: "Referral code generated. App Type: Health enSuite Insomnia Study", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    dup.style.display = 'none';
                    }
                );
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer").html("Unable to submit patient's record");
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });


    //Trial 2
    $('#btnTrial2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        age = parseInt(age)
        var email = document.getElementById("pat2Email").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio21");
        let url = urlDomain + 'insomnia/v1/patient/create';
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
            data: JSON.stringify({"age": age, "firstName": firstName, "gender": gender, "lastName": lastName,
            "trialType" : 2, "verify": true }),
            success: function(result){
                console.log(result);
                duplicateValue = result.identicalProfiles;
                
                if(!(duplicateValue == null)){
                    var formattedDate = '';
                    $.each(result.identicalProfiles, function(i, def) {
                        formattedDate = def.patientReferralEntity.date_Created
                        formattedDate = formattedDate.split("T", 1)
                        $("#duplicate2TBody").append($("<tr>").attr({"id":i+ 1})
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                            .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                            .append($("<td>").append(def.age))
                            .append($("<td>").append(def.gender))
                            .append($("<td>").append(formattedDate))
                            .append($("<td>").append(def.tapperStartDate)))
                    });
                    dup.style.display = 'block';         
                    x.style.display = 'none';
                }else{
                    window.localStorage.setItem("patientName", firstName+" "+lastName);
                    window.localStorage.setItem("patientFName", firstName);
                    window.localStorage.setItem("trial2RefCode", result.referalCode);
                    document.getElementById('refCode1').innerHTML = result.referalCode;
                    var patIDVar = result.referalCode;
                    window.localStorage.setItem("patientID", patIDVar.split("-",1));
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
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });


    //Trial 2 Duplicate
    $('#btnIgnoreDuplicate2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        age = parseInt(age)
        var email = document.getElementById("pat2Email").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio21");
        let url = urlDomain + 'insomnia/v1/patient/create';
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
            data: JSON.stringify({"age": age, "firstName": firstName, "gender": gender, "lastName": lastName,
            "trialType" : 2, "verify": false }),
            success: function(result){
                console.log(result);
                window.localStorage.setItem("patientName", firstName+" "+lastName);
                    window.localStorage.setItem("patientFName", firstName);
                    window.localStorage.setItem("trial2RefCode", result.referalCode);
                    document.getElementById('refCode1').innerHTML = result.referalCode;
                    var patIDVar = result.referalCode;
                    window.localStorage.setItem("patientID", patIDVar.split("-",1));
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
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });


    //Move patient to tial 1
    function revertToTrialOne(){
        let url = urlDomain + 'insomnia/v1/patient/updatetrial';
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
                swal({title: "Patient moved to Health enSuite Insomnia Study!!", text: "Your patient does not need to deprescribe his/her medication", type: "success"},
                function(){ 
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    }
                );
                
                
            }, 
            error: function(msg){
                $("#errorContainer3").html("Attempt made to move patient to Trial 1 failed.");
                sweetAlert("Attempt made to move patient to Trial 1 failed.","Please try again shortly","error");
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

        
        
            let url = urlDomain + 'insomnia/v1/tapper/create';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            //alert(authToken);
            var x = document.getElementById('screen3');
            var y = document.getElementById('screen4');
            var tableBody = '#taperTBody';
            var secondTB = document.getElementById('accordion-two');
            var captionName = 'drugNm';
            let floatDosage = parseFloat(dosage);
            window.localStorage.setItem("dosageStore", floatDosage);
            let intDuration = parseInt(duration);
            window.localStorage.setItem("durationStore", intDuration);
            //let weekNo1 = 0;
            //let weekNo2 = 0;

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
                                if(i > 0){
                                    window.localStorage.setItem("taperLength2", taper.taperLength);
                                }
                                //alert(taper.drugName);

                                $(taper.weeklyDose).each(function(i, def){

                                    window["td"+i+1]= document.createElement('td');
                                    window["td"+i+1].style.border = '1px solid #dddddd';
                                    window["td"+i+1].style.textAlign = 'left';
                                    window["td"+i+1].style.padding = '8px';

                                    window["td"+i+2] = document.createElement('td');
                                    window["td"+i+2].style.border = '1px solid #dddddd';
                                    window["td"+i+2].style.textAlign = 'center';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'center';
                                    window["td"+i+3].style.padding = '8px';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'center';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '150px';
                                    
                                    doCombi = def.dose_Combination;
                                    doCombi.reverse();
                                    $(doCombi).each(function(i, drop){
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
                                    window["tdp2"+i+2].style.textAlign = 'center';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'center';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'center';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    doCombi = def.dose_Combination;
                                    doCombi.reverse();
                                    $(doCombi).each(function(i, dropPrint){
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
                                tableBodyPrint ='#taperTable3Print';
                                captionName = 'drugNm2';
                                captionNamePrint = 'drugNmP2';
                            });
                            var weekNo1 = $('#taperTBody tr').length;
                            var weekNo2 = $('#taperTBody2 tr').length;
                            window.localStorage.setItem("weekNo1", weekNo1);
                            window.localStorage.setItem("weekNo2", weekNo2);
                            addAction('#taperTable tbody tr');
                            addAction('#taperTable2 tbody tr');

                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'block';
                            window.localStorage.setItem("medQuantity", 2);
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                            sweetAlert("Unable to generate Taper Schedule for the two medications","Please try again shortly","error");
                           console.log(JSON.stringify({"regimenDTOList":
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
                           
                       }));
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
                }else if(duration == 10 && duration2 == 10){
                    swal({
                        title: "Attention!",
                         text: "At least one of the medication duration shows that patient has taken the medication 'Less than 14 days'. If this is true, the patients will be automatically be re-assigned",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, reassign the patient",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration(s)",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            revertToTrialOne();
                        } else {
                            swal.close()
                        }
                    });
                    
                }else if(duration == 10 || duration2 == 10){

                    swal({
                        title: "Attention!",
                         text: "At least one of the medication duration shows that patient has taken the medication 'Less than 14 days'. If this is true, the medication with 'Less than 14 days' will not be printed",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, continue",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration(s)",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            //execute and generate either of the medications

                            var tableBodyPrint = '#taperTBody1Print';
                            var captionNamePrint = 'drugNmP';
                            tbIdentity = '#taperTable tbody tr';
                            let myJson = {"regimenDTOList":[{
                                            "sleepMedication" : med1,
                                            "currentDose" : floatDosage,
                                            "medicationDuration" : intDuration,
                                            "conceptID" : conceptId1
                                            }]
                                        };
                            if(duration == 10){
                                let conceptId2 = getConceptID(med2);
                                window.localStorage.setItem("conceptId1Store", conceptId2);//this was swapped
                                let floatDosage2 = parseFloat(dosage2);
                                window.localStorage.setItem("dosageStore", floatDosage2);//this was swapped
                                let intDuration2 = parseInt(duration2);
                                window.localStorage.setItem("durationStore", intDuration2);//this was swapped
                                window.localStorage.setItem("med1Store", med2);//this was swapped

                                myJson = {"regimenDTOList":[{
                                            "sleepMedication" : med2,
                                            "currentDose" : floatDosage2,
                                            "medicationDuration" : intDuration2,
                                            "conceptID" : conceptId2
                                            }]
                                        };
                            }

                            $.ajax({
                                url: url,
                                type: 'POST',
                                dataType: 'json',
                                headers: {
                                    'Content-Type': 'application/json', 
                                    'Accept': '*/*',
                                    'Authorization': 'Bearer '+ authToken
                                },
                                data: JSON.stringify(myJson),
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
                                            window["td"+i+2].style.textAlign = 'center';
                                            window["td"+i+2].style.padding = '8px';

                                            window["td"+i+3] = document.createElement('td');
                                            window["td"+i+3].style.border = '1px solid #dddddd';
                                            window["td"+i+3].style.textAlign = 'center';
                                            window["td"+i+3].style.padding = '8px';

                                            window["td"+i+4] = document.createElement('td');
                                            window["td"+i+4].style.border = '1px solid #dddddd';
                                            window["td"+i+4].style.textAlign = 'center';
                                            window["td"+i+4].style.padding = '8px';

                                            const selectList = document.createElement("select");
                                            selectList.style.width = '150px';
                                            doCombi = def.dose_Combination;
                                            doCombi.reverse();
                                            $(doCombi).each(function(i, drop){
                                                const option = document.createElement("option");
                                                option.value = drop;
                                                option.text = drop;
                                                selectList.appendChild(option);
                                            })
                                            //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

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
                                            window["tdp2"+i+2].style.textAlign = 'center';
                                            window["tdp2"+i+2].style.padding = '8px';

                                            window["tdp2"+i+3] = document.createElement('td');
                                            window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+3].style.textAlign = 'center';
                                            window["tdp2"+i+3].style.padding = '8px';

                                            window["tdp2"+i+4] = document.createElement('td');
                                            window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+4].style.textAlign = 'center';
                                            window["tdp2"+i+4].style.padding = '8px';

                                            const selectListPrint = document.createElement("select");
                                            selectListPrint.style.width = '150px';
                                            doCombi = def.dose_Combination;
                                            doCombi.reverse();
                                            $(doCombi).each(function(i, dropPrint){
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
                
                                    });

                                    addAction('#taperTable tbody tr');
                                    var weekNo1 = $('#taperTBody tr').length;
                                    window.localStorage.setItem("weekNo1", weekNo1);
                                    y.style.display = 'block';         
                                    x.style.display = 'none';
                                    secondTB.style.display = 'none';
                                    window.localStorage.setItem("medQuantity", 1);
                                }, 
                                error: function(msg){
                                    $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                                    sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
                                }
                            });
                            
                            oneMedicationReturned = true;

                        } else {
                            swal.close()
                        }
                    });//end of swal function to confirm from the provider before proceeding with one medication generation

                }//end of two medications generation
            }else{
                if(duration != 10){
                    var tableBodyPrint = '#taperTBody1Print';
                    var captionNamePrint = 'drugNmP';
                    tbIdentity = '#taperTable tbody tr';

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
                                    window["td"+i+2].style.textAlign = 'center';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'center';
                                    window["td"+i+3].style.padding = '8px';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'center';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '150px';
                                    doCombi = def.dose_Combination;
                                    doCombi.reverse();
                                    $(def.dose_Combination).each(function(i, drop){
                                        const option = document.createElement("option");
                                        option.value = drop;
                                        option.text = drop;
                                        selectList.appendChild(option);
                                    })
                                    //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

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
                                    window["tdp2"+i+2].style.textAlign = 'center';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'center';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'center';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    doCombi = def.dose_Combination;
                                    doCombi.reverse();
                                    $(doCombi).each(function(i, dropPrint){
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
        
                            });

                            addAction('#taperTable tbody tr');
                            var weekNo1 = $('#taperTBody tr').length;
                            window.localStorage.setItem("weekNo1", weekNo1);
                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'none';
                            window.localStorage.setItem("medQuantity", 1);
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                            sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
                        }
                    });
                }else{
                    swal({
                        title: "Attention!",
                         text: "At least one of the medication duration shows that patient has taken the medication 'Less than 14 days'. If this is true, the patients will be automatically be re-assigned",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, reassign the patient",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration(s)",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            revertToTrialOne();
                        } else {
                            swal.close()
                        }
                    });
                }  

            }
    });


    //Reset Tapering Generation Med 1
    $('#btnReset').on('click', function(event){
        event.preventDefault();

        var medQT = window.localStorage.getItem("medQuantity");
        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        //$("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        if(medQT == 1){
            $("#taperTable1Print").find("tbody").empty();
            tableBodyPrint = '#taperTable1Print';
            captionNamePrint = 'drugNmP';
        }
        if(medQT == 2){
            $("#taperTable2Print").find("tbody").empty();
            tableBodyPrint = '#taperTable2Print';
            captionNamePrint = 'drugNmP1';
        }

        //$("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody';
        //var secondTB = document.getElementById('secondTB');
        var captionName = 'drugNm';
        let floatDosage = window.localStorage.getItem("dosageStore");
        let intDuration = window.localStorage.getItem("durationStore");

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
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'left';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'center';
                        window["td"+i+3].style.padding = '8px';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, drop){
                            const option = document.createElement("option");
                            option.value = drop;
                            option.text = drop;
                            selectList.appendChild(option);
                        })
                        //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

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
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
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

                });

                addAction('#taperTable tbody tr');
                var weekNo1 = $('#taperTBody tr').length;
                window.localStorage.setItem("weekNo1", weekNo1);
                y.style.display = 'block';         
                x.style.display = 'none';
                //secondTB.style.display = 'none';
                //window.localStorage.setItem("medQuantity", 1);
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
                sweetAlert("Unable to reset Taper Schedule generated for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    //Reset Tapering Generation Med 2
    $('#btnReset2').on('click', function(event){
        event.preventDefault();

        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.

        $("#taperTable3Print").find("tbody").empty();
        tableBodyPrint = '#taperTable3Print';
        captionNamePrint = 'drugNmP2';

        var med2 = window.localStorage.getItem("med2Store");
        let conceptId2 = window.localStorage.getItem("conceptId2Store");
        let floatDosage2 = window.localStorage.getItem("dosage2Store");
        let intDuration2 = window.localStorage.getItem("duration2Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody2';
        var secondTB = document.getElementById('accordion-two');
        var captionName = 'drugNm2';

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
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'left';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'center';
                        window["td"+i+3].style.padding = '8px';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
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
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
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

                });

                addAction('#taperTable2 tbody tr');
                var weekNo2 = $('#taperTBody2 tr').length;
                window.localStorage.setItem("weekNo2", weekNo2);
                y.style.display = 'block';         
                x.style.display = 'none';
                secondTB.style.display = 'block';
                //window.localStorage.setItem("medQuantity", 1);
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
                sweetAlert("Unable to reset Taper Schedule generated for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    //Recompute Tapering Generation Med 1
    $('#btnRecompute').on('click', function(event){
        event.preventDefault();

        var medQT = window.localStorage.getItem("medQuantity");
        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        //$("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        if(medQT == 1){
            $("#taperTable1Print").find("tbody").empty();
            $("#taperTable2Print").find("tbody").empty();
            tableBodyPrint = '#taperTable1Print';
            captionNamePrint = 'drugNmP';
        }
        if(medQT == 2){
            $("#taperTable2Print").find("tbody").empty();
            $("#taperTable1Print").find("tbody").empty();
            tableBodyPrint = '#taperTable2Print';
            captionNamePrint = 'drugNmP1';
        }

        //$("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        //var med2 = window.localStorage.getItem("med2Store");
        
        var tpLength = document.getElementById("tpLength").value;
        var oldWeek1 = window.localStorage.getItem("weekNo1");
        let originalTpLenth = parseInt(tpLength);

        let intTpLength = parseInt(tpLength) + parseInt(oldWeek1);

        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody';
        //var secondTB = document.getElementById('secondTB');
        var captionName = 'drugNm';
        let floatDosage = window.localStorage.getItem("dosageStore");
        let intDuration = window.localStorage.getItem("durationStore");

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
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'left';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'center';
                        window["td"+i+3].style.padding = '8px';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, drop){
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
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
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

                });

                addAction('#taperTable tbody tr');
                var weekNo1 = $('#taperTBody tr').length;
                window.localStorage.setItem("weekNo1", weekNo1);
                y.style.display = 'block';         
                x.style.display = 'none';
                //secondTB.style.display = 'none';
                //window.localStorage.setItem("medQuantity", 1);
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });

    //Recompute Tapering Generation Med 2
    $('#btnRecompute2').on('click', function(event){
        event.preventDefault();

        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.

        $("#taperTable3Print").find("tbody").empty();
        tableBodyPrint = '#taperTable3Print';
        captionNamePrint = 'drugNmP2';

        var med2 = window.localStorage.getItem("med2Store");

        
        var tpLength = document.getElementById("tpLength2").value;
        var oldWeek2 = window.localStorage.getItem("weekNo2");
        let originalTpLenth = parseInt(tpLength);

        let intTpLength2 = parseInt(tpLength) + parseInt(oldWeek2);
        let conceptId2 = window.localStorage.getItem("conceptId2Store");
        let floatDosage2 = window.localStorage.getItem("dosage2Store");
        let intDuration2 = window.localStorage.getItem("duration2Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody2';
        var secondTB = document.getElementById('accordion-two');
        var captionName = 'drugNm2';

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
                "sleepMedication" : med2,
                "currentDose" : floatDosage2,
                "medicationDuration" : intDuration2,
                "taperLength" : intTpLength2,
                "conceptID" : conceptId2
            }]
        }),
            success: function(result){
                console.log(result);
                $(result.tapaschedules).each(function(i, taper){
                    document.getElementById(captionName).innerHTML  = taper.drugName;
                    document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                    window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'left';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'center';
                        window["td"+i+3].style.padding = '8px';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, drop){
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
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
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

                });

                addAction('#taperTable2 tbody tr');
                var weekNo2 = $('#taperTBody2 tr').length;
                window.localStorage.setItem("weekNo2", weekNo2);
                y.style.display = 'block';         
                x.style.display = 'none';
                secondTB.style.display = 'block';
                //window.localStorage.setItem("medQuantity", 1);
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    


    //Final Submit of Trial 2
    $('#btnSubmitTrial2').on('click', function(event){
        event.preventDefault();

        var patID = window.localStorage.getItem("patientID");
        var med2 = window.localStorage.getItem("med2Store");       
        var tpLength1 = window.localStorage.getItem("weekNo1");
        var tpLength2 = window.localStorage.getItem("weekNo2");
        var tapperStartDate = window.localStorage.getItem("tapperStartDate");
        //var tapperStartDate = $("#datepicker").val();
        
            let url = urlDomain + 'insomnia/v1/tapper/save';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            var med1 = window.localStorage.getItem("med1Store");
            let floatDosage = window.localStorage.getItem("dosageStore");
            let intDuration = window.localStorage.getItem("durationStore");
            let conceptId1 = window.localStorage.getItem("conceptId1Store");

            if(med2 != ''){

                if(oneMedicationReturned){
                    UpdateSelectedSingle('taperTable1Print');
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
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
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
                            sweetAlert("Unable to submit final medication","Please try again shortly","error");
                        }
                    });
                }//End of when 1 out of the 2 medications was returned
                else{
                    let conceptId2 = window.localStorage.getItem("conceptId2Store");
                    let floatDosage2 = window.localStorage.getItem("dosage2Store");
                    let intDuration2 = window.localStorage.getItem("duration2Store");

                    // var source = document.getElementById('taperTable');
                    // var destination = document.getElementById('taperTable2Print');
                    // var copy = source.cloneNode(true);
                    // copy.setAttribute('id', 'taperTable2Print');
                    // destination.parentNode.replaceChild(copy, destination);
                    UpdateSelectedSingle('taperTable2Print');
                    UpdateSelectedDouble('taperTable3Print')

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
                        "taperLength" : tpLength1,
                        "taperStartDate": tapperStartDate, 
                        "conceptID" : conceptId1
                        },
                        {
                        "sleepMedication" : med2,
                        "currentDose" : floatDosage2,
                        "medicationDuration" : intDuration2,
                        "taperLength" : tpLength2,
                        "taperStartDate": tapperStartDate, 
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

                            console.log(JSON.stringify({"patientID": patID, "regimenDTOList":
                            [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId1
                            },
                            {
                            "sleepMedication" : med2,
                            "currentDose" : floatDosage2,
                            "medicationDuration" : intDuration2,
                            "taperLength" : tpLength2,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId2
                            }]
                            
                        }));
                            
                        }, 
                        error: function(msg){
                            $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                            sweetAlert("Unable to submit final medication","Please try again shortly","error");
                        }
                    });
                }

            }else{
                //UpdateSelectedData('taperTable');
                UpdateSelectedSingle('taperTable1Print');
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
                        "taperLength" : tpLength1,
                        "taperStartDate": tapperStartDate, 
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
                        sweetAlert("Unable to submit final medication","Please try again shortly","error");
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