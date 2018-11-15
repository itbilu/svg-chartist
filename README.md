# svg-chartist
Generate SVG chart use Chartist on Node.js server side

`svg-chartist` is a node.js server-side wrapper for [Chartist](http://gionkunz.github.io/chartist-js/index.html), it modified from [chartist-svg](https://github.com/nodef/chartist-svg). Can be used to generate static SVG charts, you can insert raw SVG charts into HTML pages or export PDFs.

# Installation
```
npm install svg-chartist --save
```

# API
`svg-chartist` is exported as a function, you can reference it like this:
```
const chartistSvg = require('svg-chartist');
```
## chartistSvg(type, chartData, opts)
A top-level function for generating static SVG chart. Returns a Promise that fulfilled with the static chart HTML.

### Parameters
- `type`                      {string} chart type. Values are: `bar`, `line`, `pie`
- `chartData`                 {object} Chartist's data. The data object used to pie/bar/line chart. See [Chartist's API](http://gionkunz.github.io/chartist-js/api-documentation.html) for more
- `[opts]`                    {object} optional options 
- `[opts.options]`            {object} Chartist's options. See [Chartist's API](http://gionkunz.github.io/chartist-js/api-documentation.html) for more
- `[opts.resOptions]`         {array} Chartist's resOptions. See [Chartist's API](http://gionkunz.github.io/chartist-js/api-documentation.html) for more
- `[opts.onDraw]`             {Function} Chartist's `'draw'` event listener
- `[opts.title]`              {object} chart's title options (`height`,`width`,`fill` etc). Title text is passed in by `chartData.title`
- `[opts.subtitle]`           {object} chart's subtitle options (`height`,`width`,`fill` etc). Subtitle text is passed in by chartData.subtitle
- `[opts.css]`                {string} Custom CSS will be appended to Chartist's CSS


### Returns
- &lt;Promise&gt; promise that resolves with the static chart HTML

# Examples
Simple line chart
```
const chartistSvg = require('svg-chartist');
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
```


Simple pie chart
```
const chartistSvg = require('svg-chartist');
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
```


Custom bar chart
```
const chartistSvg = require('svg-chartist');
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
```

- [中文本API](https://itbilu.com/nodejs/npm/BkCASacpm.html)
