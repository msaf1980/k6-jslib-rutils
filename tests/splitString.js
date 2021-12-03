import { check } from 'k6';

import { splitString2 } from '../src/rutils.js'

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: ['rate==1.00'],
  }  
}

export default function main() {

  let one = splitString2('12', ':')
  console.log("one: '" + one[0] + "':'" + one[1] + "'")

  let two = splitString2('654:2', ':')
  console.log("two: '" + two[0] + "':'" + two[1] + "'")

  check(null, {
    'one': () => one[0] == '12' && one[1] == '12',
    'two': () => two[0] == '654' && two[1] == '2',
  });

}
