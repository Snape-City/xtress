module.exports = {
  mw1: (req, res, next) => {
    console.log('running mw1 => (Controller 2)');
    setTimeout(() => next(), 34);
  },
  mw2: (req, res, next) => {
    console.log('running mw2 => (Controller 2)');
    setTimeout(() => next(), 322);
  },
  mw3: (req, res, next) => {
    console.log('running mw3 => (Controller 2)');
    setTimeout(() => next(), 981);
  },
  mwLast: (req, res, next) => {
    console.log('running mwLast => (Controller 2)');
    setTimeout(() => res.sendStatus(200), 1124);
  }
};
