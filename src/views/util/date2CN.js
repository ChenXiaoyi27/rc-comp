// 日期字符串转中文日期
// 日期字符串格式：yyyy-MM-dd，yyyy年MM月dd日，yyyy/MM/dd...
// 满足每位都有，0位补0即可
module.exports = (dateStr) => {
    let chinese = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    let numStr = dateStr.replace(/[^0-9]+/g, '');
    let year = chinese[numStr[0]] + chinese[numStr[1]] + chinese[numStr[2]] + chinese[numStr[3]];
    let month = numStr[4] === '0' ? chinese[numStr[5]] : (numStr[5] === '0' ? chinese[10] : chinese[10] + chinese[numStr[5]]);
    let day = '';
    if (numStr[6] === '0') {
        day = chinese[numStr[7]];
    } else if (numStr[6] === '1') {
        if (numStr[7] === '0') {
            day = chinese[10];
        } else {
            day = chinese[10] + chinese[numStr[7]];
        }
    } else if (numStr[6] === '2' || numStr[6] === '3') {
        if (numStr[7] === '0') {
            day = chinese[numStr[6]] + chinese[10];
        } else {
            day = chinese[numStr[6]] + chinese[10] + chinese[numStr[7]];
        }
    }
    return year + '年' + month + '月' + day + '日';
}