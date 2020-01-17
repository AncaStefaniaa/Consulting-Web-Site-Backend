
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
var progressbarPagesNO = 5;
var progressbarUnit = 100 / progressbarPagesNO;
var progressbar = $('.progress-bar');
var currentProgressbarPage;

if(localStorage.getItem('currentProgressbarPage') === null){
    localStorage.setItem('currentProgressbarPage', 0);
}

var currentProgress = parseInt(localStorage.getItem('currentProgressbarPage'));


function changeProgressState(){
    var parent = $(".progress-bar").parent().width();
    var child = $(".progress-bar").width();
    var result = (child/parent*100)+ 20 + "%";
    //$(".progress-bar").attr("style","width:" + result );
    progressbar.css('width', (progressbarUnit * (currentProgress)) + '%'); //the second parameter is a string, that's why it works 
    progressbar.attr('aria-valuenow', progressbarUnit * (currentProgress));
    localStorage.setItem('currentProgressbarPage', currentProgress);
    getItem = result;

    console.log(currentProgress);
}
var index = 0;
function changeProgress(key){

    
    switch(key){
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
         if(currentProgress != 0){
                --currentProgress;
            }
            changeProgressState();
            $("#slide2").css("background-color","black");
            index--;
            break;

        case 39:
            if(index === 0){
                //console.log(index);
                if(currentProgress != progressbarPagesNO){
                ++currentProgress;
                }
                changeProgressState();
                //$("#slide1").fadeOut();
                //$("#slide2").fadeIn(1000);
                
                $("#slide1").css("display","none");
                $("#slide2").css("display","block");
                $(".h1-trans").css("transform", "rotate(20deg)");
                $(".h1-trans").css("transform", "rotate(-20deg)");
                index++;
                
            }
            else if(index === 1){
                //console.log(index);
                if(currentProgress != progressbarPagesNO){
                ++currentProgress;
                }
                index++;
                changeProgressState();
                $("#slide1").css("display","none");
                $("#slide2").css("display","block");
                
                
            }
            else if(index === 2){
                //console.log(index);
                if(currentProgress != progressbarPagesNO){
                ++currentProgress;
                }
                changeProgressState();
                
                //la event nu mai recunostea positia relativa a acestui element nu stiu de ce
                //si a trebuit sa o setez din nou
                $("#slide3").css("display","block");
                index++;
               
            }

            else if(index === 3){
                //console.log(index);
                if(currentProgress != progressbarPagesNO){
                ++currentProgress;
                }
                changeProgressState();
                $("#slide4").css("display","block");
               
                //la event nu mai recunostea positia relativa a acestui element nu stiu de ce
                //si a trebuit sa o setez din nou
                index++;
            }

            else if(index === 4){
                //console.log(index);
                 if(currentProgress != progressbarPagesNO){
                ++currentProgress;
                }
                changeProgressState();
                $("#slide5").css("display","block");
                //la event nu mai recunostea positia relativa a acestui element nu stiu de ce
                //si a trebuit sa o setez din nou
                
               index++;
               
            }
            break;    
    }

}
/*
$("#slide2").click(function () {
    $("#slide2").fadeOut();
})

$("input").keypress(function (event) {
  if(event.which === 13)
  alert("YOU HIT ENTER");
})
*/

document.addEventListener('keydown', function(event) {

    var key = event.which;
    changeProgress(key);
    
});