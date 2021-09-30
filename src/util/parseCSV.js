/**
 * Parses the content of a CSV file into an array. 
 * 
 * @param {string} data content of CSV file
 * @returns {array} each row is parsed into an object where the keys are the 
 * csv headers and the values are the row values
 */
export function parseCSV (data) {
    // Split data into lines and separate headers from actual data
    // using Array spread operator
    const [headerLine, ...lines] = data.split('\n');

    // Split headers line into an array
    // `valueSeparator` may come from some kind of argument
    // You may want to transform header strings into something more
    // usable, like `camelCase` or `lowercase-space-to-dash`
    const valueSeparator = ',';
    const headers = headerLine.split(valueSeparator);

    // Create objects from parsing lines
    // There will be as much objects as lines
    const objects = lines
        .map( (line, index) =>
            line
                // Split line with value separators
                .split(valueSeparator)

                // Reduce values array into an object like: { [header]: value }
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
                .reduce((object, value, index) => ({
                    ...object, [ headers[index] ]: value,
                }),{})
    );

    return objects;
}

/**
 * Parses the CSV file for infomration about the position configuration
 * of the league.
 * 
 * @param {string} filename name of the csv file being uploaded
 * @returns {object} describes the positions of the league
 */
export function parsePositionSettings (filename) {
    // position stored at each index
    const positionMap = {
        2: 'QB',
        3: 'RB',
        4: 'WR',
        5: 'TE',
        6: 'RB/WR/TE',
        7: 'RB/WR',
        8: 'WR/TE',
        9: 'QB/RB/WR/TE'
    }

    const filenameArr = filename.split(',');

    let positions = {};

    for (let i in positionMap) {
        positions[positionMap[i]] = parseInt(filenameArr[i]);
    }

    console.log('positions', positions);
    return positions;
}

/**
 * @param {string} filename name of the csv file being uploaded
 * @returns {int} number of teams in the league
 */
export function parseNumTeams (filename) {
    console.log('numTeams', filename.split(',')[0]);
    return filename.split(',')[0];
}