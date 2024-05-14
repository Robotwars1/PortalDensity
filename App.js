const SpRecords = "SpRecord.json";
const CoopRecords = "CoopRecord.json";

window.onload = async function() {
    SetWrLabel();
}

async function SetWrLabel() {
    let RecordLabels = document.getElementsByClassName("WrLabel");

    // Parse Jsons
    let SpJson = await fetch(SpRecords);
    let SpData = await SpJson.json();
    let CoopJson = await fetch(CoopRecords);
    let CoopData = await CoopJson.json();

    for (let i = 0; i < RecordLabels.length; i++) {
        if (i < SpData.length) {
            RecordLabels[i].textContent = SpData[i];
        }
        else {
            RecordLabels[i + SpData.length].textContent = CoopData[i - SpData.length];
        }
    }
}

function GetTop5000() {
    
}
