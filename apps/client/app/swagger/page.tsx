"use client";

import dynamic from "next/dynamic";
const SwaggerComponent = dynamic(() => import("../../component/swagger-component"), {
  ssr: false,
});

const SwaggerPage = () => {
  return (
    <div>
      <SwaggerComponent />
    </div>
  );
};

export default SwaggerPage;
