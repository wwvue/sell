<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(good,index) in goods" class="menu-item" v-bind:class="{'current':currentIndex===index}" v-on:click="selectFood(index,$event)">
          <span class="text">
            <span v-show="good.type>0" class="icon" v-bind:class="classMap[good.type]"></span>{{good.name}}{{index}}{{currentIndex}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="good in goods" class="food-list food-list-hook">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li v-for="food in good.foods" class="food-item">
              <div class="icon">
                <img v-bind:src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                   <div class="cartcontrol-wrapper">
                  <cartcontrol v-bind:food="food"></cartcontrol>
                </div>
                </div>
               
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart v-bind:selectFoods="selectFoods" v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Shopcart from './Shopcart'
import Cartcontrol from './Cartcontrol'
export default {
  name: 'Goods',
  props:{
    seller:{
      type:Object
    }
  },
  data () {
    return {
      goods:[],
      listHeight:[],
      scrollY:0
    }
  },
  created(){
    this.classMap=['decrease','discount','special','invoice','guarantee']
    axios.get('/api/goods').then((response)=>{
      this.goods = response.data.data
      this.$nextTick(() => {
        this._initScroll()
        this._catchHeight()
      })
      console.log(this.goods)
    })
  },
  methods:{
    selectFood(index,event){
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el,300)
      console.log(index)
    },
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{click:true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{click:true,probeType: 3})
      console.log(this.menuScroll)
      this.foodsScroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _catchHeight(){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height +=item.clientHeight
        this.listHeight.push(height)
      }
      console.log(this.listHeight)
    }
  },
  computed:{
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods(){
      let foods = []
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if (food.count) {
            foods.push(food)
          }
        })
      })
      console.log(foods)
      return foods
    }
  },
  components:{
    Shopcart,
    Cartcontrol
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  /* background:pink; */
}
.goods .menu-wrapper{
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.goods .menu-wrapper .current{
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700
}
.menu-wrapper ul .menu-item{
  display: table;
  width: 56px;
  height: 54px;
  line-height: 14px;
  padding:0 12px;
}
.menu-wrapper ul .menu-item .icon{
  /* background:url('decrease_1@2x.png'); */
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.decrease{
  background: url('decrease_1@2x.png');
}
.discount{
  background: url('discount_1@2x.png');
}
.special{
  background: url('special_1@2x.png');
}
.invoice{
  background: url('invoice_1@2x.png');
}
.guarantee{
  background: url('guarantee_1@2x.png');
}
.menu-wrapper ul .menu-item .text{
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
}
.goods .foods-wrapper{
  flex:1;
}
.goods .foods-wrapper .title{
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,153,159);
  background: #f3f5f7;
}
.goods .foods-wrapper .food-item{
  display: flex;
  margin: 18px;
  padding-bottom: 18px; 
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.goods .foods-wrapper .food-item .icon{
  flex: 0 0 57px;
  margin-right: 10px;
}
.goods .foods-wrapper .food-item .content{
  flex: 1;
  position: relative;
}
.goods .foods-wrapper .food-item .content .name{
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  margin:2px 0 8px 0;
  color: rgb(7,17,27);
  font-weight: 700;
}
.goods .foods-wrapper .food-item .content .desc{
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .extra{
  line-height: 10px;
  font-size: 0px;
  color: rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .extra .sell-count{
  font-size: 10px;
  margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .extra .rating{
  font-size: 10px;
}
.goods .foods-wrapper .food-item .content .price{
  line-height: 24px;
}
.goods .foods-wrapper .food-item .content .price .now-price{
  font-weight: 700;
  margin-right: 8px;
  font-size: 14px;
  color:rgb(240,20,20);
}
.goods .foods-wrapper .food-item .content .price .old-price{
  font-weight: 700;
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
