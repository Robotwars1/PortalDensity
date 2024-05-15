const SpRecords = "SpRecord.json";
const CoopRecords = "CoopRecord.json";

// Numbers gotten via C# script cause no way to circumvent CORS isues while hosting on Github Pages
const Sp5000 = [3, 1, 3, 5, 6, 3, 2, 3, 3, 3, 2, 7, 4, 6, 5, 0, 2, 0, 2, 3, 5, 10, 0, 2, 2, 7, 8, 3, 10, 9, 10, 10, 17, 10, 19, 12, 35, 34, 3, 7, 7, 6, 5, 7, 12, 18, 11, 11, 17, 8, 11];
const Coop5000 = [2, 7, 8, 4, 2, 0, 9, 6, 5, 4, 15, 11, 8, 12, 11, 8, 5, 12, 18, 16, 23, 15, 5, 5, 10, 13, 3, 6, 10, 16, 25, 3, 13, 12, 24, 30, 15, 12, 64, 23, 13, 27, 59, 54, 6, 51, 62, 65];

const RecordLabels = document.getElementsByClassName("WrLabel");
const Top5000Labels = document.getElementsByClassName("Top5000Label");

window.onload = async function() {
    UpdateLabels();
}

async function UpdateLabels() {
    // Top 5000
    for (let i = 0; i < Top5000Labels.length; i++) {
        if (i < Sp5000.length) {
            Top5000Labels[i].textContent = `Top 5000: ${Sp5000[i]}`;
        }
        else {
            Top5000Labels[i].textContent = `Top 5000: ${Coop5000[i - Sp5000.length]}`;
        }
    }

    // WR
    // Parse Jsons
    let SpJson = await fetch(SpRecords);
    let SpData = await SpJson.json();
    let CoopJson = await fetch(CoopRecords);
    let CoopData = await CoopJson.json();

    let SPWr = [];
    let CoopWr = [];

    for (let i = 0; i < RecordLabels.length; i++) {
        if (i < SpData.length) {
            RecordLabels[i].textContent = `WR: ${SpData[i]}`;
            SPWr.push(SpData[i]);
        }
        else {
            RecordLabels[i].textContent = `WR: ${CoopData[i - SpData.length]}`;
            CoopWr.push(CoopData[i]);
        }
    }
}
