require('@testing-library/jest-dom');

// jsdom lacks these browser APIs, which cmdk (the command palette) uses
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}
