// app/architecture/page.tsx

import { ArchitectureDiagram } from './architecture-diagram.component';
import React from 'react';

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">System Architecture</h1>
      <ArchitectureDiagram />
    </div>
  );
}


