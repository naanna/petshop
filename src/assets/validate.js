import Util from "./Util";

//校验是否为空
export function checkinput(rule, value, callback) {
    if (!value) {
        return callback(new Error(rule.message));
    }
    callback();
}

export function checkname(rule, value, callback) {
    if (!value) {
        return callback(new Error(rule.types + "不能为空"));
    }
    if (Util.containSpace(value)) {
        return callback(new Error(rule.types + "不应含空格"));
    }
    if (Util.isNumber(value)) {
        return callback(new Error(rule.types + "不含特殊字符和数字"));
    }
    if (!Util.specil(value)) {
        return callback(new Error(rule.types + "不含特殊字符和数字"));
    }
    callback();
}

//校验是否包含空格
export function checkspace(rule, value, callback) {
    if (Util.containSpace(value)) {
        return callback(new Error(rule.message));
    }
    callback();
}

//校验是否包含中文
export function checkzh(rule, value, callback) {
    if (Util.hasZh(value)) {
        return callback(new Error("不包应含中文"));
    }
    callback();
}

//校验是否包含数字
export function checknum(rule, value, callback) {
    if (Util.isNumber(value)) {
        return callback(new Error("不包应含数字"));
    }
    callback();
}

//校验是否包含特殊字符
export function checkspecil(rule, value, callback) {
    if (!Util.specil(value)) {
        return callback(new Error("不包应含特殊字符"));
    }
    callback();
}

//校验正整数
export function validateIntegerLength(rule, value, callback) {
    var pattern = new RegExp("^[0-9]\\d*$");
    if (!value && rule.required) {
        callback(new Error(rule.message));
    }
    if (!value && value !== 0) {
        callback();
    } else if (!pattern.test(value)) {
        callback(new Error("请输入整数"));
    } else if (value < rule.min) {
        callback(new Error("不能小于" + rule.min));
    } else if (value > rule.max) {
        callback(new Error("不能大于" + rule.max));
    }
    callback();
}
//校验商品名字
export function checkgoodsname(rule, value, callback) {
    if (!value) {
        return callback(new Error("商品名不能为空"));
    }
    if (Util.containSpace(value)) {
        return callback(new Error("商品名不应含空格"));
    }
    if (!Util.specil(value)) {
        return callback(new Error("商品名不含特殊字符"));
    }
    callback();
}