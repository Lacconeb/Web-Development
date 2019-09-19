//////////////////////////////////////////////////////////////////////////
//profile
//////////////////////////////////////////////////////////////////////////

function setProfile(){

    var check = document.getElementById("box1");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("profileTop");
    foo.style.backgroundColor = "#ff9f60";

    check.style.backgroundColor = "#d9d9d9";
}

function selectProfile(){

    var foo = document.getElementById("box1");
    if(foo.classList.contains("selected")){
        return;
    }

    cancelSelected();

    setProfile();

    foo.className = "selected";

    document.getElementById("instructionTextHeader").innerHTML = "Step 1: Profile";

    
    setProfileMessage();

}

function cancelProfile(){

    var check = document.getElementById("box1");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("profileTop");
    foo.style.backgroundColor = "#f9f9f9";

    check.style.backgroundColor = "#f9f9f9";
}

function setProfileMessage(){

    removeOtherText();

    var foo = document.getElementById("profileText");
    foo.style.opacity = "1";
}

//////////////////////////////////////////////////////////////////////////
//login
//////////////////////////////////////////////////////////////////////////

function setLogin(){

    var check = document.getElementById("box2");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("loginTop");
    foo.style.backgroundColor = "#fedf5f";

    check.style.backgroundColor = "#d9d9d9";
}

function selectLogin(){
    
    var foo = document.getElementById("box2");
    if(foo.classList.contains("selected")){
        return;
    }

    cancelSelected();

    setLogin();

    foo.className = "selected";

    document.getElementById("instructionTextHeader").innerHTML = "Step 2: Login";

    setLoginMessage();
}

function cancelLogin(){

    var check = document.getElementById("box2");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("loginTop");
    foo.style.backgroundColor = "#f9f9f9";

    check.style.backgroundColor = "#f9f9f9";
}

function setLoginMessage(){

    removeOtherText();

    var foo = document.getElementById("loginText");
    foo.style.opacity = "1";
}

//////////////////////////////////////////////////////////////////////////
//upload
//////////////////////////////////////////////////////////////////////////

function setUpload(){

    var check = document.getElementById("box3");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("uploadTop");
    foo.style.backgroundColor = "#95ed38";

    check.style.backgroundColor = "#d9d9d9";
}

function selectUpload(){
    

    var foo = document.getElementById("box3");
    if(foo.classList.contains("selected")){
        return;
    }

    cancelSelected();

    setUpload();

    foo.className = "selected";

    document.getElementById("instructionTextHeader").innerHTML = "Step 3: Upload";

    setUploadMessage();
}

function cancelUpload(){

    var check = document.getElementById("box3");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("uploadTop");
    foo.style.backgroundColor = "#f9f9f9";

    check.style.backgroundColor = "#f9f9f9";
}

function setUploadMessage(){

    removeOtherText();

    var foo = document.getElementById("uploadText");
    foo.style.opacity = "1";
}

//////////////////////////////////////////////////////////////////////////
//critique
//////////////////////////////////////////////////////////////////////////

function setCritique(){

    var check = document.getElementById("box4");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("critiqueTop");
    foo.style.backgroundColor = "#4095ff";

    check.style.backgroundColor = "#d9d9d9";
}

function selectCritique(){
    
    var foo = document.getElementById("box4");
    if(foo.classList.contains("selected")){
        return;
    }

    cancelSelected();

    setCritique();

    foo.className = "selected";

    document.getElementById("instructionTextHeader").innerHTML = "Step 4: Critique";

    setCritiqueMessage();
}

function cancelCritique(){

    var check = document.getElementById("box4");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("critiqueTop");
    foo.style.backgroundColor = "#f9f9f9";

    check.style.backgroundColor = "#f9f9f9";
}

function setCritiqueMessage(){

    removeOtherText();

    var foo = document.getElementById("critiqueText");
    foo.style.opacity = "1";
}

//////////////////////////////////////////////////////////////////////////
//explore
//////////////////////////////////////////////////////////////////////////

