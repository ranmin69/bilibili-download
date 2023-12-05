import {emphasis, highlight} from "./colorLog.js";

/**
 * 方框
 * @param description
 * @returns {`\u001b[34m ${string} \u001b[0m${string}\u001b[34m ${string} \u001b[0m`}
 */
const box = (description) => {
  const top = `
    ╭────────────────────────────────────────────────────────────────╮
    │                                                                │
  `
  const bottom = `
    │                                                                │
    ╰────────────────────────────────────────────────────────────────╯
  `
  const half = (66 - 2 - description.length) / 2;
  const starPad = Math.ceil(half);
  const endPad = Math.floor(half);
  const start = '│'.padEnd(starPad - 1, ' ');
  const end = '│'.padStart(endPad - 1, ' ');
  const center = `${highlight(start)}${emphasis(description)}${highlight(end)}`
  return `${highlight(top)}${center}${highlight(bottom)}`
}

const all = {
  box
}

export {
  all as default,
  box,
}
