# k6-jslib-rutils
A collection of small utility functions useful during load testing with k6. 

```javascript
function uuidv4() string // Random password like xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx

function findBetween(content, left, right) string // Extract substring beetween left and right strings

function randomInt(min, max) int, int // Random int in range min and max included

function randomItem(arrayOfItems) any // return random array item

function randomFixedString(length) string // Random fixed length string

function splitString2(content, delim) [string, string] // Split string woth delimiter

function splitIntOrdered2(content, defaultValue, delim = ':') [string, string] // Split string (with 2 numbers - min and max). Not a number translated to NoN. If part of string contains a number (line 1a), parse int is seccessed

function getString(content, defaultValue) string // String with default value (for expand env var)

function getInt(content, defaultValue) int // Number with default (string) value (for expand env var). Not a number translated to NoN. If part of string contains a number (line 1a), parse int is seccessed

function getIntOrdered2(content, defaultValue, delim = ':') [int, int] //  // Like splitIntOrdered2, but also check content for undefined (for expand env var)
```

## Example

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

import { 
    randomInt, 
    randomFixedString,
    randomItem,
    getIntOrdered2,
} from "./src/rutils.js";

 // configurable random delay
let DELAY = getIntOrdered2(`${__ENV.DELAY}`, "8:12");

export default function() {
    sleep(randomInt(1, 5)); // sleep between 1 and 5 seconds.

    let res = http.post(`https://test-api.k6.io/user/register/`, {
        first_name: randomItem(['Joe', 'Jane']), // random name
        last_name: 'Smith',
        username: `user_${randomFixedString(10)}@example.com`,  // random email address,
        password: uuidv4() // random password in form of uuid
    });

    let username = findBetween(res.body, '"username":"', '"'); // grab the username from surrounding strings

    if (DELAY[0] > 0) {
        sleep(randomInt(DELAY[0], DELAY[1]));
    }
}
```