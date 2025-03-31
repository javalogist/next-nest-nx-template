'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../config';
import { ApiEndpoints } from '../util';

// Import the web component safely
if (typeof window !== 'undefined') {
  require('openapi-explorer/dist/browser/openapi-explorer.min.js');
}

const SwaggerUI = () => {
  const [swaggerSpec, setSwaggerSpec] = useState<any>(null);

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const response = await apiClient.get<string>(ApiEndpoints.swagger);
        setSwaggerSpec(response);
      } catch (error) {
        console.error('Error fetching Swagger spec:', error);
      }
    };

    fetchSwaggerSpec().then((_) => null);
  }, []);

  useEffect(() => {
    if (swaggerSpec) {
      const apiExplorer = document.querySelector('openapi-explorer') as any;
      if (apiExplorer) {
        apiExplorer.loadSpec(swaggerSpec);
      }
    }
  }, [swaggerSpec]);

  return (
    <div>
      {React.createElement('openapi-explorer', {
        'server-url': 'http://localhost:3000'
      })}
    </div>
  );
};

export default SwaggerUI;
