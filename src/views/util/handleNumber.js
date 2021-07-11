
//数字或数字字符串转为每3位增加逗号的字符串
export const toThousands = (num) => {
    let str = (num || 0).toString();
    let reg = new RegExp(/(\d)(?=(?:\d{3})+$)/g);
    if (str.indexOf('.') > -1) {
        let arr = str.split('.');
        let integer = arr[0].replace(reg, '$1,');
        return `${integer}.${arr[1]}`;
    } else {
        return str.replace(reg, '$1,');
    }
}
//小数保留位数，四舍五入
export const toFixed = (decimal, fix) => {
    if (fix) {
        return Math.round(+decimal + 'e' + fix) / Math.pow(10, fix);
    } else {//0
        return Math.round(decimal);
    }
}
//转换为百分数，有精度问题
export const toPercentage = (decimal, fix = 2, returnPercent = true) => {
    let percent = decimal * 100 * 100 / 100;
    return returnPercent ? `${toFixed(percent, fix)}%` : toFixed(percent, fix);
}