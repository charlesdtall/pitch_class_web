// Checks to see if two given PC sets are neighbors

/* TO-DO:
    1. Integrate HTML form inputs.
    2. Returns need to reveal boxes of info, rather than writing .innerHTML strings.
    3. Clean up any possible code, ESPECIALLY Parsimonious Checkers.
    4. Figure out how localize variables.
    5. Add styling and interactivity (bracelet diagrams, keyboard note input scale-options dropdown menu).
    6. Add an overall Distance/Path Checker to get from one set to another (long-term goal, possibly with matrix adjacency principle from Creel on YouTube).
*/

// GLOBAL

// Allows for modulo calculations of negative numbers (bypassing JavaScript bug).
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
    }


// ARE NEIGHBORS

// Importing elements from HTML.
const neighborsPCSetInput = document.getElementById("neighbors-pc-set-input");
const neighborsPCSetTarget = document.getElementById("neighbors-pc-set-target");
const neighborsAnswer = document.getElementById("neighbors-answer");
const neighborsSubmit = document.getElementById("neighbors-submit");

// Setting necessary local variables.
let pcSetTarget = [];
let pcSetInput = [];

let pcSetTargetValue = '';
let pcSetInputValue = '';

// let pcSetInputValue = neighborsPCSetInput.value;
// let pcSetTargetValue = neighborsPCSetTarget.value;

// pcSetInput = pcSetInputValue.split('').map(Number).sort();
// pcSetTarget = pcSetTargetValue.split('').map(Number).sort();


pcSetTarget = [0, 2, 4, 5, 7, 9, 11];
pcSetInput = [1, 2, 4, 9, 11];



function areNeighbors() {

    let notSharedSetOne = [];
    let notSharedSetTwo = [];
    let setOne = [];
    let setTwo = [];

    // Cardinality Finder: If one set is smaller, assigns it set to setOne.
    if (pcSetInput.length <= pcSetTarget.length) {
        setOne = pcSetInput.map(pcSet => pcSet);
        setTwo = pcSetTarget.map(pcSet => pcSet);
    } else {
        setTwo = pcSetInput.map(pcSet => pcSet);
        setOne = pcSetTarget.map(pcSet => pcSet); 
    };

    // Common Tone Filter: Filters out all common tones.
    notSharedSetOne = setOne.filter(pc => !setTwo.includes(pc));
    notSharedSetTwo = setTwo.filter(pc => !setOne.includes(pc));


    // Relationship Checker: Desides if uncommon tones qualify sets as neighbors.

    // Equality Checker: Checks if they are the same set.
    if(setOne.length === setTwo.length && setOne.every((pc, index) => pc === setTwo[index])) {
        neighborsAnswer.innerHTML = 'These are, surprisingly, the exact same PC Set.'
    } else 

    // Subset Checker: Checks if one set entirely fits within another set.
    if(setOne.length < setTwo.length && setOne.every(pc => setTwo.includes(pc))) {
        neighborsAnswer.innerHTML = 'The smaller of these is a subset of the other.'
    } else 

    // Parsimonious Checker: Checks if sets are a single semitone apart.
    if( (notSharedSetOne[0] === (notSharedSetTwo[0] + 1).mod(12) || notSharedSetOne[0] === (notSharedSetTwo[0] - 1).mod(12))  &&  setOne.length === setTwo.length && notSharedSetOne.length === 1 ) {
        neighborsAnswer.innerHTML = 'Yes, these PC Sets are neighbors!';
    } else 

    // Parsimonious Subset Checker: Checks if one set is a semitone awat from being a subset.
    if ( (setTwo.includes((notSharedSetOne[0]+1).mod(12)) || setTwo.includes((notSharedSetOne[0]-1).mod(12))) && setOne.length < setTwo.length && notSharedSetOne.length === 1 ) {
        neighborsAnswer.innerHTML = 'The shorter of these might be a subset of a neighbor of the longer set.';
    }

    // Concludes sets are not neighbors.
    else {
        neighborsAnswer.innerHTML = 'No, you need a stepping stone...' 
    }

    // Prints setOne, setTwo, pitches that setOne has but setTwo, and vise-versa, respectively. (Temporary feature)
    document.getElementById("console").innerHTML = setOne + ' | ' + setTwo + ' | ' + notSharedSetOne + ' | ' + notSharedSetTwo; 
}

