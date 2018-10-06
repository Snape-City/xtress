module.exports = {
  mw1: (req, res, next) => {
    console.log('running mw1 => (Controller 3)');
    setTimeout(() => next(), 743)
  }, 
  mw2: (req, res, next) => {
    console.log('running mw2 => (Controller 3)');
    setTimeout(() => next(), 3223);
  },
  mw3: (req, res, next) => {
    console.log('running mw3 => (Controller 3)');
    setTimeout(() => next(), 12);
  },
  mw4: (req, res, next) => {
    console.log('running mw4 => (Controller 3)');
    setTimeout(() => next(), 345);
  },
  mw5: (req, res, next) => {
    console.log('running mw5 => (Controller 3)');
    setTimeout(() => next(), 777);
  },
  mw6: (req, res, next) => {
    console.log('running mw6 => (Controller 3)');
    setTimeout(() => next(), 888);
  },
  mw7: (req, res, next) => {
    console.log('running mw7 => (Controller 3)');
    setTimeout(() => next(), 1111);
  },
  mw8: (req, res, next) => {
    console.log('running mw8 => (Controller 3)');
    setTimeout(() => next(), 2222);
  },
  mw9: (req, res, next) => {
    console.log('running mw9 => (Controller 3)');
    setTimeout(() => next(), 3333);
  },
  mwLast: (req, res, next) => {
    console.log('running mwLast => (Controller 3)');
    setTimeout(() => res.sendStatus(200), 33);
  }
}