import debounce from "lodash.debounce";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
appHeight();

const debouncedAppHeight = debounce(() => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}, 200);

window.addEventListener("resize", debouncedAppHeight);

export default appHeight;
