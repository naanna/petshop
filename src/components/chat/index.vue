<template>
  <div class="chat-box">
    <p class="title">聊天室人数：{{count}}</p>
    <div class="msg-box" ref="msg-box">
      <el-scrollbar class="scroll" ref="myScrollbar">
        <div v-for="(i,index) in list" :key="index">
          <div
            class="time"
            v-if="showtime(i.createtime,index)"
          >{{timestampFormat(i.createtime/1000)}}</div>
          <div class="user-msg-box" :style="i.userId == userId?'justify-content: flex-end;':''">
            <!-- 左边的 -->
            <div class="user-msg-content" v-if="i.userId != userId" style="padding-right:10px;">
              <el-avatar size="small"></el-avatar>
              <span
                class="triangle"
                style="border-color: transparent #f1f1f1 transparent transparent;right:0;"
              ></span>
            </div>
            <!-- 文字 -->
            <div style="flex:25" :style="i.userId == userId?'text-align:right;':''">
              <span class="user-msg-username">木木周</span>
              <span class="user-msg" :class="i.userId == userId?'right':'left'">{{i.content}}</span>
            </div>
            <!-- 右边的 -->
            <div class="user-msg-content" v-if="i.userId == userId" style="padding-left:10px;">
              <span
                class="triangle"
                style="border-color: transparent transparent transparent #d1f2fd;left:0;"
              ></span>
              <el-avatar size="small"></el-avatar>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="input-box">
      <el-input v-model="contentText" placeholder="请输入内容" ref="sendMsg" class="input"></el-input>
      <el-button @click="sendText()" style="margin-left:30px;">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: "",
      ws: null,
      count: 0,
      userId: null, //当前用户ID
      list: [], //聊天记录的数组
      contentText: "" //input输入的值
    };
  },
  created() {
    this.getUserID();
    this.initWebSocket();
  },
  mounted() {
    this.timer = setInterval(this.initWebSocket, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    //合并一分钟内对话
    showtime(createtime, index) {
      if (index != 0) {
        if (this.list[index - 1].createtime > createtime - 60000) {
          return false;
        }
      }
      return true;
    },
    //根据时间戳作为当前用户ID----连上了此时应该用admin来当用户ID
    //需要修改！！
    getUserID() {
      let time = new Date().getTime();
      this.userId = time;
    },
    //根据userID生成一个随机头像
    getUserHead(id, type) {
      let ID = String(id);
      if (type == "bck") {
        return Number(ID.substring(ID.length - 3));
      }
      if (type == "polygon") {
        return Number(ID.substring(ID.length - 2));
      }
      if (type == "rotate") {
        return Number(ID.substring(ID.length - 3));
      }
    },
    //滚动条到底部
    scrollBottm() {
      this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
        "myScrollbar"
      ].wrap.scrollHeight;
    },
    //发送聊天信息
    sendText() {
      let _this = this;
      _this.$refs["sendMsg"].focus();
      if (!_this.contentText) {
        return;
      }
      let params = {
        userId: _this.userId,
        msg: _this.contentText,
        createtime: new Date().getTime()
      };
      _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
      _this.contentText = "";
      setTimeout(() => {
        _this.scrollBottm();
      }, 200);
    },
    //进入页面创建websocket连接
    initWebSocket() {
      let _this = this;
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // 192.168.0.115 是我本地IP地址 此处的 :8181 端口号 要与后端配置的一致
        let ws = new WebSocket("ws://192.168.80.1:8181");
        _this.ws = ws;
        ws.onopen = function(e) {
          console.log("服务器连接成功");
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭");
        };
        ws.onerror = function() {
          console.log("服务器连接出错");
        };
        ws.onmessage = function(e) {
          //接收服务器返回的数据
          let resData = JSON.parse(e.data);
          if (resData.funName == "userCount") {
            _this.count = resData.users;
            _this.list = resData.chat;
            console.log(resData.chat);
          } else {
            _this.list = [
              ..._this.list,
              {
                userId: resData.userId,
                content: resData.msg,
                createtime: resData.createtime
              }
            ];
          }
          //刚进入页面默认置底
          setTimeout(() => {
            _this.scrollBottm();
          }, 100);
        };
      }
    },
    timestampFormat(timestamp) {
      function zeroize(num) {
        return (String(num).length == 1 ? "0" : "") + num;
      }
      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
      var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象
      var Y = tmDate.getFullYear(),
        m = tmDate.getMonth() + 1,
        d = tmDate.getDate();
      var H = tmDate.getHours(),
        i = tmDate.getMinutes(),
        s = tmDate.getSeconds();
      if (timestampDiff < 60) {
        // 一分钟以内
        return "刚刚";
      } else if (
        curDate.getFullYear() == Y &&
        curDate.getMonth() + 1 == m &&
        curDate.getDate() == d
      ) {
        return "今天 " + zeroize(H) + ":" + zeroize(i);
      } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (
          newDate.getFullYear() == Y &&
          newDate.getMonth() + 1 == m &&
          newDate.getDate() == d
        ) {
          return "昨天 " + zeroize(H) + ":" + zeroize(i);
        } else if (curDate.getFullYear() == Y) {
          return (
            zeroize(m) +
            "月" +
            zeroize(d) +
            "日 " +
            zeroize(H) +
            ":" +
            zeroize(i)
          );
        } else {
          return (
            Y +
            "年" +
            zeroize(m) +
            "月" +
            zeroize(d) +
            "日 " +
            zeroize(H) +
            ":" +
            zeroize(i)
          );
        }
      }
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.msg-box {
  width: 800px;
  height: 400px;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  padding: 10px 0;
}
.input {
  width: 400px;
}
.input-box {
  margin: 20px;
  text-align: center;
}
.msg-list {
  margin: 10px;
}
.user-msg-box {
  margin: 10px;
  word-break: break-all;
  display: flex;
  align-items: end;
}
.user-msg-content {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}
.user-msg {
  padding: 10px;
  display: inline-block;
  border-radius: 5px;
}
.user-msg-username {
  font-size: 12px;
  display: block;
  color: #939fbf;
  margin-bottom: 5px;
}
.left {
  background: #f1f1f1;
}
.right {
  background: #d1f2fd;
}
.scroll {
  height: 100%;
  width: 100%;
}
.time {
  text-align: center;
  color: gray;
  font-size: 12px;
}
.triangle {
  width: 0px;
  height: 0px;
  border-width: 5px;
  border-style: solid;
  display: inline-block;
  position: absolute;
  bottom: -15px;
}
</style>
