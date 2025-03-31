'use client';

import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('./swagger-ui'), {
  ssr: false,
});

const SwaggerComponent = () => {
  return (
    <div>
      <SwaggerUI />
    </div>
  );
};

export default SwaggerComponent;
