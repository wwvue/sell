<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" v-on:click="decreaseCart"></div>
    </transition>
    <transition name="scroll-animate">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" v-on:click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Cartcontrol',
  props:{
    food:{
      type:Object
    }
  },
 /* created(){
    console.log(this.food)
  },*/
  data () {
    return {
      
    }
  },
  methods:{
    addCart(){
      console.log("click")
      if (!this.food.count) {
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++
      }
    },
    decreaseCart(){
      if (this.food.count>0) {
        this.food.count--
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartcontrol{
  font-size: 0;
}
.cartcontrol .cart-decrease,.cart-add{
  display: inline-block;
  line-height: 24px;
  font-size:24px;
  padding: 6px;
  color:rgb(0,160,220);
}
.cartcontrol .cart-count{
  display: inline-block;
  width: 12px;
  padding-top: 6px;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  vertical-align: top;
  color:rgb(147,153,159);
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.scroll-animate-enter-active {
  transition: all .3s ease;
}
.scroll-animate-leascroll-animateve-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.scroll-animate-enter, .scroll-animate-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
