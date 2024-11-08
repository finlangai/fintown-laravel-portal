import { FC, HTMLAttributes, ReactNode } from "react";

type NoPropogationProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
const NoPropogation: FC<NoPropogationProps> = ({ children, ...props }) => {
  return (
    <div {...props} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default NoPropogation;
