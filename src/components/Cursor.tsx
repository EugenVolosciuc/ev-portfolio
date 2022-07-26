import { MutableRefObject, useEffect, useRef } from "react";

type Position = {
  x: number;
  y: number;
};

function getPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export const useCursorRotation = (
  closestSelector: string,
  shouldFocus: boolean = false
) => {
  useEffect(() => {
    const cursorElement = document.querySelector("#cursor") as HTMLElement;
    const elementsToCompare = document.querySelectorAll(closestSelector);

    const callback = (_event: MouseEvent) => {
      let previousClosestElementToCursor: HTMLElement | null = null;
      let closestElementToCursor: HTMLElement | null = null;
      let smallestDistance: number;

      elementsToCompare.forEach((elem) => {
        const currentElemDistance = getDistanceBetweenElements(
          cursorElement,
          elem as HTMLElement
        );

        if (!closestElementToCursor) {
          closestElementToCursor = elem as HTMLElement;
          smallestDistance = currentElemDistance;
        } else {
          if (currentElemDistance < smallestDistance) {
            previousClosestElementToCursor = closestElementToCursor;
            closestElementToCursor = elem as HTMLElement;
            smallestDistance = currentElemDistance;
          }
        }
      });

      // Rotate cursor
      if (closestElementToCursor) {
        const rotation = calculateRotation(
          cursorElement,
          closestElementToCursor
        );
        cursorElement.style.transform = `rotate(${rotation + 20}deg)`;
      }

      // Focus element
      if (shouldFocus && closestElementToCursor) {
        (closestElementToCursor as unknown as HTMLElement).focus();
      }
    };

    document.addEventListener("mousemove", callback);

    return () => {
      document.removeEventListener("mousemove", callback);
    };
  }, []);
};

export const calculateRotation = (elem: HTMLElement, to: HTMLElement) => {
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemLeft,
    top: elemTop,
  } = elem.getBoundingClientRect();
  const {
    width: toWidth,
    height: toHeight,
    left: toLeft,
    top: toTop,
  } = to.getBoundingClientRect();

  let center = {
      x: elemLeft + elemWidth / 2,
      y: elemTop + elemHeight / 2,
    },
    toCenter = {
      x: toLeft + toWidth / 2,
      y: toTop + toHeight / 2,
    },
    radians = Math.atan2(toCenter.x - center.x, toCenter.y - center.y),
    degree = radians * (180 / Math.PI) * -1 + 180;
  return degree;
};

const setCursorPosition = (
  cursor: HTMLElement,
  cursorPosition: Position,
  setCursorPosition: (position: Position) => void,
  event: MouseEvent | Event
) => {
  if (event instanceof MouseEvent) {
    const newPosition = {
      x: event.clientX - 9,
      y: event.clientY - 8,
    };
    setCursorPosition(newPosition);

    cursor.style.top = newPosition.y + window.scrollY + "px";
    cursor.style.left = newPosition.x + window.scrollX + "px";
  } else {
    cursor.style.top = cursorPosition.y + window.scrollY + "px";
    cursor.style.left = cursorPosition.x + window.scrollX + "px";
  }
};

// Inspiration: https://css-tricks.com/can-you-rotate-the-cursor-in-css/
// TODO: change cursor type - https://stackoverflow.com/questions/14539280/detecting-mouse-cursor-type-change-in-a-webpage
// TODO: Hide custom cursor when bluring out of the window
const Cursor = () => {
  const cursorPosition = useRef({ x: 0, y: 0 });

  const setRefCursorPosition = (position: { x: number; y: number }) => {
    cursorPosition.current = position;
  };

  useEffect(() => {
    const cursorElement = document.querySelector("#cursor");

    const callback = (event: MouseEvent | Event) => {
      setCursorPosition(
        cursorElement as HTMLElement,
        cursorPosition.current,
        setRefCursorPosition,
        event
      );
    };

    document.addEventListener("mousemove", callback);
    document.addEventListener("scroll", callback);

    return () => {
      document.removeEventListener("mousemove", callback);
      document.removeEventListener("scroll", callback);
    };
  }, []);

  return (
    <svg
      className="absolute w-9 h-9 z-2 top-2 left-2 transition-transform hidden md:inline-block"
      version="1.1"
      id="cursor"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 28 28"
      enableBackground="new 0 0 28 28"
      xmlSpace="preserve"
    >
      <polygon
        fill="#FFFFFF"
        points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "
      />
      <polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 " />
      <rect
        x="12.5"
        y="13.6"
        transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
        width="2"
        height="8"
      />
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 " />
    </svg>
  );
};

export default Cursor;
