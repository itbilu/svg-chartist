const chartistSvg = require('../');
const fs = require('fs');

const data = {
  series: [5, 3, 4]
};

var sum = function(a, b) { return a + b };
const options = {
	width: 500,
	height: 300,
  labelInterpolationFnc: function(value) {
    return Math.round(value / data.series.reduce(sum) * 100) + '%';
  }
}

const opts = {
	options: options
}

chartistSvg('pie', data, opts).then((html) => {
	fs.writeFileSync('./examples/simplePieChart.html', html)
})
