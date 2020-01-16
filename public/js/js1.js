
// am impartit dimensiunea copilului la dimensiunea parintelui inmultita cu 100 pentru a afla
// latimea in procente si am adaugat inca 10 procente pentru fiecare dimensiune
/*
$("#slide2").click(function () {
    $(this).css("background-color","pink");
    //console.log($(".progress-bar").parent().width());
    //console.log($(".progress-bar").width());
    //console.log($(".progress-bar").parent().width()/$(".progress-bar").parent().width());
    var parent = $(".progress-bar").parent().width();
    var child = $(".progress-bar").width();
    var result = (child/parent*100)+ 10 + "%";
    
    console.log(result);
    var dim = $(".progress-bar").width();
    console.log(dim);
    $(".progress-bar").attr("style","width:" + result );
    
})

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
*/

/*----------ORIGINAL--------------
$(document).keypress(function(event){
    if(event.which === 13)
     $("#slide2").css("background-color","pink");
})
*/
var progressLastChange = 0;
window.localStorage.setItem("nameOfItem", 0);
var getItem = localStorage.getItem("nameOfItem");
console.log(getItem);


function setProgressLastChange(){
    $(".progress-bar").attr("style","width:" + getItem );
}

function changeProgressState(){
    var parent = $(".progress-bar").parent().width();
    var child = $(".progress-bar").width();
    var result = (child/parent*100)+ 10 + "%";
    $(".progress-bar").attr("style","width:" + result );
    window.localStorage.setItem("nameOfItem", result);
    getItem = result;
    //console.log(result);
}
var index = 0;

$(document).keydown(function(event){
    var x = event.which;
    
    switch(x){
        case 65:
        case 66:
        case 67:
        case 68:
            changeProgressState();
            $("#slide2").css("background-color","pink");
            break;
        
        case 69:
        case 70:
        case 71:
        case 72:
            changeProgressState();
            $("#slide2").css("background-color","red");
            break;
        case 73:
        case 74:
        case 75:
        case 76:
            changeProgressState();
            $("#slide2").css("background-color","green");
            break;
        case 77:
        case 78:
        case 79:
        case 80:
            changeProgressState();
            $("#slide2").css("background-color","yellow");
            break;
           
        case 37:
            changeProgressState();
            $("#slide2").css("background-color","black");
            break;

        case 39:
            if(index === 0){
                console.log(index);
                changeProgressState();
                //$("#slide1").fadeOut();
                //$("#slide2").fadeIn(1000);
                $("#slide1").css("display","none");
                $("#slide2").css("display","block");
                index++;
            }
            else if(index === 1){
                console.log(index);
                changeProgressState();
                $("#slide1").css("display","none");
                $("#slide2").css("display","block");
               
                index++;
            }
            else if(index === 2){
                console.log(index);
                changeProgressState();
                $(".image-animation").css("display","block");
                $(".image-animation").css("position","absolute");
                //la event nu mai recunostea positia relativa a acestui element nu stiu de ce
                //si a trebuit sa o setez din nou
                $(".slide-show-container").css("position","relative");
                $(".image-animation").css("top","0");
            }
            break;    
    }
})


$("#slide2").click(function () {
    $("#slide2").fadeOut();
})




$("input").keypress(function (event) {
  if(event.which === 13)
  alert("YOU HIT ENTER");
})


