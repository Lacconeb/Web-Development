/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 10/28/2017
    HW Assignment: DOM and Events
*********************************************************************************************/

function table(){
    //var to reference the body used so we can add the table to it
    var body = document.getElementsByTagName("body")[0];

    var table = document.createElement("table");

    var tableBody = document.createElement("tbody");

    //loop through the 4 columns
    for(var i=0;i < 4; i++){
        
        var tableRow = document.createElement("tr");

        //loop through the 4 rows
        for(var j = 0; j < 4; j++){

            //if the row is equal to 0 then make all the cells a header and label them header and their number
            if(i==0){
                var tableHead = document.createElement("th");
                var tableHeadContents = document.createTextNode("Header " + (j+1));

                tableHead.appendChild(tableHeadContents);
                tableRow.appendChild(tableHead);

            //else create a normal td
            }else{
                var tableCell = document.createElement("td");
                var tableCellContents = document.createTextNode((i) + ', ' + (j+1));

                tableCell.style.borderWidth = "1px";
                tableCell.appendChild(tableCellContents);
                tableRow.appendChild(tableCell);
                
            }
        }

        //append the row before we lose it in the loop
        tableBody.appendChild(tableRow);
    }

    //after the loop append the tableBody to the table and the table to the body
    table.appendChild(tableBody);
    body.appendChild(table);
    table.setAttribute("border", "1.5px");

}

//Create the 5 html buttons and label the text on the button to the appropriate button
function buttons(){

    //up button
    var up = document.createElement("button");      
    up.id = "upButton";
    var upContents = document.createTextNode("Up");
    up.appendChild(upContents);
    document.body.appendChild(up);  
    
    //down button
    var down = document.createElement("button");    
    down.id = "downButton";
    var downContents = document.createTextNode("Down");
    down.appendChild(downContents);
    document.body.appendChild(down);
    
    //left button
    var left = document.createElement("button");     
    left.id = "leftButton";
    var leftContents = document.createTextNode("Left");
    left.appendChild(leftContents);
    document.body.appendChild(left);
    
    //right button
    var right = document.createElement("button");       
    right.id = "rightButton";
    var rightContents = document.createTextNode("Right");
    right.appendChild(rightContents);
    document.body.appendChild(right);
  
    //mark button
    var mark = document.createElement("button");        
    mark.id = "markButton";
    var markContents = document.createTextNode("Mark Cell");
    mark.appendChild(markContents);
    document.body.appendChild(mark);

}

/************************************************************************************************
* BUTTON FUNCTIONS: Used to set control the click event when the user pressed a directional button.
* The "selected" position will change depending on the direction pressed
*************************************************************************************************/

function up(){

    foo = document.getElementById("curCell");
    
    //check to see if the selected row is at rowIndex 1
    //if it is then don't continue any further
    //because an error will occur
    if(foo.parentNode.rowIndex == 1){ 
      return;                  
    }

    var curr = foo.cellIndex;                       
    foo.style.borderWidth = "1px";
    //remove the curCell id that we attached to the last selected cell
    foo.removeAttribute("id");
    foo = foo.parentNode;
    foo = foo.previousElementSibling;
    foo = foo.firstElementChild; 

    //we have to cycle through to the next row since we are moving up
    //the previous element sibling is to the left so we have to cycle
    //through a whole row first
    for(var i =0; i < curr; i++){                         
      foo = foo.nextElementSibling;
    }

    //set the new cell to the curCell with style
    foo.style.borderWidth = "3px";                    
    foo.id = "curCell";                                  
  
}

function down(){
    
    foo = document.getElementById("curCell");
    
    //check to see if the selected row is at rowIndex 3
    //if it is then don't continue any further
    //because an error will occur
    if(foo.parentNode.rowIndex == 3){ 
        return;                  
    }

    var curr = foo.cellIndex;                       
    foo.style.borderWidth = "1px";
    //remove the curCell id that we attached to the last selected cell
    foo.removeAttribute("id");
    foo = foo.parentNode;
    foo = foo.nextElementSibling;
    foo = foo.firstElementChild; 

    //we have to cycle through to the next row since we are moving down
    //the next element sibling is to the right so we have to cycle
    //through a whole row first
    for(var i =0; i < curr; i++){                   
        foo = foo.nextElementSibling;
    }

    //set the new cell to the curCell with style
    foo.style.borderWidth = "3px";                    
    foo.id = "curCell";                                  
    
}

function left(){
    
    foo = document.getElementById("curCell");
    
    //check to see if the selected cell index 0
    //if it is then don't continue any further
    //because an error will occur
    if(foo.cellIndex == 0){ 
        return;                  
    }
               
    foo.style.borderWidth = "1px";
    //remove the curCell id that we attached to the last selected cell
    foo.removeAttribute("id");
    foo = foo.previousElementSibling; 

    //set the new cell to the curCell with style
    foo.style.borderWidth = "3px";                    
    foo.id = "curCell";                                  
    
}

function right(){
    
    foo = document.getElementById("curCell");
    
    //check to see if the selected cell index 3
    //if it is then don't continue any further
    //because an error will occur
    if(foo.cellIndex == 3){ 
        return;                  
    }
              
    foo.style.borderWidth = "1px";
    //remove the curCell id that we attached to the last selected cell
    foo.removeAttribute("id");
    foo = foo.nextElementSibling; 

    //set the new cell to the curCell with style
    foo.style.borderWidth = "3px";                    
    foo.id = "curCell";                                  
    
}

function mark(){

    //set the cell with the curCell id attached to have a yellow backround
    //the yellow background will also stay yellow even when another cell 
    //has been selected
    foo = document.getElementById("curCell");
    foo.style.backgroundColor = "yellow";

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

//create the 4x4 table and the 5 buttons below it
table();
buttons();

//set the current selected cell so marking and moving can happen easily
var curCell = document.getElementsByTagName("td")[0];
curCell.id = "curCell";
curCell.style.borderWidth = "3px";

//set the call to all the buttons when they are pressed
document.getElementById("upButton").addEventListener("click", up);
document.getElementById("downButton").addEventListener("click", down);
document.getElementById("leftButton").addEventListener("click", left);
document.getElementById("rightButton").addEventListener("click", right);
document.getElementById("markButton").addEventListener("click", mark);