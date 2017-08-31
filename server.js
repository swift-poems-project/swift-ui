const express = require('express')
const path = require('path')
const compression = require('compression')

/*eslint-disable no-console */

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const app = express();

app.use(compression());
app.use(express.static('build'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
