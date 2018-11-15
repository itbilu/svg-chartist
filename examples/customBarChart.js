const chartistSvg = require('../');
const fs = require('fs');

const data = {
	title: 'Custom bar chart',
	subtitle: 'by: itbilu.com',
  labels: ['Q1','Q2','Q3','Q4'],
  series: [
    [80, 50, 100, 75]
  ]
};

const options = {
	width: 700, 
  height: 350,
  stackBars: true,
  axisX: {
    showLabel: true,
    showGrid: false,
  }
}

const opts = {
	options: options,
	title: {
		height: 50,
		fill: "#4A5572"
	},
  css: `.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut{
    stroke: #4A5572
  }`,
  onDraw: function (data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
  }
}

chartistSvg('bar', data, opts).then((html) => {
	fs.writeFileSync('./examples/customBarChart.html', html)
})
