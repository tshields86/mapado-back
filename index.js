// kick off babel with live transpiling
/* remove this when deploying! */

require('babel-register')({
   presets: [ 'es2015' ]
});


// once babel is loaded head over to ./server/index.js for es6 goodness
require('./server');
