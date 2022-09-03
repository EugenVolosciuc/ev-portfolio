import {
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  id?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

// eslint-disable-next-line
const Button = forwardRef<
  MutableRefObject<HTMLAnchorElement | HTMLButtonElement>,
  Props
>(({ children, href, onClick, type = "button", id, disabled = false }, ref) => {
  const As = href ? "a" : "button";

  const disabledClasses = disabled
    ? "decoration-slate-500 text-slate-500 cursor-not-allowed"
    : "focus:no-underline hover:no-underline hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white";

  return (
    <As
      id={id}
      onClick={onClick}
      href={href}
      className={`my-1 mx-4 bg-white transition-all font-semibold rounded-md underline underline-offset-2  hover:px-4 hover:m-0 focus:m-0 hover:py-1 focus:px-4 focus:py-1  ${disabledClasses}`}
      // @ts-ignore
      ref={ref}
      type={type}
      disabled={disabled}
    >
      {children}
    </As>
  );
});

export default Button;
