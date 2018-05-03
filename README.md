# rep-max
A Node.js module that performs rep max calculations.

## Installation
```sh
npm install rep-max --save
```

or

```sh
yarn add rep-max
```

## Usage

### Javascript

```javascript
var repMax = require('rep-max');
var result = repMax.repMax(135, 5);
console.log(result);
```

Expected output:
```sh
157.5
```

### TypeScript

```typescript
import { repMax } from 'rep-max';
const result = repMax.repMax(135, 5);
console.log(result);
```

Expected output:
```sh
157.5
```

## Test
```sh
npm run test
```