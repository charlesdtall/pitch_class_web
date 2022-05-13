// Checks to see if two given PC sets are neighbors

/* TO-DO:
    1. Integrate HTML form inputs.
    2. Returns need to reveal boxes of info, rather than writing .innerHTML strings.
    3. Clean up any possible code, ESPECIALLY Parsimonious Checkers.
    4. Figure out how localize variables.
    5. Add styling and interactivity (bracelet diagrams, keyboard note input scale-options dropdown menu).
    6. Add an overall Distance/Path Checker to get from one set to another (long-term goal, possibly with matrix adjacency principle from Creel on YouTube).
    7. Need to figure out how to make input formatting more flexible.

*/

// GLOBAL

// Allows for modulo calculations of negative numbers (bypassing JavaScript bug).
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
    }



function pitchTranslation(set) {

    const naturals = ['c', '', 'd', '', 'e', 'f', '', 'g', '', 'a', '', 'b'];
    const sharps = ['b#', 'c#', '', 'd#', '', 'e#', 'f#', '', 'g#', '', 'a#', ''];
    const flats = ['', 'db', '', 'eb', 'fb', '', 'gb', '', 'ab', '', 'bb', 'cb'];

    set = set.toLowerCase().split(', ').map(px => px);

    let pcSet = [];

    for (let i = 0; i < set.length; i++) {
        if (naturals.includes(set[i])) {
            pcSet.push(naturals.indexOf(set[i]));
        } else if (sharps.includes(set[i])) {
            pcSet.push(sharps.indexOf(set[i]));
        } else if (flats.includes(set[i])) {
            pcSet.push(flats.indexOf(set[i]));
        } else {
            pcSet.push(~~set[i]);;
        }
    }

    return pcSet

}


function reversePitchTranslation(set) {


    let pcSet = [];

    for (let i = 0; i < set.length; i++) {
        switch (set[i]) {
            case 0:
                pcSet.push('C');
                break;
            case 1:
                pcSet.push('C#/Db');
                break;
            case 2:
                pcSet.push('D');
                break;
            case 3:
                pcSet.push('D#/Eb');
                break;
            case 4:
                pcSet.push('E');
                break;
            case 5:
                pcSet.push('F');
                break;
            case 6:
                pcSet.push('F#/Gb');
                break;
            case 7:
                pcSet.push('G');
                break;
            case 8:
                pcSet.push('G#/Ab');
                break;
            case 9:
                pcSet.push('A');
                break;
            case 10:
                pcSet.push('A#/Bb');
                break;
            case 11:
                pcSet.push('B');
                break;
        }
    }

    return pcSet.join(', ');
}

/* ====================================================================== */

// ARE NEIGHBORS

// Importing elements from HTML.
const neighborsPCSetInput = document.getElementById("neighbors-pc-set-input");
const neighborsPCSetTarget = document.getElementById("neighbors-pc-set-target");
const neighborsAnswer = document.getElementById("neighbors-answer");
const neighborsSubmit = document.getElementById("neighbors-submit");
const neighborsInput = document.getElementById("neighbors-input");



function areNeighbors() {

    let pcSetInput = pitchTranslation(neighborsPCSetInput.value);
    let pcSetTarget = pitchTranslation(neighborsPCSetTarget.value);

    let setOne = [];
    let setTwo = [];

    
    // Cardinality Finder: If one set is smaller, assigns it set to setOne.
    if (pcSetInput.length <= pcSetTarget.length) {
        setOne = pcSetInput.map(pc => pc).sort(function(a, b){ return a - b });
        setTwo = pcSetTarget.map(pc => pc).sort(function(a, b){ return a - b });
    } else {
        setTwo = pcSetInput.map(pc => pc).sort(function(a, b){ return a - b });
        setOne = pcSetTarget.map(pc => pc).sort(function(a, b){ return a - b });
    };

    // Common Tone Filter: Filters out all common tones.
    let notSharedSetOne = setOne.filter(pc => !setTwo.includes(pc));
    let notSharedSetTwo = setTwo.filter(pc => !setOne.includes(pc));

    // Prints setOne, setTwo, pitches that setOne has but setTwo, and vise-versa, respectively. (Temporary feature)
    document.getElementById("console").innerHTML = '<p>First set: ' + setOne + ' (' + reversePitchTranslation(setOne) + ')</p> <p>Second set: ' + setTwo + ' (' + reversePitchTranslation(setTwo) + ')</p><p>Uncommon tones: ' + notSharedSetOne + ' (' + reversePitchTranslation(notSharedSetOne) + ') | ' + notSharedSetTwo + ' (' + reversePitchTranslation(notSharedSetTwo) + ')</p>';

    // Relationship Checker: Desides if uncommon tones qualify sets as neighbors.

    // Equality Checker: Checks if they are the same set.
    if(setOne.length === setTwo.length && setOne.every((pc, index) => pc === setTwo[index])) {
        return 'These are, surprisingly, the exact same PC Set.'
    } else 

    // Subset Checker: Checks if one set entirely fits within another set.
    if(setOne.length < setTwo.length && setOne.every(pc => setTwo.includes(pc))) {
        return 'The smaller of these is a subset of the other.'
    } else 

    // Parsimonious Checker: Checks if sets are a single semitone apart.
    if( (notSharedSetOne[0] === (notSharedSetTwo[0] + 1).mod(12) || notSharedSetOne[0] === (notSharedSetTwo[0] - 1).mod(12))  &&  setOne.length === setTwo.length && notSharedSetOne.length === 1 ) {
        return 'Yes, these PC Sets are neighbors!';
    } else 

    // Parsimonious Subset Checker: Checks if one set is a semitone away from being a subset.
    if ( (setTwo.includes((notSharedSetOne[0]+1).mod(12)) || setTwo.includes((notSharedSetOne[0]-1).mod(12))) && setOne.length < setTwo.length && notSharedSetOne.length === 1 ) {
        return 'The shorter of these might be a subset of a neighbor of the longer set.';
    }

    // Concludes sets are not neighbors.
    else {
        return 'No, you need a stepping stone...' 
    }

}

// Calls function.
neighborsSubmit.onclick = function neighborsSubmit() { 
    neighborsAnswer.innerHTML = areNeighbors(); 

    neighborsInput.addEventListener('submit', function(event){event.preventDefault();});
}


/* ====================================================================== */

// PRE-WRITTEN SETS
/*
import { c_maj, d_dor, e_phr, f_lyd, g_mix, a_min, b_loc, db_maj, eb_dor, f_phr, g_lyd, ab_mix, bb_min, c_loc, g_maj, a_dor, b_phr, c_lyd, d_mix, e_min, fs_loc, c_M, c_wt } from "./pcsets.js"

let Cmaj, Ddor, Ephr, Flyd, Gmix, Amin, Bloc;
Cmaj = Ddor = Ephr = Flyd = Gmix = Amin = Bloc = [0, 2, 4, 5, 7, 9, 11];

let Dbmaj, Ebdor, Fphr, Glyd, Abmix, Bbmin, Cloc;
Dbmaj = Ebdor = Fphr = Glyd = Abmix = Bbmin = Cloc = [0, 1, 3, 5, 6, 8, 10];

const Gmaj = [0, 2, 4, 6, 7, 9, 11];

const CM = [0, 4, 7];

const Cwt = [0, 2, 4, 6, 8, 10]

*/