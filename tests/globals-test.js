const globals = require("../modules/globals.js");
const Globals = new globals();

var assert = require('assert');

describe("Globals", () => {
    describe("utilities", () => {
        it("properly calculates modulo including negative numbers", () => {
            let sum = 0 - 1;
            let expectedResult = 11;

            let result = Globals.mod(sum, 12);

            assert.strictEqual(result, expectedResult);
        });

        it("logs error message", () => {
            let expectedResult = 'ERROR: Something went wrong';
            let result = Globals.error();

            assert.strictEqual(result, expectedResult);
        });

        it("confirms setOne is valid", () => {
            let setOne = [1, 2, 3, 4]
            let expectedResult = true;

            let result = Globals.validSetOne(setOne);

            assert.strictEqual(result, expectedResult);
        });

        it("confirms setTwo is valid", () => {
            let setTwo = [1, 2, 3, 4]
            let expectedResult = true;

            let result = Globals.validSetOne(setTwo);

            assert.strictEqual(result, expectedResult);
        });

    });

    describe("errors", () => {
        it("throws error with invalid set if it's set one, but set two is valid", () => {
            let setOne = [0, 1, 2, 3, 12];
            let setTwo = [1, 2, 3, 11];
            let expectedResult = `{0,1,2,3,12} isn't a valid set.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("throws error with invalid set if it's set two, but set one is valid", () => {
            let setOne = [0, 1, 2, 3, 11];
            let setTwo = [1, 2, 3, 12];
            let expectedResult = `{1,2,3,12} isn't a valid set.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("throws error if both sets are invalid, returns sets", () => {
            let setOne = [-1, 1, 2, 3, 11];
            let setTwo = [1, 2, 3, 12];
            let expectedResult = `{-1,1,2,3,11} and {1,2,3,12} aren't valid sets.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("throws error for both empty sets", () => {
            let setOne = [];
            let setTwo = [];
            let expectedResult = `You need to enter two sets to compare.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("throws error if only setOne is empty", () => {
            let setOne = [];
            let setTwo = [0, 1, 2, 3];
            let expectedResult = `You need to enter two sets to compare.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("throws error if only setTwo is empty", () => {
            let setOne = [0, 1, 2, 3];
            let setTwo = [];
            let expectedResult = `You need to enter two sets to compare.`;

            let result = Globals.validSetConfirmation(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });
    });

    describe("lengthCheck", () => {

        describe("sameLength", () => {
            it("sets are of equal length", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = true;

                let result = Globals.sameLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("only sameLength sets pass sameLength test", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 3];
                let expectedResult = false;

                let result = Globals.sameLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });
        });

        describe("neighLength", () => {
            it("one set is one unit shorter than the other", () => {
                let setOne = [0, 1, 2];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = true;
    
                let result = Globals.neighLength(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });

            it("one set is one unit shorter than the other", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = true;

                let result = Globals.neighLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("sameLength sets don't pass neighLength test", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = false;

                let result = Globals.neighLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("distLength sets don't pass neighLength test", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2];
                let expectedResult = false;

                let result = Globals.neighLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });
        });

        describe("distLength", () => {
            it("sets are greater than one unit of length from each other", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 2];
                let expectedResult = true;

                let result = Globals.distLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("sameLength sets don't pass distLength test", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = false;

                let result = Globals.distLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("neighLength sets don't pass distLength test", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = false;

                let result = Globals.distLength(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });
        });
    });

    describe("contentOverlap", () => {



        describe("addedNote", () => {
            it("one set has a single extra note than the other", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = true;

                let result = Globals.addedNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("one set has a single extra note than the other", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = true;

                let result = Globals.addedNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("addedNote does not pass sameContent sets", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = false;

                let result = Globals.addedNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("addedNote does not pass dist.length sets", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [0, 1, 2, 3, 4, 5];
                let expectedResult = false;

                let result = Globals.addedNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("addedNote does not pass sameLength but different content sets", () => {
                let setOne = [0, 1, 2, 3, 4, 6];
                let setTwo = [0, 1, 2, 3, 4, 5];
                let expectedResult = false;

                let result = Globals.addedNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("returns array of all notes in setOne that aren't in setTwo", () => {
                let setOne = [0, 1, 2, 3, 5, 6];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = [5, 6];

                let result = Globals.unaltNotesArray(setOne, setTwo);

                assert.deepStrictEqual(result, expectedResult);
            });

            it("returns array of all notes in setOne that aren't in setTwo", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [0, 1, 2, 3, 5, 6];
                let expectedResult = [5, 6];

                let result = Globals.altNotesArray(setOne, setTwo);

                assert.deepStrictEqual(result, expectedResult);
            });

            it("returns note in setOne that isn't in setTwo of neighLength sets", () => {
                let setOne = [0, 1, 2, 3, 4, 5];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = 5;

                let result = Globals.unaltNoteValue(setOne, setTwo);

                assert.strictEqual(result, expectedResult)
            });

            it("returns note in setTwo that isn't in setOne of neighLength sets", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3, 4, 5];
                let expectedResult = 5;

                let result = Globals.altNoteValue(setOne, setTwo);

                assert.strictEqual(result, expectedResult)
            });

            it("added note is a neighbor", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3]
                let expectedResult = true;
    
                let result = Globals.addedNeighNote(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });
    
            it("added note is a neighbor", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [0, 1, 2, 3, 4]
                let expectedResult = true;
    
                let result = Globals.addedNeighNote(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });
        });

        describe("altNotes", () => {
            it("sameLength sets have different content by one note", () => {
                let setOne = [0, 1, 2, 3, 6];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = true;

                let result = Globals.altNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("altNote does not pass sets with more than one altNote", () => {
                let setOne = [0, 1, 2, 6, 5];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = false;

                let result = Globals.altNote(setOne, setTwo);

                assert.strictEqual(result, expectedResult);
            });

            it("returns note in setOne that isn't in setTwo of sameLength sets", () => {
                let setOne = [0, 1, 2, 3, 5];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = 5;
    
                let result = Globals.unaltNoteValue(setOne, setTwo);
    
                assert.deepStrictEqual(result, expectedResult)
            });
    
            it("returns note in setTwo that isn't in setOne of sameLength sets", () => {
                let setOne = [0, 1, 2, 3, 5];
                let setTwo = [0, 1, 2, 3, 4];
                let expectedResult = 4;
    
                let result = Globals.altNoteValue(setOne, setTwo);
    
                assert.deepStrictEqual(result, expectedResult)
            });

            it("returns unaltNoteValue + 1 modulo 12", () => {
                let setOne = [1, 2, 3, 11];
                let setTwo = [0, 1, 2, 3];
                let expectedResult = true;
    
                let result = Globals.neighNote(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });
    
            it("returns unaltNoteValue - 1 modulo 12", () => {
                let setOne = [0, 1, 2, 3];
                let setTwo = [1, 2, 3, 11];
                let expectedResult = true;
    
                let result = Globals.neighNote(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });

            it("returns unaltNoteValue +- 1", () => {
                let setOne = [0, 1, 2, 3, 4];
                let setTwo = [0, 1, 2, 3, 5];
                let expectedResult = true;
    
                let result = Globals.neighNote(setOne, setTwo);
    
                assert.strictEqual(result, expectedResult);
            });
        });
    });
});
