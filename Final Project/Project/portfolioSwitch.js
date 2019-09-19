function switch1(){
    var foo = document.getElementById("galleryPortfolioName");

    foo.innerHTML = "Portfolio 1";
}

function switch2(){
    var foo = document.getElementById("galleryPortfolioName");

    foo.innerHTML = "Example Portfolio 2";
}


document.getElementById("portfolio1").addEventListener("click", switch1);
document.getElementById("portfolio2").addEventListener("click", switch2);