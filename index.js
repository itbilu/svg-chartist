const svgdom = require('svgdom-css');
const Chartist = require('chartist');
const fs = require('fs');

const FUNCTION = new Map([
  ['bar', Chartist.Bar],
  ['line', Chartist.Line],
  ['pie', Chartist.Pie],
]);

function defaults(o={}) {
  let options = Object.assign({width: 1200, height: 600}, o.options);
  let h = Math.min(options.width, options.height);
  var title = Object.assign({x: 0, y: 0, height: 0.08*h, 'font-size': `${0.03*h}px`, 'font-family': 'Verdana', 'font-weight': 'bold', fill: 'crimson', 'text-anchor': 'middle', role: 'caption'}, o.title);
  var subtitle = Object.assign({x: 0, y: 0, height: 0.04*h, 'font-size': `${0.02*h}px`, 'font-family': 'Verdana', 'font-weight': 'bold', fill: 'indianred', 'text-anchor': 'middle'}, o.subtitle);;
  return Object.assign({}, o, {options, title, subtitle});
};

/**
 * @params type                   {string} chart type: bar, line, pie
 * @params chartData              {object} Chartist's data. The data object used to pie/bar/line chart
 * @params [opts]                 {object} optional options 
 * @params [opts.options]         {object} Chartist's options 
 * @params [opts.resOptions]      {array}  Chartist's responsiveOptions
 * @params [opts.css]             {string} Custom CSS will be appended to Chartist's CSS
 * @params [opts.onDraw]          {Function} Chartist's 'draw' event listener
 * @params [opts.title]           {object} chart's title options (height\width\fill etc). Title text is passed in by chartData.title
 * @params [opts.subtitle]        {object} chart's subtitle options (height\width\fill etc). Subtitle text is passed in by chartData.subtitle
 */
module.exports = function chart(type, chartData, opts={}) {
  const CSSPATH = require.resolve('chartist/dist/chartist.min.css');
  let css = opts.css||'';
  const STYLE = css+fs.readFileSync(CSSPATH, 'utf8');
  svgdom(STYLE);
  
  opts = defaults(opts);
  let resOptions = opts.resOptions||[];

  var w = opts.options.width, h = opts.options.height;
  var th = opts.title.height, sth = opts.subtitle.height;

  var div = document.createElement('div');
  document.querySelector('svg').appendChild(div);
  var chartist = new (FUNCTION.get(type))(div, chartData, opts.options, opts.resOptions||[]);
  return new Promise((fres) => {
    chartist.on('draw', (data) => {
      if(opts.onDraw&&typeof opts.onDraw==='function') {
        opts.onDraw(data);
      }
    })
    .on('created', (data) => {
      var svg = div.querySelector('svg');
      var ttl = title(chartData.title, 0.5*w, 0.6*th, opts.title);
      var stl = title(chartData.subtitle, 0.5*w, th+0.6*sth, opts.subtitle);
      if(chartData.title||chartData.subtitle) {
        for(var e of div.querySelectorAll('svg > g'))
          e.setAttribute('transform', `translate(0, ${th+sth})`);
      }

      svg.setAttribute('height', h+th+sth+0.2*h);
      svg.setAttribute('style', '');
      svg.appendChild(ttl);
      svg.appendChild(stl);
      window.setComputedStyle(div);
      var txt = div.innerHTML;
      div.parentNode.removeChild(div);
      fres(txt);
    });
  });

  function tag(nam, cnt='', att={}) {
    var z = document.createElement(nam);
    for(var k in att)
      z.setAttribute(k, att[k]);
    z.textContent = cnt;
    return z;
  };

  function title(txt, x=0, y=0, o={}) {
    o.x += x; o.y += y;
    return tag('text', txt, o);
  };
}
