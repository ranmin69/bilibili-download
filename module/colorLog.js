/**
 * 失败的颜色
 * @param text
 */
const danger = (text) => {
    return `\u001b[31m ${text} \u001b[0m`;
}

/**
 * 成功的颜色
 * @param text
 */
const success = (text) => {
    return `\u001b[32m ${text} \u001b[0m`;
}

/**
 * 重点色
 * @param text
 */
const emphasis = (text) => {
    return `\u001b[36m ${text} \u001b[0m`
}

/**
 * 高亮色
 * @param text
 * @returns {`\u001b[34m ${string} \u001b[0m`}
 */
const highlight = (text) => {
    return `\u001b[34m ${text} \u001b[0m`
}

const colorLog = {
    danger,
    success,
    emphasis,
    highlight
}

export {
    colorLog as default,
    danger,
    success,
    emphasis,
    highlight
}