// Calls function.
areNeighbors(pcSetInput, pcSetTarget);


// LOCAL TEST (not updated) AND PRE-WRITTEN SETS
/*
import { c_maj, d_dor, e_phr, f_lyd, g_mix, a_min, b_loc, db_maj, eb_dor, f_phr, g_lyd, ab_mix, bb_min, c_loc, g_maj, a_dor, b_phr, c_lyd, d_mix, e_min, fs_loc, c_M, c_wt } from "./pcsets.js"

let Cmaj, Ddor, Ephr, Flyd, Gmix, Amin, Bloc;
Cmaj = Ddor = Ephr = Flyd = Gmix = Amin = Bloc = [0, 2, 4, 5, 7, 9, 11];

let Dbmaj, Ebdor, Fphr, Glyd, Abmix, Bbmin, Cloc;
Dbmaj = Ebdor = Fphr = Glyd = Abmix = Bbmin = Cloc = [0, 1, 3, 5, 6, 8, 10];

const Gmaj = [0, 2, 4, 6, 7, 9, 11];

const CM = [0, 4, 7];

const Cwt = [0, 2, 4, 6, 8, 10]

let pcSetInput = [];
let pcSetTarget = [];

const stringInput = "0, 4, 7";
const stringTarget = "0, 4, 6";

pcSetInput = stringInput.split(',').map(Number);
pcSetTarget = stringTarget.split(',').map(Number);

console.log(pcSetInput, pcSetTarget)

function areNeighbors() {

    let notSharedP = [];
    let setOne = [];
    let setTwo = [];

    if(pcSetInput === pcSetTarget) {
        return 'These are, surprisingly, the exact same PC Set.'
    }

    if (pcSetInput.length <= pcSetTarget.length) {
        setOne = pcSetInput.map(pcSet => pcSet);
        setTwo = pcSetTarget.map(pcSet => pcSet);
    } else {
        setTwo = pcSetInput.map(pcSet => pcSet);
        setOne = pcSetTarget.map(pcSet => pcSet); 
    };

    notSharedP = setOne.filter(pc => !setTwo.includes(pc));

    if(setOne.length === setTwo.length && notSharedP.length === 1 &&  function() { setTwo.includes(notSharedP[0]+1)%12 || setTwo.includes((notSharedP[0]-1)%12)}) {
        return 'These PC Sets are neighbors!'
    } else if(setOne.length < setTwo.length && notSharedP.length === 0) {
        return 'One of these is a subset of the other.'
    }
    return 'You need a stepping stone...'
}

console.log(areNeighbors());
*/


// let sharedP = [];

// Puts sets in order such that the smaller set is checked against the larger set in upcoming steps.
// This allows subsets to count as being fully-shared.
/*
const cardinalityOrder = () => {
    let setOne = [];
    let setTwo = [];
    if (pcSetInput.length < pcSetTarget.length || pcSetInput.length === pcSetTarget.length) {
        setOne = pcSetInput.map(pcSet => pcSet);
        setTwo = pcSetTarget.map(pcSet => pcSet);
    } else {
        setTwo = pcSetInput.map(pcSet => pcSet);
        setOne = pcSetTarget.map(pcSet => pcSet); 
    }
}
*/

// const commonTones = (setOne, setTwo) => sharedP = setOne.filter(pc => setTwo.includes(pc));

// const uncommonTones = () => let notSharedP = setOne.filter(pc => !setTwo.includes(pc));

// const parsimonious = () => setTwo.includes((notSharedP[0]+1)%12) || setTwo.includes((notSharedP[0]-1)%12);

/*
const finalCheck = () => {
if(setOne.length === setTwo.length && notSharedP.length === 0) {
    return 'These are the same PC Set!'
} else if(setOne.length === setTwo.length && notSharedP.length === 1 &&  function parsimonious() { setTwo.includes((notSharedP[0]+1)%12) || setTwo.includes((notSharedP[0]-1)%12)}) {
    return 'These PC Sets are neighbors!'
} else if(setOne.length < setTwo.length && notSharedP.length === 0) {
    return 'One of these is a subset of the other.'
}
return 'You need a stepping stone...'
};
*/





