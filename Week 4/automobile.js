/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 10/22/2017
    HW Assignment: Higher-Order Functions and Objects 
*********************************************************************************************/

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)

    //If the the boolean is true then the type needs to be included in the console.log() message other wise print the year, make, and model
    this.logMe = function logMe(boolean){
    	if(boolean)
    		console.log(year + " " + make + " " + model + " " + type);
    	else
    		console.log(year + " " + make + " " + model);
    };
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/

    //temp variable used to hold a value while the array sorting is occurring
    var temp;

    //A variable to copy the original array and be able to change it
    var sortedArr = array;

    //The first for loop keeps track of the first value in the array and stops one value short of the length total
    //The second for loop keeps track of the next value in the array which is being compared to the first loops value
    for(var x = 0; x < sortedArr.length-1; x++){
        for(var y= x+1; y < sortedArr.length; y++){
            
            //If the comparator function is true then continue with sorting those two values
            if(comparator(sortedArr[y], sortedArr[x])){
                //simple technique for sorting that was learned in past classes in this program
                temp = sortedArr[x];
                sortedArr[x] = sortedArr[y];
                sortedArr[y] = temp;
            }
        }
    }

    return sortedArr;

}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/

    //In this function newer cars are seen as greater thus belonging towards the beginning of the array
    //So we will judge the greater car as the higher year and returning true only if the first number is greater than the second.
    //The second number in the array will be passed as the first number in this function
    if(auto1.year > auto2.year){
        return true;
    }else{
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/

    //This function does the same thing as yearComparator but instead uses letters to compare the make of the cars
    //The greater car is the car that comes first alphabetically
    //We will be using toLowerCase to make the comparison with case insensitive
    if(auto1.make.toLowerCase() < auto2.make.toLowerCase()){
        return true;
    }else{
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    //This function is the trickiest because not only is it sorting based on certain types with values, it is also sorting by year based on a tie

    //The comments before this function only list 4 types with sedan being left off the list. So I just went with 4 and left sedan to be undefined in the type legend
    var legend = {
        "roadster": 1,
        "pickup": 2,
        "suv": 3,
        "wagon": 4,
    };

    //Set the value to the corresponding number based on type
    var auto1Val = legend[auto1.type.toLowerCase()];
    var auto2Val = legend[auto2.type.toLowerCase()];

    //Need to check wether auto1Val and auto2Val are undefined otherwise they will not have a value. If they are undefined then we will set the value to the worst
    if(auto1Val === undefined){
        auto1Val = 5;
    }

    if(auto2Val === undefined){
        auto2Val = 5;
    }

    //If the the first number is less than the second number then a switch needs to be made
    //If the numbers are equal then a call to yearComparator needs to be made to determine if a switch needs to occur
    //else return false is the default action
    if(auto1Val < auto2Val){
        return true;
    }else if (auto1Val === auto2Val){
        return yearComparator(auto1, auto2);
    }else{
        return false;
    }


}

//Simple print function which goes through the array and calls logMe function to print the values to console.log()
function printArr(array, boolean){
    for(var x=0; x < array.length; x++){
        array[x].logMe(boolean);
    }
}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

console.log("*****");
console.log("The cars sorted by year are:");
console.log("(year make model of the 'greatest' car)");
printArr(sortArr(yearComparator, automobiles), false);
console.log("(year make model of the 'least' car)");

console.log("The cars sorted by make are:");
console.log("(year make model of the 'greatest' car)");
printArr(sortArr(makeComparator, automobiles), false);
console.log("(year make model of the 'least' car)");


console.log("The cars sorted by type are:");
console.log("(year make model type of the 'greatest' car)");
printArr(sortArr(typeComparator, automobiles), true);
console.log("(year make model type of the 'least' car)");
console.log("*****");