const chartistSvg = require('../');
const fs = require('fs');

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
};

const options = {
	width: 500,
	heigth: 300,
  fullWidth: true,
  chartPadding: {
    right: 40
  }
}

const opts = {
	options: options
}

chartistSvg('line', data, opts).then((html) => {
	fs.writeFileSync('./examples/simpleLineChart.html', html)
})
