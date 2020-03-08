import React from 'react';
import * as d3 from 'd3';

class TemperatureChart extends React.Component {
  componentDidMount() {
    const margin = { top: 18, right: 20, bottom: 10, left: 50 };
    const width = 300;
    const height = 130;
    const data = [
      { date: Date.now() + 1, value: 30.41 },
      { date: Date.now() + 2 * 60 * 1000, value: 40.41 },
      { date: Date.now() + 3 * 60 * 1000, value: 30.41 },
      { date: Date.now() + 4 * 60 * 1000, value: 91.41 },
      { date: Date.now() + 5 * 60 * 1000, value: 91.41 },
      { date: Date.now() + 6 * 60 * 1000, value: 91.41 },
      { date: Date.now() + 7 * 60 * 1000, value: 92.41 },
      { date: Date.now() + 8 * 60 * 1000, value: 90.41 },
      { date: Date.now() + 9 * 60 * 1000, value: 96.41 },
      { date: Date.now() + 10 * 60 * 1000, value: 96.41 },
      { date: Date.now() + 11 * 60 * 1000, value: 96.41 },
      { date: Date.now() + 12 * 60 * 1000, value: 96.41 },
      { date: Date.now() + 13 * 60 * 1000, value: 96.41 },
      { date: Date.now() + 14 * 60 * 1000, value: 91.41 },
      { date: Date.now() + 15 * 60 * 1000, value: 80.41 },
    ];

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value));

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
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
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
