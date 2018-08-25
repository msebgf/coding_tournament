// see https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#usinges7asyncawait
module.exports = (fn) => (...args) => {
  try {
    return fn(...args).catch(args[2]);
  } catch (e) {
    return Promise.reject(e).catch(args[2]);
  }
};
