import debounce from "lodash.debounce";

const doc = document.documentElement;

const appHeight = () => {
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
appHeight();

const debouncedAppHeight = debounce(() => {
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}, 200);

window.addEventListener("resize", debouncedAppHeight);

export default appHeight;
