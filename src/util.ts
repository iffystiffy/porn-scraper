import { JSDOM } from "jsdom";

export function qsAll(dom: JSDOM, query: string) {
  return dom.window.document.querySelectorAll(query);
}

export function qs(dom: JSDOM, query: string) {
  return dom.window.document.querySelector(query);
}