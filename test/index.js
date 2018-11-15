const should = require('should');
const chartistSvg = require('../');
const fs = require('fs');

describe('rendered svg', function() {
  it('chartistSvg', function (done) {
  	const data = {
  		title: 'itbilu.com',
		  labels: ['近2年','近1年','近半年','近3个月'],
		  series: [
		    [80, 50, 100, 75]
		  ]
		};

		const options = {
			// width: 500, 
	  //   height: 270,
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
			// console.log(html)

			fs.writeFileSync('./test/svg.html', html)
			should.exist(html); 
			done();
		}).catch((err) => {
			should.not.exist(html); 
			done();
		});
  })
})







