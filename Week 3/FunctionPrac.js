HoistEx();

function HoistEx(things){
    document.getElementById("message1").textContent = "This is message 1";
    
}

VariFunc(); // var before which does not work

var VariFunc = function (){
    document.getElementById("message2").textContent = "This is message 2";
};

//VariFunc();  // var after which does work