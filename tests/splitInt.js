import { check } from 'k6';

import { splitIntOrdered2 } from '../src/rutils.js'

export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate==1.00'],
    }
}

export default function main() {
    let d = splitIntOrdered2('', '10', ':')
    console.log("default: '" + d[0] + "':'" + d[1] + "'")

    let one = splitIntOrdered2('12', '10', ':')
    console.log("one: '" + one[0] + "':'" + one[1] + "'")

    let two = splitIntOrdered2('654:2', '10', ':')
    console.log("two: '" + two[0] + "':'" + two[1] + "'")

    check(null, {
        'default': () => d[0] == 10 && d[1] == 10,
        'one': () => one[0] == 12 && one[1] == 12,
        'two': () => two[0] == 2 && two[1] == 654,
    });
}
