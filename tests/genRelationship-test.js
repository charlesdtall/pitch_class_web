const GenRelationship = require("../modules/genRelationship.js");
const Neighbors = new GenRelationship.Neighbors();
const EqualSets = new GenRelationship.EqualSets();
const Subsets = new GenRelationship.Subsets();

var assert = require('assert');

describe("genRelationship", () => {
    describe("Neighbors", () => {
        it("returns true if neighbors", () => {
            let setOne = [0, 1, 2, 3];
            let setTwo = [0, 1, 2, 4]
            let expectedResult = true;

            let result = Neighbors.areNeighbors(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("returns true if neighbors", () => {
            let setOne = [0, 1, 2, 3];
            let setTwo = [0, 1, 2]
            let expectedResult = true;

            let result = Neighbors.areNeighbors(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("returns false if not neighbors", () => {
            let setOne = [0, 1, 2, 3, 5, 6];
            let setTwo = [0, 1, 2, 3]
            let expectedResult = false;

            let result = Neighbors.areNeighbors(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("returns false if not neighbors", () => {
            let setOne = [0, 1, 2, 3, 5];
            let setTwo = [0, 1, 2, 3]
            let expectedResult = false;

            let result = Neighbors.areNeighbors(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });
    });

    describe("EqualSets", () => {
        it("passes sets with exactly the same contents", () => {
            let setOne = [0, 1, 2, 3, 4];
            let setTwo = [0, 1, 2, 3, 4];
            let expectedResult = true;

            let result = EqualSets.areEqual(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("areEqual does not pass sets with different length contents", () => {
            let setOne = [0, 1, 2, 3, 4];
            let setTwo = [0, 1, 2, 3];
            let expectedResult = false;

            let result = EqualSets.areEqual(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("areEqual does not pass sets with different contents", () => {
            let setOne = [0, 1, 2, 3, 4];
            let setTwo = [0, 1, 2, 3, 5];
            let expectedResult = false;

            let result = EqualSets.areEqual(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });
    });

    describe("Subsets", () => {
        it("setOne is a subset of setTwo", () => {
            let setOne = [0, 1, 2];
            let setTwo = [0, 1, 2, 3, 4];
            let expectedResult = true;

            let result = Subsets.isSubset(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });

        it("setOne is a subset of setTwo", () => {
            let setOne = [0, 1, 2, 3, 4];
            let setTwo = [0, 1, 2];
            let expectedResult = true;

            let result = Subsets.isSubset(setOne, setTwo);

            assert.strictEqual(result, expectedResult);
        });
    });
});