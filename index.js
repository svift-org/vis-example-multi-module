SVIFT.vis.example.multi = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.setup = function () {
    module.g.append('rect')
      .attr('width', 50)
      .attr('height', 50)
      .attr('y', 0)
      .attr('x', 0)
      .style('stroke','#000')
      .style('fill', 'green');

    module.g.append('circle')
      .attr('r', 25)
      .attr('cy', 100)
      .attr('cx', 25)
      .style('stroke','#000')
      .style('fill', 'red');
  };

  module.resize = function () {
    var width = module.container.node().offsetWidth-module.config.margin.right-module.config.margin.left,
      height = module.container.node().offsetHeight-module.config.margin.top-module.config.margin.bottom;

    module.timeline.rect.obj.interpolate = SVIFT.helper.interpolate([
      {value:0},
      {value:width-100, duration:2, ease:d3.easeCubicInOut},
      {value:0, duration:2},
      {value:(width-100)/2, duration:1, ease:d3.easeCubicInOut},
      {value:0, duration:5, ease:d3.easeCubicInOut},
      {value:width-100, duration:2, ease:d3.easeCubicInOut}
    ]);

    module.timeline.circle.obj.interpolate = SVIFT.helper.interpolate([
      {value:25},
      {value:width-100+25, duration:2, ease:d3.easeCubicInOut},
      {value:25, duration:2},
      {value:(width-100+25)/2, duration:1, ease:d3.easeCubicInOut},
      {value:25, duration:5, ease:d3.easeCubicInOut},
      {value:width-100+25, duration:2, ease:d3.easeCubicInOut}
    ]);

    if(!module.playState){
      module.draw(module.playHead);
    }
  };

  module.drawRect = function(t){
    module.g.select('rect').attr('x', module.timeline.rect.obj.interpolate(t));
  };

  module.drawCircle = function(t){
    module.g.select('circle').attr('cx', module.timeline.circle.obj.interpolate(t));
  };

  module.timeline = {
    rect: {start:0, end:4000, func:module.drawRect, obj:{interpolate:null}},
    circle: {start:1000, end:5000, func:module.drawCircle, obj:{interpolate:null}}
  };

  return module;
 });