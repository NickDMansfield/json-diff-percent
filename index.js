'use strict'

const _ = require('lodash')

const obj1 = {
  name: 'nicholas',
  address: "test address",
  age: 12
}

const obj2 = {
  name: 'nickolas',
  address: 'test address',
  age: 12
}

function getLevenshteinDistance (a, b) {
  var a = a + "", b = b + "", m = [], i, j, min = Math.min;

     if (!(a && b)) return (b || a).length;

     for (i = 0; i <= b.length; m[i] = [i++]);
     for (j = 0; j <= a.length; m[0][j] = j++);

     for (i = 1; i <= b.length; i++) {
         for (j = 1; j <= a.length; j++) {
             m[i][j] = b.charAt(i - 1) == a.charAt(j - 1)
                 ? m[i - 1][j - 1]
                 : m[i][j] = min(
                     m[i - 1][j - 1] + 1,
                     min(m[i][j - 1] + 1, m[i - 1 ][j]))
         }
     }

     return m[b.length][a.length];
}

// Import and define our two objects

// Loop through each property on each object
const obj1Keys = Object.keys(obj1);
const obj2Keys = Object.keys(obj2);

const obj1Only = _.difference(obj1Keys, obj2Keys);
const obj2Only = _.difference(obj2Keys, obj1Keys);
const matchingKeys = _.intersection(obj1Keys, obj2Keys);

const percentsArr = [];

for (let key of matchingKeys) {
  const val1 = obj1[key].toString();
  const val2 = obj2[key].toString();
  console.log(obj1[key]);
  console.log(obj2[key]);

  const avgLength = Math.ceil((val1.length + val2.length)/2);
  const levenshteinDistance = getLevenshteinDistance(val1, val2);
  console.log(avgLength);
  percentsArr.push((avgLength - levenshteinDistance)/avgLength);
}

for (let key of obj1Only) {
  percentsArr.push(0);
}

for (let key of obj2Only) {
  percentsArr.push(0);
}
console.log(percentsArr);
const percentMatch = Math.round(100 * _.mean(percentsArr))/100;
console.log(percentMatch);
// Average the scores out
