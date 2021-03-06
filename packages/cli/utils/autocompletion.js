const omelette = require('omelette');
omelette('hello').tree({
  how: {
    much: {
      is: {
        this: ['car'],
        that: ['house'],
      }
    },
    are: ['you'],
    many: ['cars', 'houses'],
  },
  where: {
    are: {
      you: ['from'],
      the: ['houses', 'cars'],
    },
    is: {
      your: ['house', 'car'],
    },
  },
}).init();