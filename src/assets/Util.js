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
    //通过时间计算寄养时长
    displayTime: function(startTime, target) {
        let months = target.diff(startTime, "months", true);
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
    //计算视频长度
    countTime: function(s) {
        var min;
        min = Math.floor(s / 60);
        s = Math.round(s % 60);
        min += "";
        s += "";
        min = min.length == 1 ? "0" + min : min;
        s = s.length == 1 ? "0" + s : s;
        return min + ":" + s;
    },
    //按某一个属性排序数组对象--从大到小
    objSort(prop) {
        return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        };
    },
    //转化星期
    getTimestr(i) {
        let day = "";
        switch (parseInt(i)) {
            case 1:
                day = "星期一";
                break;
            case 2:
                day = "星期二";
                break;
            case 3:
                day = "星期三";
                break;
            case 4:
                day = "星期四";
                break;
            case 5:
                day = "星期五";
                break;
            case 6:
                day = "星期六";
                break;
            case 7:
                day = "星期日";
                break;
        }
        return day;
    },
    //根据天气转化为对应图标
    getWeatherIcon(i) {
        let weatherStr = "";
        switch (i) {
            case "阴":
                weatherStr = "el-icon-partly-cloudy";
                break;
            case "晴":
                weatherStr = "el-icon-sunny";
                break;
            case "晴间多云":
                weatherStr = "el-icon-cloudy-and-sunny";
                break;
            case "多云":
                weatherStr = "el-icon-cloudy";
                break;
            case "阵雨":
                weatherStr = "el-icon-light-rain";
                break;
            case "雷阵雨":
                weatherStr = "el-icon-light-rain";
                break;
            case "小雨":
                weatherStr = "el-icon-light-rain";
                break;
            case "中雨":
                weatherStr = "el-icon-light-rain";
                break;
            case "大雨":
                weatherStr = "el-icon-heavy-rain";
                break;
            case "暴雨":
                weatherStr = "el-icon-heavy-rain";
                break;
        }
        return weatherStr;
    },
}


export default Util;