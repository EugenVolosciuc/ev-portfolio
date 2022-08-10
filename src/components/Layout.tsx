import { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import { Button } from "components";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <main className="relative">
      <div className="absolute flex justify-between w-full top-0 p-4 md:p-10">
        <Button onClick={router.back}>Back</Button>
        <Button href="/">Home</Button>
      </div>
      {children}
    </main>
  );
};

export default Layout;
