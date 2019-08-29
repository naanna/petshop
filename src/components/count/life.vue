<template>
  <div>
    <img src="@picture/person.png" class="picture" />
    <div class="div1">
      <span class="span1">我们相识已经有</span>
      <span class="span1">{{day}}</span>
      <span class="span1">天啦！</span>
      <p class="span1" style="margin:0;">在这里您</p>
    </div>

    <img src="@picture/money.png" class="picture" />
    <div class="div1">
      <span class="span1">消费了</span>
      <span class="span1">{{money}}</span>
      <span class="span1">元</span>
    </div>
    <img src="@picture/shop.png" class="picture" />
    <div class="div1">
      <span class="span1">购买过</span>
      <span class="span1">{{num}}</span>
      <span class="span1">件商品</span>
    </div>
    <img src="@picture/kj.png" class="picture" />
    <div class="div1">
      <span class="span1">拥有</span>
      <span class="span1">{{pet}}</span>
      <span class="span1">只小可爱</span>
    </div>
    <img src="@picture/message.png" class="picture" />
    <div class="div1">
      <span class="span1">发表了</span>
      <span class="span1">{{note}}</span>
      <span class="span1">次留言</span>
    </div>

    <p class="p1">感谢您的陪伴与支持</p>
    <p class="p1">让我们一起继续守护可爱的宠物宝宝们</p>
  </div>
</template>

<script>
export default {
  name: "month",
  data() {
    return {
      day: 100,
      money: 0,
      num: 0,
      pet: 0,
      note: 0
    };
  },
  created() {
    this.getlife();
    let Date1 = Date.parse(this.User.regday);
    let Date2 = Date.parse(new Date());
    let dateSpan = Math.abs(Date2 - Date1);
    this.day = Math.floor(dateSpan / (24 * 3600 * 1000));
  },
  methods: {
    getlife() {
      this.axios
        .get("/api/getlife", {
          params: {
            username: this.User.username
          }
        })
        .then(res => {
          if (res.data.success) {
            var message = res.data.message;
            this.money = message.money;
            this.num = message.num;
            this.pet = message.pet;
            this.note = message.note;
          }
        });
    }
  }
};
</script>

<style scoped>
.span1 {
  font-size: 50px;
  font-family: "jelly";
  color: rgb(12, 131, 211);
}
.div1 {
  margin: 20px 0 20px 0;
  text-align: center;
}
.picture {
  display: block;
  margin: 0 auto;
}
.p1 {
  font-size: 50px;
  font-family: "jelly";
  text-align: center;
}
</style>
