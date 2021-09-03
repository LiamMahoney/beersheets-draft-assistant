const parseCSV = (data) => {
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

export default parseCSV