<template>
  <div>
    <img src="@picture/person.png" class="life-picture" />
    <div class="life-box">
      <span class="life-span">我们相识已经有</span>
      <span class="life-span">{{day}}</span>
      <span class="life-span">天啦！</span>
      <p class="life-span" style="margin:0;">在这里您</p>
    </div>

    <img src="@picture/money.png" class="life-picture" />
    <div class="life-box">
      <span class="life-span">消费了</span>
      <span class="life-span">{{money}}</span>
      <span class="life-span">元</span>
    </div>
    <img src="@picture/shop.png" class="life-picture" />
    <div class="life-box">
      <span class="life-span">购买过</span>
      <span class="life-span">{{num}}</span>
      <span class="life-span">件商品</span>
    </div>
    <img src="@picture/kj.png" class="life-picture" />
    <div class="life-box">
      <span class="life-span">拥有</span>
      <span class="life-span">{{pet}}</span>
      <span class="life-span">只小可爱</span>
    </div>
    <img src="@picture/message.png" class="life-picture" />
    <div class="life-box">
      <span class="life-span">发表了</span>
      <span class="life-span">{{note}}</span>
      <span class="life-span">次留言</span>
    </div>
    <p class="life-text">感谢您的陪伴与支持</p>
    <p class="life-text">让我们一起继续守护可爱的宠物宝宝们</p>
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
    let Date1 = Date.parse(this.$store.state.regday);
    let Date2 = Date.parse(new Date());
    let dateSpan = Math.abs(Date2 - Date1);
    this.day = Math.floor(dateSpan / (24 * 3600 * 1000));
  },
  methods: {
    getlife() {
      this.axios
        .get("/api/count/getlife", {
          params: {
            username: this.$store.state.username
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
.life-span {
  font-size: 50px;
  font-family: "jelly";
  color: rgb(12, 131, 211);
}
.life-box {
  margin: 20px 0 20px 0;
  text-align: center;
}
.life-picture {
  display: block;
  margin: 0 auto;
}
.life-text {
  font-size: 50px;
  font-family: "jelly";
  text-align: center;
}
</style>
