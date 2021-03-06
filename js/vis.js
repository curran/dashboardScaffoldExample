/*global define, document */
/*jslint nomen: true */ // this causes JSLint to tolerate "_"

/**
 * A dummy visualization to show how D3 visualizations
 * can work within the dashboard layout framework.
 */
define(['d3', 'underscore', 'getterSetters'], function (d3, _, getterSetters) {
    "use strict";
    return function () {
        var div = document.createElement('div'),
            my = getterSetters({
                bkgColor: '#005E47',
                lineColor: '#000000',
                lineWidth: 5,
                labelSize: '20px',
                labelText: '',
                width: 0,
                height: 0
            }),
            svg = function () {
                var theSVG = d3.select(div).selectAll('svg').data([1]);
                theSVG.enter().append('svg');
                return theSVG;
            },
            randomColor = function () {
                var r = Math.round(Math.random() * 255),
                    g = Math.round(Math.random() * 255),
                    b = Math.round(Math.random() * 255);
                return d3.rgb(r, g, b).toString();
            },
            updateRect = _.debounce(function () {
                console.log('in updateRect');
                var rect = svg().selectAll('rect').data([1]);
                rect.enter().append('rect')
                    .on('click', function () {
                        my.bkgColor(randomColor());
                    });
                rect.attr('x', 0)
                    .attr('y', 0)
                    .attr('width', my.width())
                    .attr('height', my.height())
                    .attr('fill', my.bkgColor());
            }, 0),
            updateLines = _.debounce(function () {
                console.log('in updateLines');
                var w = my.width(),
                    h = my.height(),
                    lines = svg().selectAll('line').data([
                        {x1: 0, y1: 0, x2: w, y2: h},
                        {x1: 0, y1: h, x2: w, y2: 0}
                    ]),
                    x1,
                    width1,
                    drag = d3.behavior.drag()
                        .on('dragstart', function (d) {
                            x1 = d3.event.sourceEvent.pageX;
                        })
                        .on('drag', function (d) {
                            var x2 = d3.event.sourceEvent.pageX,
                                newLineWidth = my.lineWidth() + x2 - x1;
                            newLineWidth = newLineWidth < 1 ? 1 : newLineWidth;
                            my.lineWidth(newLineWidth);
                            x1 = x2;
                        });

                lines.enter().append('line')
                    .on('click', function () {
                        my.lineColor(randomColor());
                    });

                lines
                    .attr('x1', function (d) { return d.x1; })
                    .attr('y1', function (d) { return d.y1; })
                    .attr('x2', function (d) { return d.x2; })
                    .attr('y2', function (d) { return d.y2; })
                    .style('stroke', my.lineColor())
                    .style('stroke-width', my.lineWidth())
                    .call(drag);
            }, 0),
            updateLabel = _.debounce(function () {
                var label = svg().selectAll('text').data([1]);
                label.enter().append('text');
                label
                    .attr('x', my.width() / 2)
                    .attr('y', my.height() / 2)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '0.5em')
                    .style('font-size', my.labelSize())
                    .text(my.labelText());
                console.log('in updateLabel');
            }, 0),
            updateSize = _.debounce(function () {
                console.log('in updateSize');
                svg().attr('width', my.width())
                    .attr('height', my.height());
                updateRect();
                updateLines();
                updateLabel();
            }, 0);

        my.width.on('change', updateSize);
        my.height.on('change', updateSize);
        my.bkgColor.on('change', updateRect);
        my.lineColor.on('change', updateLines);
        my.lineWidth.on('change', updateLines);
        my.labelText.on('change', updateLabel);
        my.labelSize.on('change', updateLabel);

        return {
            domElement: div,
            chart: my
        };
    };
});
