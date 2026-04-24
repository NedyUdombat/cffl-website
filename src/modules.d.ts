declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

type GenericResponse<T> = {
  message: string;
  success?: boolean;
  error?: unknown;
  data: T;
  meta: {
    total?: number;
    hasMore?: boolean;
  };
};

declare module "*.css";
