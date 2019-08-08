const Util = {

    //包含空格
    containSpace: function(str) {
        return / /.test(str);
    },

    //包含中文
    hasZh: function(str) {
        return /[\u4E00-\u9FA5]/.test(str);
    },
    // 验证数字 0-9的数字
    isNumber: function(str) {
        return /^[0-9]*$/.test(str);
    },
    //包含特殊字符
    specil: function(str) {
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(str) || regCn.test(str)) {
            return false;
        } else return true;
    },
    //通过生日计算年龄
    displayAge: function(birth, target) {
        let months = target.diff(birth, "months", true);
        let birthSpan = {
            year: Math.floor(months / 12),
            month: Math.floor(months) % 12,
            day: Math.round((months % 1) * target.daysInMonth(), 0)
        };
        if (birthSpan.year < 1 && birthSpan.month < 1) {
            return birthSpan.day + "天";
        } else if (birthSpan.year < 1) {
            return birthSpan.month + "个月" + birthSpan.day + "天";
        } else {
            return birthSpan.year + "岁" + birthSpan.month + "个月";
        }
    },
}


export default Util;