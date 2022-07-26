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
    ? "bg-slate-500 text-white border-slate-500 hover:bg-slate-500"
    : "";

  return (
    <As
      id={id}
      onClick={onClick}
      href={href}
      className={`px-4 py-1 font-semibold rounded-md border-2 border-black transition-colors bg-white hover:bg-black hover:text-white focus:bg-slate-800 focus:text-white ${disabledClasses}`}
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
