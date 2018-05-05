# rep-max
A Node.js module that performs rep max calculations.

[![Build Status](https://travis-ci.org/danielsmith4483/rep-max.svg?branch=master)](https://travis-ci.org/danielsmith4483/rep-max) [![Coverage Status](https://coveralls.io/repos/github/danielsmith4483/rep-max/badge.svg?branch=master)](https://coveralls.io/github/danielsmith4483/rep-max?branch=master) 
[![npm version](https://badge.fury.io/js/rep-max.svg)](https://badge.fury.io/js/rep-max)


## Installation
```sh
npm install rep-max --save
```

or

```sh
yarn add rep-max
```

## Usage

For a given weight and rep count, the N-Rep Max can be calculated using `nRepMax`. For convenience, `oneRepMax(135, 5)` is functionally equivalent to calling `nRepMax(1, 135, 5)`.

### Javascript

```javascript
var repMax = require('rep-max');

console.log(repMax.oneRepMax(135, 5));
console.log(repMax.nRepMax(2, 135, 5));
```

Expected output:
```sh
157.5 # 1RM
147.66 # 2RM
```

By default, the [Epley formula](https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula) is used for calculation. To use a different formula, the formula name can be supplied as an optional parameter encapsulated in an object:

```javascript
var repMax = require('rep-max');
var options = {formula: "brzycki"};

console.log(repMax.oneRepMax(100, 6, options).toFixed(2));
console.log(repMax.oneRepMax(100, 6, {formula: "wathan"}).toFixed(2));
```

Expected output:
```sh
116.13 # brzycki
120.33 # wathan
```

The full list of supported formulae is as follows:
- `epley` - [Epley formula](https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula)
- `brzycki` - [Brzycki](https://en.wikipedia.org/wiki/One-repetition_maximum#Brzycki)
- `mcGlothin` - [McGlothin](https://en.wikipedia.org/wiki/One-repetition_maximum#McGlothin)
- `lombardi` - [Lombardi](https://en.wikipedia.org/wiki/One-repetition_maximum#Lombardi)
- `mayhew` - [Mayhew et al.](https://en.wikipedia.org/wiki/One-repetition_maximum#Mayhew_et_al.)
- `oConner` - [O'Conner et al.](https://en.wikipedia.org/wiki/One-repetition_maximum#O'Conner_et_al.)
- `wathan` - [Wathan](https://en.wikipedia.org/wiki/One-repetition_maximum#Wathan)

## Test
```sh
npm run test
```