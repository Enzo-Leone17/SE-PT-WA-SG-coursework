const visitorCounterText = document.getElementById("visitorCounter");
const alertStaffText = document.getElementById("alertStaff");
let visitorCount = 0;
let maxVisitorCount = 10;

function addVisitorCount(){
    if(visitorCount < maxVisitorCount){
        visitorCount++;
        visitorCounterText.innerText = visitorCount;
    }
    else{
        alertStaffText.innerText = "Maximum visitor count reached!";
        setTimeout(() => {
            alertStaffText.innerText = "";
        }, 3000);
    }
}


function minusVisitorCount(){
    if(visitorCount > 0){
        visitorCount--;
        visitorCounterText.innerText = visitorCount;
    }
    else{
        alertStaffText.innerText = "No visitors left!";
        setTimeout(() => {
            alertStaffText.innerText = "";
        }, 3000);
    }
}

function resetVisitorCount(){
    visitorCount = 0;
    visitorCounterText.innerText = visitorCount;
    alertStaffText.innerText = "";
}