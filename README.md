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

## Usage - One-Rep Max

### Javascript

```javascript
var repMax = require('rep-max');
var result = repMax.oneRepMax(135, 5);
console.log(result);
```

Expected output:
```sh
157.5
```

### TypeScript

```typescript
import { repMax } from 'rep-max';
const result = repMax.oneRepMax(135, 5);
console.log(result);
```

Expected output:
```sh
157.5
```


## Usage - N-Rep Max

### Javascript

```javascript
var repMax = require('rep-max');
var result = repMax.nRepMax(2, 135, 5);
console.log(result.toFixed(2));
```

Expected output:
```sh
147.66
```

### TypeScript

```typescript
import { repMax } from 'rep-max';
const result = repMax.nRepMax(2, 135, 5);
console.log(result.toFixed(2);
```

Expected output:
```sh
147.66
```

## Test
```sh
npm run test
```