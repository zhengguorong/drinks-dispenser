import React from 'react';
import * as d3 from 'd3';

class StockChart extends React.Component {
  componentDidMount() {
    const margin = { top: 15, right: 20, bottom: 10, left: 50 };
    const width = 300;
    const height = 130;
    const data = this.props.products;
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.stock)])
      .nice()
      .range([height - margin.bottom, margin.top]);
    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].name)
          .tickSizeOuter(0)
      );
    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select('.domain').remove());

    const svg = d3.select('svg');
    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.stock))
      .attr('height', (d) => y(0) - y(d.stock))
      .attr('width', x.bandwidth());

    svg.append('text')
      .style('fill', 'white')
      .attr('x', width / 2)
      .attr('y', 12)
      .attr('text-anchor', 'middle')
      .text('stock info')

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);
  }

  render() {
    return (
        <svg />
    );
  }
}

export default StockChart;
