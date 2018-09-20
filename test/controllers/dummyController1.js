module.exports = {
  mw1: (req, res, next) => {
    console.log('running mw1 => (Controller 1)');
    setTimeout(() => next(), 600)
  }, 
  mw2: (req, res, next) => {
    console.log('running mw2 => (Controller 1)');
    setTimeout(() => next(), 843);
  },
  mw3: (req, res, next) => {
    console.log('running mw3 => (Controller 1)');
    setTimeout(() => next(), 2035);
  },
  mwLast: (rem res, next) => {
    console.log('running mwLast => (Controller 1)');
    setTimeout(() => res.sendStatus(200), 5841);
  }
}