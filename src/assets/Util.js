const Util = {

    //包含空格
    containSpace: function(str) {
        return / /.test(str);
    },

    //包含中文
    hasZh: function(str) {
        return /[\u4E00-\u9FA5]/.test(str);
    },


    //包含特殊字符
    specil: function(str) {
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(str) || regCn.test(str)) {
            return false;
        } else return true;
    },
}

export default Util;