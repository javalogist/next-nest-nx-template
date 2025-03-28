'use client';
import * as d3 from 'd3';
import { useEffect } from 'react';

// Define interface for nodes and links
interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  source: string | NodeDatum;
  target: string | NodeDatum;
}

// Define nodes and links
const nodes: NodeDatum[] = [
  { id: 'A', group: 1 },
  { id: 'B', group: 2 },
  { id: 'C', group: 1 },
  { id: 'D', group: 2 },
];

const links: LinkDatum[] = [
  { source: 'A', target: 'B' },
  { source: 'A', target: 'C' },
  { source: 'B', target: 'D' },
  { source: 'C', target: 'D' },
];

const GraphComponent = () => {
  useEffect(() => {
    // Define SVG dimensions
    const width = 600;
    const height = 400;

    // Create an SVG container
    const svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create simulation with correct typing
    const simulation = d3
      .forceSimulation<NodeDatum>(nodes)
      .force(
        'link',
        d3
          .forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#aaa');

    // Create nodes
    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        d3
          .drag<SVGGElement, NodeDatum>()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded)
      );

    // Add circles to represent nodes
    node
      .append('circle')
      .attr('r', 10)
      .style('fill', (d) => (d.group === 1 ? '#f00' : '#00f'));

    // Add labels to nodes
    node
      .append('text')
      .attr('x', 12)
      .attr('dy', '.35em')
      .text((d) => d.id);

    // Simulation tick event to update positions
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as NodeDatum).x || 0)
        .attr('y1', (d) => (d.source as NodeDatum).y || 0)
        .attr('x2', (d) => (d.target as NodeDatum).x || 0)
        .attr('y2', (d) => (d.target as NodeDatum).y || 0);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Drag event handlers
    function dragStarted(
      event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart();

      // ✅ Explicitly cast event.subject to NodeDatum
      const node = event.subject as NodeDatum;

      node.fx = event.x;
      node.fy = event.y;
    }


    function dragged(event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Clean up on component unmount
    return () => {
      svg.selectAll('*').remove();
    };
  }, []);

  return <div id="graph" />;
};

export default GraphComponent;
