"use client";
import { Global } from "@emotion/react";

export default function GlobalStyles() {
  return (
    <Global
      styles={{
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "Inter, sans-serif",
        },
      }}
    />
  );
}
