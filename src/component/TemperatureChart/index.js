import React from 'react';
import * as d3 from 'd3';

class TemperatureChart extends React.Component {
  componentDidMount() {
    const margin = { top: 18, right: 20, bottom: 10, left: 50 };
    const width = 300;
    const height = 130;
    const data = this.props.temps;

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.timestamp))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.temperature)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .defined((d) => !isNaN(d.temperature))
      .x((d) => x(d.timestamp))
      .y((d) => y(d.temperature));

    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
          .tickFormat(d3.timeFormat("%H:%M"))
      );

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((d) => d.select('.domain').remove())
        .call((d) =>
          d
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('℃')
        );

    const svg = d3.select('svg');
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

    svg
      .append('text')
      .style('fill', 'white')
      .attr('x', width / 2)
      .attr('y', 12)
      .attr('text-anchor', 'middle')
      .text('temperature record');

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);
  }

  render() {
    return <svg />;
  }
}

export default TemperatureChart;