function setExplore(){

    var check = document.getElementById("box5");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("exploreTop");
    foo.style.backgroundColor = "#be40ff";

    check.style.backgroundColor = "#d9d9d9";
}

function selectExplore(){
    
    var foo = document.getElementById("box5");
    if(foo.classList.contains("selected")){
        return;
    }

    cancelSelected();

    setExplore();

    foo.className = "selected";

    document.getElementById("instructionTextHeader").innerHTML = "Step 5: Explore";

    setExploreMessage();

}

function cancelExplore(){

    var check = document.getElementById("box5");
    if(check.classList.contains("selected")){
        return;
    }

    var foo = document.getElementById("exploreTop");
    foo.style.backgroundColor = "#f9f9f9";

    check.style.backgroundColor = "#f9f9f9";
}

function setExploreMessage(){

    removeOtherText();

    var foo = document.getElementById("exploreText");
    foo.style.opacity = "1";
}

//////////////////////////////////////////////////////////////////////////
//Cancel the previous selected box
//////////////////////////////////////////////////////////////////////////

function cancelSelected(){
    var check = document.getElementById("box1");
    if(check.classList.contains("selected")){
        check.className = "boxes";
        cancelProfile();
        return;
    }

    check = document.getElementById("box2");
    if(check.classList.contains("selected")){
        check.className = "boxes";
        cancelLogin();
        return;
    }

    check = document.getElementById("box3");
    if(check.classList.contains("selected")){
        check.className = "boxes";
        cancelUpload();
        return;
    }

    check = document.getElementById("box4");
    if(check.classList.contains("selected")){
        check.className = "boxes";
        cancelCritique();
        return;
    }

    check = document.getElementById("box5");
    if(check.classList.contains("selected")){
        check.className = "boxes";
        cancelExplore();
        return;
    }
}

//////////////////////////////////////////////////////////////////////////
//Remove the current instruction text
//////////////////////////////////////////////////////////////////////////

function removeOtherText(){
    var check = document.getElementById("profileText");
    if(window.getComputedStyle(check).getPropertyValue("opacity") == 1){
        check.style.opacity = "0";
        return;
    }

    var check = document.getElementById("loginText");
    if(window.getComputedStyle(check).getPropertyValue("opacity") == 1){
        check.style.opacity = "0";
        return;
    }

    var check = document.getElementById("uploadText");
    if(window.getComputedStyle(check).getPropertyValue("opacity") == 1){
        check.style.opacity = "0";
        return;
    }

    var check = document.getElementById("critiqueText");
    if(window.getComputedStyle(check).getPropertyValue("opacity") == 1){
        check.style.opacity = "0";
        return;
    }

    var check = document.getElementById("exploreText");
    if(window.getComputedStyle(check).getPropertyValue("opacity") == 1){
        check.style.opacity = "0";
        return;
    }
}

//////////////////////////////////////////////////////////////////////////

//set the Profile to be first selected
selectProfile();

document.getElementById("box1").addEventListener("mouseover", setProfile);
document.getElementById("box1").addEventListener("click", selectProfile);
document.getElementById("box1").addEventListener("mouseout", cancelProfile);

document.getElementById("box2").addEventListener("mouseover", setLogin);
document.getElementById("box2").addEventListener("click", selectLogin);
document.getElementById("box2").addEventListener("mouseout", cancelLogin);

document.getElementById("box3").addEventListener("mouseover", setUpload);
document.getElementById("box3").addEventListener("click", selectUpload);
document.getElementById("box3").addEventListener("mouseout", cancelUpload);

document.getElementById("box4").addEventListener("mouseover", setCritique);
document.getElementById("box4").addEventListener("click", selectCritique);
document.getElementById("box4").addEventListener("mouseout", cancelCritique);

document.getElementById("box5").addEventListener("mouseover", setExplore);
document.getElementById("box5").addEventListener("click", selectExplore);
document.getElementById("box5").addEventListener("mouseout", cancelExplore);