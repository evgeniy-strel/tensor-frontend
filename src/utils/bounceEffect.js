const html = document.querySelector("html");
const body = document.querySelector("body");
const tags = [html, body];

export const removeBounceEffect = () => {
  tags.forEach((tag) => {
    tag.style.margin = 0;
    tag.style.webkitOverflowScrolling = "touch";
    tag.style.overscrollBehavior = "none";
  });
};

export const addBounceEffect = () => {
  tags.forEach((tag) => {
    tag.style.overscrollBehavior = "auto";
  });
};
