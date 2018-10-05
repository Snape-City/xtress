module.exports = {
  mw1: (req, res, next) => {
    console.log('running mw1 => (Controller 2)');
    setTimeout(() => next(), 1134);
  },
  mw2: (req, res, next) => {
    console.log('running mw2 => (Controller 2)');
    setTimeout(() => next(), 1122);
  },
  mw3: (req, res, next) => {
    console.log('running mw3 => (Controller 2)');
    setTimeout(() => next(), 1181);
  },
  mwLast: (req, res, next) => {
    console.log('running mwLast => (Controller 2)');
    setTimeout(() => res.sendStatus(200), 124);
  }
};
