// global.d.ts
interface OpenApiExplorerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  collapse?: boolean;
  table?: boolean;
  specUrl?: string;
  serverUrl?: string;
  layout?: "sidebar" | "stacked";
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "openapi-explorer": OpenApiExplorerProps;
    }
  }
}
