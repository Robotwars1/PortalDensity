const SpRecords = "SpRecord.json";
const CoopRecords = "CoopRecord.json";

// Numbers gotten via C# script cause no way to circumvent CORS isues while hosting on Github Pages
const Sp5000 = [3, 1, 3, 5, 6, 3, 2, 3, 2, 3, 2, 7, 4, 6, 5, 0, 2, 0, 2, 3, 5, 10, 0, 2, 2, 7, 8, 3, 10, 9, 10, 10, 17, 10, 19, 12, 35, 34, 3, 7, 7, 6, 5, 7, 12, 18, 11, 11, 17, 8, 11];
const Coop5000 = [2, 7, 8, 4, 2, 0, 9, 6, 5, 4, 15, 11, 8, 12, 11, 8, 5, 12, 18, 16, 23, 15, 5, 5, 9, 12, 3, 6, 10, 16, 25, 3, 13, 12, 24, 30, 15, 12, 64, 23, 13, 27, 59, 54, 6, 51, 61, 65];

const SpMapNames = ["Portal Gun", "Smooth Jazz", "Cube Momentum", "Future Starter", "Incinerator", "Laser Stairs", "Dual Lasers", "Laser Over Goo", "Trust Fling", "Pit Flings", "Fizzler Intro", "Ceiling Catapult", "Ricochet", "Bridge Intro", "Bridge the Gap", "Turret Intro", "Laser Relays", "Turret Blocker", "Laser vs Turret", "Pull the Rug", "Column Blocker", "Laser Chaining", "Triple Laser", "Jail Break", "Escape", "Turret Factory", "Turret Sabotage", "Neurotoxin Sabotage", "Underground", "Cave Johnson", "Repulsion Intro", "Bomb Flings", "Crazy Box", "PotatOS", "Propulsion Intro", "Propulsion Flings", "Conversion Intro", "Three Gels", "Funnel Intro", "Ceiling Button", "Wall Button", "Polarity", "Funnel Catch", "Stop the Box", "Laser Catapult", "Laser Platform", "Propulsion Catch", "Repulsion Polarity", "Finale 2", "Finale 3", "Finale 4"];
const CoopMapNames = ["Doors", "Buttons", "Lasers", "Rat Maze", "Laser Crusher", "Behind The Scenes", "Flings", "Infinifling", "Team Retrieval", "Vertical Flings", "Catapults", "Multifling", "Fling Crushers", "Industrial Fan", "Cooperative Bridges", "Bridge Swap", "Fling Block", "Catapult Block", "Bridge Fling", "Turret Walls", "Turret Assassin", "Bridge Testing", "Cooperative Funnels", "Funnel Drill", "Funnel Catch", "Funnel Laser", "Cooperative Polarity", "Funnel Hop", "Advanced Polarity", "Funnel Maze", "Turret Warehouse", "Repulsion Jumps", "Double Bounce", "Bridge Repulsion", "Wall Repulsion", "Propulsion Crushers", "Turret Ninja", "Propulsion Retrieval", "Vault Entrance", "Separation", "Triple Axis", "Catapult Catch", "Bridge Gels", "Maintenance", "Bridge Catch", "Double Lift", "Gel Maze", "Crazier Box"];

// 3 Arrays of elements of equal length (Equal length part being what big for loop under is based on)
const MapNameLabels = document.getElementsByClassName("MapLabel");
const RecordTieMarkers = document.getElementsByClassName("WrTie");
const Top5000Labels = document.getElementsByClassName("Top5000Label");

window.onload = async function() {
    UpdateLabels();
}

async function UpdateLabels() {
    // Parse Jsons
    let SpJson = await fetch(SpRecords);
    let SpData = await SpJson.json();
    let CoopJson = await fetch(CoopRecords);
    let CoopData = await CoopJson.json();

    let SPWr = [];
    let CoopWr = [];

    // Set all elements
    for (let i = 0; i < MapNameLabels.length; i++) {
        // WR Indicator
        let RecordTie = false;

        if (i < SpData.length) {
            RecordTie = CheckRecordTie(SpData[i], Sp5000[i]);
            RecordTieMarkers[i].src = `${RecordTie}.png`;
            SPWr.push(SpData[i]);
        }
        else {
            RecordTie = CheckRecordTie(CoopData[i - SpData.length], Coop5000[i - SpData.length]);
            RecordTieMarkers[i].src = `${RecordTie}.png`;
            CoopWr.push(CoopData[i]);
        }

        // Map Name
        if (i < SpMapNames.length) {
            MapNameLabels[i].textContent = SpMapNames[i];
        }
        else {
            MapNameLabels[i].textContent = CoopMapNames[i - SpMapNames.length];
        }

        // Top 5000
        // If not RecordTie lower count by 1 to make it more likely that the shown number is what is actually 
        // required to get onto lp boards. OBS. Only does check of score is more than 2 portals for accuracy reasons
        if (i < Sp5000.length) {
            if (RecordTie) {
                Top5000Labels[i].textContent = Sp5000[i];
            }
            else if (Sp5000[i] > 2) {
                Top5000Labels[i].textContent = Sp5000[i] - 1;
            }
        }
        else {
            if (RecordTie) {
                Top5000Labels[i].textContent = Coop5000[i - Sp5000.length];
            }
            else if (Coop5000[i - Sp5000.length] > 2) {
                Top5000Labels[i].textContent = Coop5000[i - Sp5000.length] - 1;
            }
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
