import React, { cloneElement } from "react";

const nest = (children: React.ReactNode, element: React.ReactElement) =>
  cloneElement(element, {}, children);

type MultiProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[];
}>;

const MultiProvider: React.FC<MultiProviderProps> = ({
  children,
  providers,
}) => <>{providers.reduceRight(nest, children)}</>;

export default MultiProvider;
