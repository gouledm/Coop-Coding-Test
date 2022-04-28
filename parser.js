const fs = require('fs')

try {
    // open the file and store all the text
    const data = fs.readFileSync(process.argv[2], 'utf8');

    // matches any entries in data that match the regex, then splits it into customer number and account number. [0][0] selects the first match returned
    const custAccNumber = [...data.matchAll(/[0-9]{7} - [0-9]{8}/)][0][0].split(' - ')
    console.log(`Customer number is ${custAccNumber[0]}`)
    console.log(`Account number is ${custAccNumber[1]}`)

    // search for anything in the format "XXX 00, 0000 to XXX 00, 0000" where 0 is a number and X is a letter. First 0 in the day can be omitted.
    console.log(`Bill period is ${[...data.matchAll(/[A-Za-z]{3} [0-9]{1,2}, [0-9]{4} to [A-Za-z]{3} [0-9]{1,2}, [0-9]{4}/)][0][0]}`)

    // index [0][1] selects the first capture group instead of the first match
    console.log(`Bill number is ${[...data.matchAll(/Bill number: ([0-9]+)/)][0][1]}`)

    // search for anything in the format "XXX 00, 0000 to XXX 00, 0000" where 0 is a number and X is a letter. First 0 in the day can be omitted.
    console.log(`Bill date is ${[...data.matchAll(/Bill date: ([A-Za-z]{3} [0-9]{1,2}, [0-9]{4})/)][0][1]}`)

    // detects a dollar sign, followed by any amount of 3-group numbers with or without a following comma, and then .00 where 0 can be any number. This means it can detect $10.00 or $100,000.00
    console.log(`Total new charges are ${[...data.matchAll(/Total new charges\s+(\$([0-9]{0,3},{0,1})+\.[0-9]{2})/)][0][1]}`)

} catch (err) {
    console.error("There was an issue opening that file- does it exist?", err);
}