# chartistSvg
Generate SVG chart use Chartist on Node.js server side

chartistSvg is a node.js server-side wrapper for [Chartist](http://gionkunz.github.io/chartist-js/index.html), it modified from [chartist-svg](https://github.com/nodef/chartist-svg). Can be used to generate static SVG charts, you can insert raw SVG charts into HTML pages or export PDFs.

# Installation
```
npm install chartistSvg --save
```

# API
`chartistSvg` is exported as a function, you can reference it like this:
```
const chartistSvg = require('chartistSvg');
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
const chartistSvg = require('chartistSvg');
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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="500" height="396" class="ct-chart-line"><g class="ct-grids"><line x1="50" x2="50" y1="15" y2="265" class="ct-grid ct-horizontal" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line x1="152.5" x2="152.5" y1="15" y2="265" class="ct-grid ct-horizontal" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line x1="255" x2="255" y1="15" y2="265" class="ct-grid ct-horizontal" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line x1="357.5" x2="357.5" y1="15" y2="265" class="ct-grid ct-horizontal" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line x1="460" x2="460" y1="15" y2="265" class="ct-grid ct-horizontal" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="265" y2="265" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="215" y2="215" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="165" y2="165" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="115" y2="115" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="65" y2="65" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="15" y2="15" x1="50" x2="460" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line></g><g><g class="ct-series ct-series-a"><path d="M50,25C84.167,45,118.333,69,152.5,85C186.667,101,220.833,125,255,125C289.167,125,323.333,105,357.5,105C391.667,105,425.833,145,460,165" class="ct-line" style="stroke: rgb(215,2,6); stroke-width: 4px; fill: none"></path><line x1="50" y1="25" x2="50.01" y2="25" class="ct-point" ct:value="12" style="stroke: rgb(215,2,6); stroke-width: 10px; stroke-linecap: round"></line><line x1="152.5" y1="85" x2="152.51" y2="85" class="ct-point" ct:value="9" style="stroke: rgb(215,2,6); stroke-width: 10px; stroke-linecap: round"></line><line x1="255" y1="125" x2="255.01" y2="125" class="ct-point" ct:value="7" style="stroke: rgb(215,2,6); stroke-width: 10px; stroke-linecap: round"></line><line x1="357.5" y1="105" x2="357.51" y2="105" class="ct-point" ct:value="8" style="stroke: rgb(215,2,6); stroke-width: 10px; stroke-linecap: round"></line><line x1="460" y1="165" x2="460.01" y2="165" class="ct-point" ct:value="5" style="stroke: rgb(215,2,6); stroke-width: 10px; stroke-linecap: round"></line></g><g class="ct-series ct-series-b"><path d="M50,225C84.167,231.667,118.333,245,152.5,245C186.667,245,220.833,214.444,255,195C289.167,175.556,323.333,125,357.5,125C391.667,125,425.833,178.333,460,205" class="ct-line" style="stroke: rgb(240,91,79); stroke-width: 4px; fill: none"></path><line x1="50" y1="225" x2="50.01" y2="225" class="ct-point" ct:value="2" style="stroke: rgb(240,91,79); stroke-width: 10px; stroke-linecap: round"></line><line x1="152.5" y1="245" x2="152.51" y2="245" class="ct-point" ct:value="1" style="stroke: rgb(240,91,79); stroke-width: 10px; stroke-linecap: round"></line><line x1="255" y1="195" x2="255.01" y2="195" class="ct-point" ct:value="3.5" style="stroke: rgb(240,91,79); stroke-width: 10px; stroke-linecap: round"></line><line x1="357.5" y1="125" x2="357.51" y2="125" class="ct-point" ct:value="7" style="stroke: rgb(240,91,79); stroke-width: 10px; stroke-linecap: round"></line><line x1="460" y1="205" x2="460.01" y2="205" class="ct-point" ct:value="3" style="stroke: rgb(240,91,79); stroke-width: 10px; stroke-linecap: round"></line></g><g class="ct-series ct-series-c"><path d="M50,245C84.167,231.667,118.333,213.889,152.5,205C186.667,196.111,220.833,191.667,255,185C289.167,178.333,323.333,171.667,357.5,165C391.667,158.333,425.833,151.667,460,145" class="ct-line" style="stroke: rgb(244,198,61); stroke-width: 4px; fill: none"></path><line x1="50" y1="245" x2="50.01" y2="245" class="ct-point" ct:value="1" style="stroke: rgb(244,198,61); stroke-width: 10px; stroke-linecap: round"></line><line x1="152.5" y1="205" x2="152.51" y2="205" class="ct-point" ct:value="3" style="stroke: rgb(244,198,61); stroke-width: 10px; stroke-linecap: round"></line><line x1="255" y1="185" x2="255.01" y2="185" class="ct-point" ct:value="4" style="stroke: rgb(244,198,61); stroke-width: 10px; stroke-linecap: round"></line><line x1="357.5" y1="165" x2="357.51" y2="165" class="ct-point" ct:value="5" style="stroke: rgb(244,198,61); stroke-width: 10px; stroke-linecap: round"></line><line x1="460" y1="145" x2="460.01" y2="145" class="ct-point" ct:value="6" style="stroke: rgb(244,198,61); stroke-width: 10px; stroke-linecap: round"></line></g></g><g class="ct-labels"><text x="50" y="285" width="102.5" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Monday</text><text x="152.5" y="285" width="102.5" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Tuesday</text><text x="255" y="285" width="102.5" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Wednesday</text><text x="357.5" y="285" width="102.5" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Thursday</text><text x="460" y="285" width="30" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Friday</text><text y="265" x="40" height="50" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1"></text><text y="215" x="40" height="50" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">2.5</text><text y="165" x="40" height="50" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">5</text><text y="115" x="40" height="50" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">7.5</text><text y="65" x="40" height="50" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">10</text><text y="15" x="40" height="30" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">12.5</text></g><text x="250" y="14.399999999999999" height="24" font-size="9px" font-family="Verdana" font-weight="bold" fill="crimson" text-anchor="middle" role="caption"></text><text x="250" y="31.2" height="12" font-size="6px" font-family="Verdana" font-weight="bold" fill="indianred" text-anchor="middle"></text></svg>

Simple pie chart
```
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
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="500" height="396" class="ct-chart-pie"><g class="ct-series ct-series-a"><path d="M322.5,275.574A145,145,0,0,0,250,5L250,150Z" class="ct-slice-pie" ct:value="5" style="fill: rgb(215,2,6)"></path></g><g class="ct-series ct-series-b"><path d="M124.426,222.5A145,145,0,0,0,322.938,275.32L250,150Z" class="ct-slice-pie" ct:value="3" style="fill: rgb(240,91,79)"></path></g><g class="ct-series ct-series-c"><path d="M250,5A145,145,0,0,0,124.68,222.938L250,150Z" class="ct-slice-pie" ct:value="4" style="fill: rgb(244,198,61)"></path></g><g><text dx="320.02962240595747" dy="131.23561923006724" text-anchor="middle" class="ct-label" style="dominant-baseline: central; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">42%</text><text dx="231.23561923006724" dy="220.02962240595747" text-anchor="middle" class="ct-label" style="dominant-baseline: central; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">25%</text><text dx="187.2131582256282" dy="113.75" text-anchor="middle" class="ct-label" style="dominant-baseline: central; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">33%</text></g><text x="250" y="14.399999999999999" height="24" font-size="9px" font-family="Verdana" font-weight="bold" fill="crimson" text-anchor="middle" role="caption"></text><text x="250" y="31.2" height="12" font-size="6px" font-family="Verdana" font-weight="bold" fill="indianred" text-anchor="middle"></text></svg>

Custom bar chart
```
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
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="700" height="484" class="ct-chart-bar"><g class="ct-grids" transform="translate(0, 64)"><line y1="315" y2="315" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="277.5" y2="277.5" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="240" y2="240" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="202.5" y2="202.5" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="165" y2="165" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="127.5" y2="127.5" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="90" y2="90" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="52.5" y2="52.5" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line><line y1="15" y2="15" x1="50" x2="685" class="ct-grid ct-vertical" style="stroke: rgba(0,0,0,.2); stroke-width: 1px; stroke-dasharray: 2px"></line></g><g transform="translate(0, 64)"><g class="ct-series ct-series-a"><line x1="129.375" x2="129.375" y1="315" y2="75" class="ct-bar" ct:value="80" style="stroke: #4A5572; fill: none; stroke-width: 30px"></line><line x1="288.125" x2="288.125" y1="315" y2="165" class="ct-bar" ct:value="50" style="stroke: #4A5572; fill: none; stroke-width: 30px"></line><line x1="446.875" x2="446.875" y1="315" y2="15" class="ct-bar" ct:value="100" style="stroke: #4A5572; fill: none; stroke-width: 30px"></line><line x1="605.625" x2="605.625" y1="315" y2="90" class="ct-bar" ct:value="75" style="stroke: #4A5572; fill: none; stroke-width: 30px"></line></g></g><g class="ct-labels" transform="translate(0, 64)"><text x="50" y="335" width="158.75" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; justify-content: center; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Q1</text><text x="208.75" y="335" width="158.75" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; justify-content: center; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Q2</text><text x="367.5" y="335" width="158.75" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; justify-content: center; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Q3</text><text x="526.25" y="335" width="158.75" height="20" class="ct-label ct-horizontal ct-end" style="text-anchor: start; text-align: left; justify-content: center; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">Q4</text><text y="315" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1"></text><text y="277.5" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">12.5</text><text y="240" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">25</text><text y="202.5" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">37.5</text><text y="165" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">50</text><text y="127.5" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">62.5</text><text y="90" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">75</text><text y="52.5" x="40" height="37.5" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">87.5</text><text y="15" x="40" height="30" width="30" class="ct-label ct-vertical ct-start" style="text-anchor: end; text-align: right; display: block; fill: rgba(0,0,0,.4); color: rgba(0,0,0,.4); font-size: 12px; line-height: 1">100</text></g><text x="350" y="30" height="50" font-size="10.5px" font-family="Verdana" font-weight="bold" fill="#4A5572" text-anchor="middle" role="caption">Custom bar chart</text><text x="350" y="58.4" height="14" font-size="7px" font-family="Verdana" font-weight="bold" fill="indianred" text-anchor="middle">by: itbilu.com</text></svg>
