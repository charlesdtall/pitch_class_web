
let pcEquivalencies = [['c', 'b#', '0'], ['c#', 'db', '1'], ['d', '2'], ['d#', 'eb', '3'], ['e', 'fb', '4'], ['f', 'e#', '5'], ['f#', 'gb', '6'], ['g', '7'], ['g#', 'ab', '8'], ['a', '9'], ['a#', 'bb', '10'], ['b', 'cb', '11']]

let neighborsPCSetInputTest = 'bb,b,e';
let neighborsPCSetTargetTest = 'd, e, f';

// let pcSet = new Set();

let inputPCSet = neighborsPCSetInputTest.split(',').map(px => px);

console.log(inputPCSet)

const naturals = ['c', '', 'd', '', 'e', 'f', '', 'g', '', 'a', '', 'b'];
const sharps = ['b#', 'c#', '', 'd#', '', 'e#', 'f#', '', 'g#', '', 'a#', ''];
const flats = ['', 'db', '', 'eb', 'fb', '', 'gb', '', 'ab', '', 'bb', 'cb'];



      let pcSet = [];

function pitchTranslation(set) {

    for (let i = 0; i < set.length; i++) {
        if (naturals.includes(set[i])) {
            pcSet.push(naturals.indexOf(set[i]));
        } else if (sharps.includes(set[i])) {
            pcSet.push(sharps.indexOf(set[i]));
        } else if (flats.includes(set[i])) {
            pcSet.push(flats.indexOf(set[i]));
        } else {
            return "I don't recognize one of these pitches";
        }
    }

    return pcSet

}

console.log(translation(inputPCSet));


/*
    function pitchTranslation(set) {

        let originalSet = set.toLowerCase();
    
        
  
    
        originalSet = set.toLowerCase();
        for (let i = 0; i < originalSet.length; i++) {
            switch (originalSet[i]) {
                case 'c' || 'b#' || '0':
                    pcSet.push(0);
                    break;
                case 'c#' || 'db' || '1':
                    pcSet.push(1);
                    break;
                case 'd' || '2':
                    pcSet.push(2);
                    break;
                case 'd#' || 'eb' || '3':
                    pcSet.push(3);
                    break;
                case 'e' || 'fb' || '4':
                    pcSet.push(4);
                    break;
                case 'f' || 'e#' || '5':
                    pcSet.push(5);
                    break;
                case 'f#' || 'gb' || '6':
                    pcSet.push(6);
                    break;
                case 'g' || '7':
                    pcSet.push(7);
                    break;
                case 'g#' || 'ab' || '8':
                    pcSet.push(8);
                    break;
                case 'a' || '9':
                    pcSet.push(9);
                    break;
                case 'a#' || 'bb' || '10':
                    pcSet.push(10);
                    break;
                case 'b' || 'cb' || '11':
                    pcSet.push(11);
                    break;
            }
        }
        return pcSet;
        
    }

*/

