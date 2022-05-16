class Globals {
    
    // Utility
    mod = (sum, n) => ((sum%n)+n)%n;

    validSetOne = (setOne) => setOne.every(pc => pc <= 11 && pc >= 0);
    validSetTwo = (setTwo) => setTwo.every(pc => pc <= 11 && pc >= 0);

    // Errors
    error = () => 'ERROR: Something went wrong';

    validSetConfirmation = (setOne, setTwo) => {
        if (setOne.length === 0 || setTwo.length === 0) {
            return `You need to enter two sets to compare.`
        } else if (this.validSetOne(setOne) && this.validSetTwo(setTwo)) {
            return `Your sets: {${setOne}} and {${setTwo}}`;
        } else if (!this.validSetOne(setOne) && !this.validSetTwo(setTwo)) {
            return `{${setOne}} and {${setTwo}} aren't valid sets.`
        } else if (!this.validSetOne(setOne) && this.validSetTwo(setTwo)) {
            return `{${setOne}} isn't a valid set.`
        } else if (!this.validSetTwo(setTwo) && this.validSetOne(setOne)) {
            return `{${setTwo}} isn't a valid set.`
        } else {
            return this.error;
        }
    };

    invalidSetOne = (setOne, setTwo) => {
        if (!this.validSetOne(setOne) && this.validSetTwo(setTwo)) {
            return `{${setOne}} isn't a valid set.`
        }
    }

    invalidSetTwo = (setOne, setTwo) => {
        if (this.validSetOne(setOne) && !this.validSetTwo(setTwo)) {
            return `{${setTwo}} isn't a valid set.`
        }
    }

    invalidSets = (setOne, setTwo) => {
        if (!this.validSetOne(setOne) && !this.validSetTwo(setTwo)) {
            return `{${setOne}} and {${setTwo}} aren't valid sets.`
        }
    }

    // Length checks
    sameLength = (setOne, setTwo) => setOne.length === setTwo.length;
    neighLength = (setOne,setTwo) => Math.abs(setOne.length-setTwo.length) === 1;
    distLength = (setOne, setTwo) => Math.abs(setOne.length - setTwo.length) > 1;

    // Content checks
    unaltNotesArray = (setOne, setTwo) => setOne.filter(pc => !setTwo.includes(pc));
    altNotesArray = (setOne, setTwo) => setTwo.filter(pc => !setOne.includes(pc));
    unaltNoteValue = (setOne, setTwo) => setOne.filter(pc => !setTwo.includes(pc))[0];
    altNoteValue = (setOne, setTwo) => setTwo.filter(pc => !setOne.includes(pc))[0];

    sameContents = (setOne, setTwo) => {
        return this.unaltNotesArray(setOne, setTwo).length === 0 
        && this.altNotesArray(setOne, setTwo).length === 0;
    };

    addedNote = (setOne, setTwo) => {
        return this.neighLength(setOne, setTwo) 
        && (this.unaltNotesArray(setOne, setTwo).length === 0 
            || this.altNotesArray(setOne, setTwo).length === 0);
    };

    addedNeighNote = (setOne, setTwo) => {
        return this.neighLength(setOne, setTwo)
        && (setTwo.includes(this.mod((this.unaltNoteValue(setOne, setTwo) + 1), 12)) 
            || setTwo.includes(this.mod((this.unaltNoteValue(setOne, setTwo) - 1), 12))) 
        || (setOne.includes(this.mod((this.altNoteValue(setOne, setTwo) + 1), 12)) 
            || setOne.includes(this.mod((this.altNoteValue(setOne, setTwo) - 1), 12)))
    };

    altNote = (setOne, setTwo) => {
        return this.sameLength(setOne, setTwo)
        && this.unaltNotesArray(setOne, setTwo).length === 1;
    };

    neighNote = (setOne, setTwo) => {
        return this.sameLength(setOne, setTwo)
        && (this.mod((this.unaltNoteValue(setOne, setTwo) + 1), 12) === this.altNoteValue(setOne, setTwo)
        || this.mod((this.unaltNoteValue(setOne, setTwo) - 1), 12) === this.altNoteValue(setOne, setTwo))
    };
}

module.exports = Globals