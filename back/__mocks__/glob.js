const glob = require.requireActual('glob');

const actualSync = glob.sync;

glob.sync = (pattern, options) => {
  let sampleFiles = [];
  if (pattern === 'src/**/model.js') {
    sampleFiles = actualSync.call(glob, 'test/sample/*-model.js', options);
  }
  if (pattern === 'src/**/routes.js') {
    sampleFiles = actualSync.call(glob, 'test/sample/*-routes.js', options);
  }
  const actualFiles = actualSync.call(glob, pattern, options);
  return actualFiles.concat(sampleFiles);
};

module.exports = glob;
