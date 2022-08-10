import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Tag: FC<Props> = ({ children }) => {
  return (
    <p className="inline-block px-2 py-1 text-xs rounded bg-gray-300">
      {children}
    </p>
  );
};

export default Tag;
