const SpRecords = "SpRecord.json";
const CoopRecords = "CoopRecord.json";

// Numbers gotten via C# script cause no way to circumvent CORS isues while hosting on Github Pages
const Sp5000 = [3, 1, 3, 5, 6, 3, 2, 3, 3, 3, 2, 7, 4, 6, 5, 0, 2, 0, 2, 3, 5, 10, 0, 2, 2, 7, 8, 3, 10, 9, 10, 10, 17, 10, 19, 12, 35, 34, 3, 7, 7, 6, 5, 7, 12, 18, 11, 11, 17, 8, 11];
const Coop5000 = [2, 7, 8, 4, 2, 0, 9, 6, 5, 4, 15, 11, 8, 12, 11, 8, 5, 12, 18, 16, 23, 15, 5, 5, 10, 13, 3, 6, 10, 16, 25, 3, 13, 12, 24, 30, 15, 12, 64, 23, 13, 27, 59, 54, 6, 51, 62, 65];

const SpMapNames = ["Portal Gun", "Smooth Jazz", "Cube Momentum", "Future Starter", "Incinerator", "Laser Stairs", "Dual Lasers", "Laser Over Goo", "Trust Fling", "Pit Flings", "Fizzler Intro", "Ceiling Catapult", "Ricochet", "Bridge Intro", "Bridge the Gap", "Turret Intro", "Laser Relays", "Turret Blocker", "Laser vs Turret", "Pull the Rug", "Column Blocker", "Laser Chaining", "Triple Laser", "Jail Break", "Escape", "Turret Factory", "Turret Sabotage", "Neurotoxin Sabotage", "Underground", "Cave Johnson", "Repulsion Intro", "Bomb Flings", "Crazy Box", "PotatOS", "Propulsion Intro", "Propulsion Flings", "Conversion Intro", "Three Gels", "Funnel Intro", "Ceiling Button", "Wall Button", "Polarity", "Funnel Catch", "Stop the Box", "Laser Catapult", "Laser Platform", "Propulsion Catch", "Repulsion Polarity", "Finale 2", "Finale 3", "Finale 4"];
const CoopMapNames = ["Doors", "Buttons", "Lasers", "Rat Maze", "Laser Crusher", "Behind The Scenes", "Flings", "Infinifling", "Team Retrieval", "Vertical Flings", "Catapults", "Multifling", "Fling Crushers", "Industrial Fan", "Cooperative Bridges", "Bridge Swap", "Fling Block", "Catapult Block", "Bridge Fling", "Turret Walls", "Turret Assassin", "Bridge Testing", "Cooperative Funnels", "Funnel Drill", "Funnel Catch", "Funnel Laser", "Cooperative Polarity", "Funnel Hop", "Advanced Polarity", "Funnel Maze", "Turret Warehouse", "Repulsion Jumps", "Double Bounce", "Bridge Repulsion", "Wall Repulsion", "Propulsion Crushers", "Turret Ninja", "Propulsion Retrieval", "Vault Entrance", "Separation", "Triple Axis", "Catapult Catch", "Bridge Gels", "Maintenance", "Bridge Catch", "Double Lift", "Gel Maze", "Crazier Box"];

const MapNameLabels = document.getElementsByClassName("MapLabel");
const RecordTieMarkers = document.getElementsByClassName("WrTie");
const Top5000Labels = document.getElementsByClassName("Top5000Label");

window.onload = async function() {
    UpdateLabels();
}

async function UpdateLabels() {
    // Map Name
    for (let i = 0; i < MapNameLabels.length; i++) {
        if (i < SpMapNames.length) {
            MapNameLabels[i].textContent = SpMapNames[i];
        }
        else {
            MapNameLabels[i].textContent = CoopMapNames[i - SpMapNames.length];
        }
    }

    // Top 5000
    for (let i = 0; i < Top5000Labels.length; i++) {
        if (i < Sp5000.length) {
            Top5000Labels[i].textContent = Sp5000[i];
        }
        else {
            Top5000Labels[i].textContent = Coop5000[i - Sp5000.length];
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

    for (let i = 0; i < RecordTieMarkers.length; i++) {
        if (i < SpData.length) {
            RecordTieMarkers[i].src = `${CheckRecordTie(SpData[i], Sp5000[i])}.png`;
            SPWr.push(SpData[i]);
        }
        else {
            RecordTieMarkers[i].src = `${CheckRecordTie(CoopData[i - SpData.length], Coop5000[i - SpData.length])}.png`;
            CoopWr.push(CoopData[i]);
        }
    }
}

function CheckRecordTie(WR, Top5000) {
    if (WR == Top5000) {
        return true;
    }
    else {
        return false;
    }
}
