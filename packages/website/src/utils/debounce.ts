export default function debounce(fn: (...args: any[]) => void, wait: number) {
  let timer: any;
  return function debounced(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
