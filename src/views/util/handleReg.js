module.exports = {
    //检查是否有特殊字符
    checkSpecial: (str) => {
        //特殊字符中“、”、“-”、空格、书名号、中英文逗号、中英文括号可以
        let regEn = new RegExp(/[`~!@#$%^&*_+<>?:"{}.\/;'[\]\t]/, 'g');
        let regCn = new RegExp(/[·！#￥——：；“”‘|。？、【】[\]]/, 'g');
        return regEn.test(str) || regCn.test(str);
    },
    // 计算字符串长度
    calcStrLength: (str) => {
        // 中文汉字，对应3个英文字符
        let chineseReg = /[\u4e00-\u9fa5]/g;
        // 中文标点，对应3个英文字符
        let commaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
        let len = str.replace(chineseReg, 'aaa').replace(commaReg, 'aaa').length;
        return len;
    }
};
