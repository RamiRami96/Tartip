import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="container px-4">{children}</div>;
}

export default Container;
