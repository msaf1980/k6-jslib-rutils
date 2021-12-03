import { check } from 'k6';

import { getString } from '../src/rutils.js'

export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate==1.00'],
    }
}

export default function main() {
    let nullString = getString(null, "null_string")
    console.log("nullString: '" + nullString + "'")

    let undefString = getString(`${__ENV.UNDEF_STRING}`, "empty_string");
    console.log("UNDEF_STRING='" + undefString + "'");

    let varString = getString(`${__ENV.VAR_STRING}`, "empty_string");
    console.log("VAR_STRING='" + varString + "'");

    check(null, {
        'NULL_STRING=null_string': () => nullString == "null_string",
        'UNDEF_STRING=empty_string': () => undefString == "empty_string",
        'VAR_STRING=string': () => varString == "string",
    });
}
