// components/architecture-diagram.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'client' | 'server' | 'database' | 'middleware';
  layer: 'frontend' | 'backend' | 'data';
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  flow: 'request' | 'response' | 'internal';
}

export function ArchitectureDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredLink, setHoveredLink] = useState<Link | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Define all system nodes
    const nodes: Node[] = [
      // Next.js Client
      { id: 'next-client', name: 'Next.js Client (Browser)', type: 'client', layer: 'frontend' },
      // Next.js Server
      { id: 'next-server', name: 'Next.js Server', type: 'server', layer: 'frontend' },
      // API Client
      { id: 'api-client', name: 'API Client', type: 'client', layer: 'frontend' },
      // Next.js Middleware
      { id: 'next-middleware', name: 'Middleware (Token)', type: 'middleware', layer: 'backend' },
      // NestJS API
      { id: 'nestjs-api', name: 'NestJS API', type: 'server', layer: 'backend' },
      // NestJS Middleware
      { id: 'nestjs-middleware', name: 'Middleware', type: 'middleware', layer: 'backend' },
      // NestJS Guards
      { id: 'nestjs-guards', name: 'Guards', type: 'middleware', layer: 'backend' },
      // NestJS Pipes
      { id: 'nestjs-pipes', name: 'Pipes', type: 'middleware', layer: 'backend' },
      // NestJS Controller
      { id: 'nestjs-controller', name: 'Controller', type: 'server', layer: 'backend' },
      // NestJS Service
      { id: 'nestjs-service', name: 'Service', type: 'server', layer: 'backend' },
      // MongoDB
      { id: 'mongodb', name: 'MongoDB', type: 'database', layer: 'data' },
      // External API
      { id: 'external-api', name: 'External API', type: 'server', layer: 'backend' }
    ];

    // Define all connections
    const links: Link[] = [
      // Next.js Page Request Flow (internal)
      { source: 'next-client', target: 'next-server', flow: 'request' },
      { source: 'next-server', target: 'next-middleware', flow: 'internal' },
      { source: 'next-middleware', target: 'api-client', flow: 'internal' },
      { source: 'api-client', target: 'nestjs-api', flow: 'request' },
      { source: 'nestjs-api', target: 'next-server', flow: 'response' },
      { source: 'next-server', target: 'next-client', flow: 'response' },

      // Next.js API Flow (external)
      { source: 'next-client', target: 'api-client', flow: 'request' },
      { source: 'api-client', target: 'next-middleware', flow: 'internal' },
      { source: 'next-middleware', target: 'nestjs-api', flow: 'request' }, // Changed to go to NestJS

      // NestJS API Flow
      { source: 'nestjs-api', target: 'nestjs-middleware', flow: 'internal' },
      { source: 'nestjs-middleware', target: 'nestjs-guards', flow: 'internal' },
      { source: 'nestjs-guards', target: 'nestjs-pipes', flow: 'internal' },
      { source: 'nestjs-pipes', target: 'nestjs-controller', flow: 'internal' },
      { source: 'nestjs-controller', target: 'nestjs-service', flow: 'internal' },
      { source: 'nestjs-service', target: 'mongodb', flow: 'request' },
      { source: 'mongodb', target: 'nestjs-service', flow: 'response' },
      { source: 'nestjs-service', target: 'nestjs-controller', flow: 'internal' },
      { source: 'nestjs-controller', target: 'nestjs-api', flow: 'internal' },
      { source: 'nestjs-api', target: 'next-middleware', flow: 'response' },
      { source: 'next-middleware', target: 'api-client', flow: 'response' }
    ];
    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Set up dimensions
    const width = 1200;
    const height = 700;
    svg.attr('width', width).attr('height', height);

    // Create layers
    const layers = svg.append('g');

    // Color scales
    const nodeColor = d3.scaleOrdinal<string>()
      .domain(['client', 'server', 'database', 'middleware'])
      .range(['#4f46e5', '#10b981', '#f59e0b', '#8b5cf6']);

    const linkColor = d3.scaleOrdinal<string>()
      .domain(['request', 'response', 'internal'])
      .range(['#3b82f6', '#ef4444', '#94a3b8']);

    // Force simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody<Node>().strength(-500))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force('collision', d3.forceCollide<Node>().radius(60));

    // Draw links
    const link = layers.selectAll<SVGPathElement, Link>('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('stroke', d => linkColor(d.flow))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('marker-end', d => `url(#arrow-${d.flow})`)
      .on('mouseover', (event, d) => setHoveredLink(d))
      .on('mouseout', () => setHoveredLink(null));

    // Arrow markers
    const defs = svg.append('defs');
    ['request', 'response', 'internal'].forEach(flow => {
      defs.append('marker')
        .attr('id', `arrow-${flow}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', linkColor(flow));
    });

    // Draw nodes
    const node = layers.selectAll<SVGGElement, Node>('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, Node, SVGGElement>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)
      .on('click', (event, d) => setSelectedNode(d));

    node.append('circle')
      .attr('r', 25)
      .attr('fill', d => nodeColor(d.type))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .text(d => d.name.charAt(0));

    // Node labels
    const labels = layers.selectAll<SVGTextElement, Node>('.label')
      .data(nodes)
      .enter().append('text')
      .attr('class', 'label')
      .attr('dy', -30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => d.name);

    // Update positions
    simulation.on('tick', () => {
      link.attr('d', d => {
        const source = d.source as Node;
        const target = d.target as Node;
        const dx = target.x! - source.x!;
        const dy = target.y! - source.y!;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
      });

      node.attr('transform', d => `translate(${d.x},${d.y})`);
      labels.attr('x', d => d.x!).attr('y', d => d.y!);
    });

    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative border rounded-lg p-4 bg-white shadow-sm">
      <svg
        ref={svgRef}
        className="w-full h-[700px] border rounded"
      />

      {/* Info panel */}
      <div className="absolute right-4 top-4 bg-white p-4 rounded-lg shadow-md border">
        {selectedNode ? (
          <div>
            <h3 className="font-bold">{selectedNode.name}</h3>
            <p>Type: {selectedNode.type}</p>
            <p>Layer: {selectedNode.layer}</p>
          </div>
        ) : hoveredLink ? (
          <div>
            <h3 className="font-bold">Connection</h3>
            <p>Flow: {hoveredLink.flow}</p>
          </div>
        ) : (
          <p>Click on a node or hover over a connection</p>
        )}
      </div>
    </div>
  );
}
