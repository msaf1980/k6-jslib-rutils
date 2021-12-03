import { check } from 'k6';

import { getIntOrdered2 } from '../src/rutils.js'

export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate==1.00'],
    }
}

export default function main() {
    let nullNum = getIntOrdered2(null, "11")
    console.log("NULL_NUM: '" + nullNum[0] + "':'" + nullNum[1] + "'")

    let undefNum = getIntOrdered2(`${__ENV.UNDEF_NUM}`, "22");
    console.log("UNDEF_STRING='" + undefNum[0] + "':'" + undefNum[1] + "'");

    let varNum = getIntOrdered2(`${__ENV.VAR_NUM}`, "22");
    console.log("VAR_NUM='" + varNum[0] + "':'" + varNum[1] + "'");

    let varNum2_1 = getIntOrdered2(`${__ENV.VAR_NUM2_1}`, "22");
    console.log("VAR_NUM2_1='" + varNum2_1[0] + "':'" + varNum2_1[1] + "'");

    console.log(`${__ENV.VAR_NUM2_2}`);
    let varNum2_2 = getIntOrdered2(`${__ENV.VAR_NUM2_2}`, "22");
    console.log("VAR_NUM2_2='" + varNum2_2[0] + "':'" + varNum2_2[1] + "'");

    check(null, {
        'NULL_NUM=11:11': () => nullNum[0] == 11 && nullNum[1] == 11,
        'UNDEF_NUM=22:22': () => undefNum[0] == 22 && undefNum[1] == 22,
        'VAR_NUM=33:33': () => varNum[0] == 33 && varNum[1] == 33,
        'VAR_NUM2_1=44:561': () => varNum2_1[0] == 44 && varNum2_1[1] == 561,
        'VAR_NUM2_2=14:561': () => varNum2_2[0] == 14 && varNum2_2[1] == 561,
    });
}
