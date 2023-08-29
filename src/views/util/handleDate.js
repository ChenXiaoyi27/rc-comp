// 日期字符串转中文日期
// 日期字符串格式：yyyy-MM-dd，yyyy年MM月dd日，yyyy/MM/dd...
// 满足每位都有，0位补0即可
export const date2CN = (dateStr) => {
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
//返回昨天
export const getYesterday = () => {
    let day = new Date();
    day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
    return new Date(day);
}
// 是否为闰年
export const isLeapYear = (year) => {
    let result = false;
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        result = true;
    }
    return result;
}
/**
 * 判断是否不超过一年
 * @param {Array} params [开始日期，结束日期]
 * @returns {boolean} true为不超过一年，false为超过一年
 */
export const isLessThanOneYear = (params) => {
    let yearMs = 31536000000;//一年365天的毫秒数
    let dayMs = 86400000;//一天的毫秒数
    let dayStart = new Date(params[0]);
    let dayEnd = new Date(params[1]);
    let calc = dayEnd.getTime() - dayStart.getTime();//结束日期毫秒数-开始日期毫秒数
    if (
        (isLeapYear(dayStart.getFullYear()) && (dayStart.getMonth() + 1) < 2)//开始年份为闰年且月份小于2
        || (isLeapYear(dayEnd.getFullYear()) && (dayStart.getMonth() + 1) > 2)//结束年份为闰年且月份大于2
    ) {
        return calc <= yearMs + dayMs;
    } else {
        return calc <= yearMs;
    }
}
