const birthday = '';
const leavel = '';
const moeny = '';
const name = '';
const nickname = '';
const permissions = '';
const psd = '';
const username = '';
const picture = '';
const regday = '';

//用export default 暴露出去,供其他vue文件使用
export default {
    birthday: '',
    leavel: '',
    moeny: '',
    name: '',
    username: '',
    nickname: '',
    permissions: '',
    psd: '',
    picture: '',
    regday: "",
    // 设置属性方法
    setusername(username) {
        this.username = username;
    },
    setnickname(nickname) {
        this.nickname = nickname;
    },
    setpicture(picture) {
        this.picture = picture;
    },
    setpermissions(permissions) {
        this.permissions = permissions;
    },
    setpermissions(permissions) {
        this.permissions = permissions;
    },
    setregday(regday) {
        this.regday = regday;
    },
    deleteobs() {
        this.username = "";
        this.nickname = "";
        this.picture = "";
        this.permissions = "";
        this.regday = "";
    },
}