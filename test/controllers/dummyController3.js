module.exports = {
  mw1: (req, res, next) => {
    console.log('running mw1 => (Controller 3)');
    setTimeout(() => next(), 1345)
  }, 
  mw2: (req, res, next) => {
    console.log('running mw2 => (Controller 3)');
    setTimeout(() => next(), 451);
  },
  mw3: (req, res, next) => {
    console.log('running mw3 => (Controller 3)');
    setTimeout(() => next(), 8721);
  },
  mw4: (req, res, next) => {
    console.log('running mw4 => (Controller 3)');
    setTimeout(() => next(), 658);
  },
  mw5: (req, res, next) => {
    console.log('running mw5 => (Controller 3)');
    setTimeout(() => next(), 1080);
  },
  mwLast: (req, res, next) => {
    console.log('running mwLast => (Controller 3)');
    setTimeout(() => res.sendStatus(200), 3);
  },
}