//小数保留位数，四舍五入
export const toFixed = (decimal, fix) => {
    if (fix) {
        return Math.round(+decimal + 'e' + fix) / Math.pow(10, fix);
    } else {//0
        return Math.round(decimal);
    }
}
//数字或数字字符串转为每3位增加逗号的字符串
export const toThousands = (num, fix = 2) => {
    let newNum = toFixed(new Number(num), fix);
    return newNum.toLocaleString();
}
//转换为百分数，有精度问题
export const toPercentage = (decimal, fix = 2, returnPercent = true) => {
    let percent = decimal * 100 * 100 / 100;
    return returnPercent ? `${toFixed(percent, fix)}%` : toFixed(percent, fix);
}