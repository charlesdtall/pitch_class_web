const globals = require("./globals.js");
const Globals = new globals();

class Neighbors {
    areNeighbors = (setOne, setTwo) => Globals.addedNeighNote(setOne, setTwo) || Globals.neighNote(setOne, setTwo)
}

class EqualSets {
    areEqual = (setOne, setTwo) => Globals.sameContents(setOne, setTwo); 
}

class Subsets {
    isSubset = (setOne, setTwo) => {
        return (Globals.unaltNotesArray(setOne, setTwo).length === 0 && Globals.altNotesArray(setOne, setTwo).length > 1) || (Globals.altNotesArray(setOne, setTwo).length === 0 && Globals.unaltNotesArray(setOne, setTwo).length > 1);
    }
}

module.exports = {Neighbors, EqualSets, Subsets}