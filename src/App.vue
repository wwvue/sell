<template>
  <div id="app">
    <app_header v-bind:seller="seller"></app_header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import axios from 'axios'
export default {
  name: 'App',
  data(){
    return {
      seller:{}
    }
  },
  created(){
    axios.get('api/seller').then((response)=>{
        this.seller = response.data.data
        console.log(this.seller)
    })
  },
  methods:{
    
  },
  components: {
   app_header:Header
  }
}
</script>

<style>
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
#app .tab::after{
  content:'';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7,17,27,0.1);
}
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    #app .tab::after::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    #app .tab::after::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
#app .tab .tab-item{
  flex: 1;
  text-align: center;
 /*  background: red */
}
#app .tab .tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93)
}
#app .tab .tab-item .active{
  color: rgb(240,20,20);
}
</style>
