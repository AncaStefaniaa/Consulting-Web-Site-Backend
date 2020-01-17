var progressbarPagesNO = 5;     //number of pages managed by the progress bar
var progressbarPages = ['pink', 'red', 'black', 'green', 'white'];      //just to distinguish them
var progressbarUnit = 100 / progressbarPagesNO;
var progressbar = $('.progress-bar');//fetch the progress bar

if(localStorage.getItem('currentProgressbarPage') === null){
    localStorage.setItem('currentProgressbarPage', 0);
}
var currentProgress = parseInt(localStorage.getItem('currentProgressbarPage'));   //il considera un string ffs

console.log(progressbarUnit);
console.log(currentProgress + 1);
progressbar.css('width', (progressbarUnit * (currentProgress + 1)) + '%'); //the second parameter is a string, that's why it works 
progressbar.attr('aria-valuenow', progressbarUnit * (currentProgress + 1));
$("#progressbarPage").css("background-color", progressbarPages[currentProgress]);


function changeProgress(key){

    var previousProgress = currentProgress;
    if (key >= 65 && key <= 90){//a-z
        currentProgress = (key - 65) / progressbarPagesNO;
    }
    else if (key === 37){//leftArrow
            if(currentProgress != 0){
                --currentProgress;
            }
        }
    else if (key == 39 || key == 13){ //enter or rightArrow
            if(currentProgress != progressbarPagesNO - 1){
                ++currentProgress;
            }
        }

    if (previousProgress != currentProgress){   //if the user did a change
        localStorage.setItem('currentProgressbarPage', currentProgress);
        $("#progressbarPage").css("background-color", progressbarPages[currentProgress]);
        progressbar.css('width', (progressbarUnit * (currentProgress + 1)) + '%'); //the second parameter is a string, that's why it works                                               
        progressbar.attr('aria-valuenow', progressbarUnit * (currentProgress + 1));
        console.log(currentProgress);
    }
    
}


document.addEventListener('keydown', function(event) {

    var key = event.which;
    changeProgress(key);
    
});