/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 11/30/2017
    HW Assignment:Database interactions and UI
*********************************************************************************************/

//add an event listener to the add button
document.getElementById('addButton').addEventListener('click',function(event){	
    
    //get the form we created for adding exercises
	var addExercise = document.getElementById("addExercise");
	var req = new XMLHttpRequest();

	//set the parameters
	var param =         "exercise="+addExercise.elements.exercise.value+
						"&reps="+addExercise.elements.reps.value+
						"&weight="+addExercise.elements.weight.value+
						"&date="+addExercise.elements.date.value;
	//if unit was checked then make it 1 otherwise make it 0
	if(addExercise.elements.unitCheck.checked){
		param += "&unitCheck=1";                                     
	}else{
		param += "&unitCheck=0";
	}

	//open the get request and set it to true
	req.open("GET", "/insert?" + param, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	//once it is loaded add to the table
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){

			//save the responses
			var response = JSON.parse(req.responseText);
			var id = response.inserted;

			//save the table for easier access later
			var table = document.getElementById("exerciseTable");
			var row = table.insertRow(-1);

			//create name element and append to row
			var exerciseName = document.createElement('td');
			exerciseName.textContent = addExercise.elements.exercise.value;
			row.appendChild(exerciseName);

			//create reps element and append to row
			var repsNum = document.createElement('td');
			repsNum.textContent = addExercise.elements.reps.value;
			row.appendChild(repsNum);

			//create weight element and append to row
			var weightNum = document.createElement('td');
			weightNum.textContent = addExercise.elements.weight.value;
			row.appendChild(weightNum);

            //create date element and append to row
            var dateNum = document.createElement('td');
			dateNum.textContent = addExercise.elements.date.value;
			row.appendChild(dateNum);
            
			var unitChecker = document.createElement('td');
			if(addExercise.elements.unitCheck.checked){
				unitChecker.textContent = "lbs";
			}else{
				unitChecker.textContent = "kgs";
			}
			row.appendChild(unitChecker);
            
            	
            //this block of code will add an update button to the table 
			var updateData = document.createElement('td');
            var updateDataLink = document.createElement('a');
            //redirect
            updateDataLink.setAttribute('href','/updateTable?id=' + id);
            //create input button
            var updateButton = document.createElement('input');
            //set the attributed for the button
			updateButton.setAttribute('value','Update');
            updateButton.setAttribute('type','button');         
			updateDataLink.appendChild(updateButton);
            updateData.appendChild(updateDataLink);
            //append button to row
			row.appendChild(updateData);         
            
            //this block of code will add a delete button to the table 
			var deleteCell = document.createElement('td');
            var deleteButton = document.createElement('input');
            //set attributes for the button
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');
			deleteButton.setAttribute('value','Delete');
            deleteButton.setAttribute('onClick', 'deleteData("dataTable",' + id +')');
            //hidden input to remove elements form database
            //suggested by the assignment 
			var deleteHidden = document.createElement('input');
			deleteHidden.setAttribute('type','hidden');
            deleteHidden.setAttribute('id', 'delete' + id);
            //append button and hidden to the td
			deleteCell.appendChild(deleteButton);
            deleteCell.appendChild(deleteHidden);
            //append the whole td to the row
			row.appendChild(deleteCell);

		}else {
	    	console.log("error");
		}
	});
	
	req.send("/insert?" + param);
	event.preventDefault();
});

//function to delete data
function deleteData(tableId, id){
    var deleteItem = "delete" + id;
	var table = document.getElementById("exerciseTable");
	var numRows = table.rows.length;

	//loop through the table to find the row to delete
	for(var i = 1; i < numRows; i++){
		var row = table.rows[i];
		var findData = row.getElementsByTagName("td");
        var erase = findData[findData.length -1];
        //delete if match		        
		if(erase.children[1].id === deleteItem){
			table.deleteRow(i);
		}

	}

	var req = new XMLHttpRequest();
	
    //open request to delete data
	req.open("GET", "/delete?id=" + id, true);

	req.addEventListener("load",function(){
        //if request is successfull print a simple message or error if not
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
		} else {
		    console.log('error');
		}
	});

    //send it
	req.send("/delete?id=" + id);

}