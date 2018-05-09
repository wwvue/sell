<template>
  <div class="shopcart">
    <div class="content">
    	<div class="content-left">
    		<div class="logo-wrapper">
    			<div class="logo" v-bind:class="{'highlight':totalCount>0}">
    				<i class="icon-shopping_cart" v-bind:class="{'highlight':totalCount>0}"></i>
    			</div>
    			<div class="num" v-show="totalPrice>0">{{totalCount}}</div>
    		</div>
    		<div class="price" v-bind:class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
    		<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
    	</div>
    	<div class="content-right">
    		<div class="pay" v-bind:class="[this.totalPrice<this.minPrice ? 'not-enough' : 'enough']">{{payDesc}}</div>
    	</div>
    </div>
    <div class="ball-container">
    	<transition name="ball-animate">
    		<div v-for="ball in balls" v-show="ball.show">
    			<div class="inner"></div>
    		</div>
    	</transition>	
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shopcart',
  props:{
  	selectFoods:{
  		type:Array,
  		default(){
  			return []
  		}
  	},
  	deliveryPrice:{
  		type:Number,
  		default: 0
  	},
  	minPrice:{
  		type:Number
  	}
  },
  created(){
    console.log(this.selectFoods,"hello")
  },
  computed:{
  	totalPrice(){
  		let total = 0
  		this.selectFoods.forEach((food) => {
  			total +=food.price * food.count
  		})
  		return total
  	},
  	totalCount(){
  		let count = 0
  		this.selectFoods.forEach((food) => {
  			count +=food.count
  		})
  		return count
  	},
  	payDesc(){
  		if (this.totalPrice===0) {
  			return `￥${this.minPrice}元起送`
  		}else if (this.totalPrice<this.minPrice) {
  			let diff = this.minPrice - this.totalPrice
  			return `还差￥${diff}元起送`
  		}else{
  			return "去结算"
  		}
  	}/*,
  	payClass(){
  		if (this.totalPrice<this.minPrice) {
  			return 'not-enough'
  		}else{
  			return 'enough'
  		}
  	}*/
  },
  data () {
    return {
      balls:[
      {
      	show:false
      },
      {
      	show:false
      },
      {
      	show:false
      },
      {
      	show:false
      },
      {
      	show:false
      }
      ]
    }
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopcart{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 48px;
	background: #000
}
.shopcart .content{
	display: flex;
	background: #141d27;
	font-size: 0;
}
.shopcart .content .content-left{
	flex: 1;
}
.shopcart .content .content-left .logo-wrapper{
	display: inline-block;
	vertical-align: top;
	position: relative;
	top:-10px;
	margin: 0 12px;
	padding: 6px;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	border-radius: 50%;
	background: #141d27;
}
.logo{
	width:100%;
	height: 100%;
	border-radius: 50%;
	text-align: center;
	background: #2b343c; 
}
.logo .icon-shopping_cart{
	line-height: 44px;
	font-size: 24px;
	color: #80858a;
}
.logo-wrapper .highlight{
	background: rgb(0,160,220)
}
.logo .highlight{
	color:#fff;
}
.num{
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	background: rgb(240,20,20);
	box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .content .content-left .price{
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
	line-height: 24px;
	padding-right: 12px; 
	box-sizing: border-box;
	border-right: 1px solid rgba(255,255,255,0.1);
	font-size: 16px;
	font-weight: 700;
	color:rgba(255,255,255,0.4);
}
.shopcart .content .content-left .highlight{
	color:#fff;
}
.shopcart .content .content-left .desc{
	display: inline-block;
	vertical-align: top;
	margin: 12px 0 0 12px;
	line-height: 24px;
	font-size: 10px;
	color:rgba(255,255,255,0.4);
}
.shopcart .content .content-right{
	flex: 0 0 105px;
	width: 105px;
	background: blue;
}
.pay{
	background: #2b333b;
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	font-weight: 700;
	color:rgba(255,255,255,0.4);
}
.content-right .not-enough{
	background: #2b333b;
}
.content-right .enough{
	background: #00b43c;
	color:#fff;
}
.shopcart .ball-container{

}
.shopcart .ball-container .ball{
	display: fixed;
	left: 32px;
	bottom: 22px;
	z-index: 200;
}
.shopcart .ball-container .drop-transition{
	transition: all .4s
}
.inner{
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: rgb(0,160,220);
	transition: all .4s
}
</style>
