async function delay(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

export default delay;
