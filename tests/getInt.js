import { check } from 'k6';

import { getInt } from '../src/rutils.js'

export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate==1.00'],
    }
}

export default function main() {
    let nullNum = getInt(null, 11)
    console.log("NULL_NUM: '" + nullNum + "'")

    let undefNum = getInt(`${__ENV.UNDEF_NUM}`, 22);
    console.log("UNDEF_STRING='" + undefNum + "'");

    let varNum = getInt(`${__ENV.VAR_NUM}`, 22);
    console.log("VAR_NUM='" + varNum + "'");

    let notNum = getInt(`${__ENV.NOT_NUM}`, 22);
    console.log("NOT_NUM='" + notNum + "'");

    check(null, {
        'NULL_NUM=11': () => nullNum == 11,
        'UNDEF_NUM=22': () => undefNum == 22,
        'VAR_NUM=33': () => varNum == 33,
        'NOT_NUM=NaN': () => isNaN(notNum),
    });
}
