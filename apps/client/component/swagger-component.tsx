"use client";

import React, { useEffect, useState } from "react";
import { clientApi } from '../config/axios-client.config';
import { ApiEndpoints } from '../util/api-endpoints';

// Import the web component safely
if (typeof window !== "undefined") {
  require("openapi-explorer/dist/browser/openapi-explorer.min.js");
}

const SwaggerComponent = () => {
  const [swaggerSpec, setSwaggerSpec] = useState<any>(null);

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const response = await clientApi.get<string>(ApiEndpoints.swagger);
        setSwaggerSpec(response);
      } catch (error) {
        console.error('Error fetching Swagger spec:', error);
      }
    };

    fetchSwaggerSpec();
  }, []);

  useEffect(() => {
    if (swaggerSpec) {
      const apiExplorer = document.querySelector("openapi-explorer") as any;
      if (apiExplorer) {
        apiExplorer.loadSpec(swaggerSpec);
      }
    }
  }, [swaggerSpec]);

  // @ts-ignore
  return (
    <div>
      <openapi-explorer server-url="http://localhost:3000"></openapi-explorer>
    </div>
  );
};



export default SwaggerComponent;




