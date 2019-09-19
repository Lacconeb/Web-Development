/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 11/5/2017
    Activity: Ajax Interactions
*********************************************************************************************/

document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons()
{
    document.getElementById("postIt").addEventListener("click", function(event)
    {
        var req = new XMLHttpRequest();
        var site = "http://httpbin.org/post";
        //set payload to null to begin
        var payload ={ "anything": null };
        //set payload to the anything input box 
        payload.anything = document.getElementById("anything").value;     
        
        //set the third variable to true to send asynchronous request
        req.open("POST", site, true);
        req.setRequestHeader("Content-Type", "application/json");
        
        //make sure that the function execute only once everything else loads
        req.addEventListener("load",function(){
            //check for errors first then display results
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(JSON.parse(req.responseText).data);
                //display results
                document.getElementById("anythingResponse").textContent = response.anything;
            }else{
                console.log("error");
            }

        });
        
        //send the request
        req.send(JSON.stringify(payload));
        event.preventDefault();
        
    });
}
