<template>
    <div>
        <div class="search-bar">
            <van-row class="test-row">
                <van-col span="3">
                    <img :src="locationIcon" width="60%" class="location-icon" />
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5" class="text-center">
                    <van-button size="mini" class="search-btn">查找</van-button>
                </van-col>
            </van-row>
        </div>
        
        <!--swipwer area-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.imageUrl" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- type bar -->
        <div class="type-bar">
            <div  v-for="(cate,index) in category" :key="index" >
                <img v-lazy="cate.image" />
                <span>{{cate.mallCategoryName}}</span> 
            </div>
        </div>

        <!--AD banner area-->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
 
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <floor-componet :floorData="floor1" :floorTitle="floorName.floor1"></floor-componet>    
        <floor-componet :floorData="floor2" :floorTitle="floorName.floor2"></floor-componet>    
        <floor-componet :floorData="floor3" :floorTitle="floorName.floor3"></floor-componet>    
 
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info-component :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info-component>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
 

    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import floorComponet from '../component/floorComponent'
    import {getIndex} from '@/api/index'
    import {toMoney} from '@/filter/moneyFilter'
    import goodsInfoComponent from '../component/goodsInfoComponent'
    export default {
        data() {
            return {
                msg: 'shop',
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray: [
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
                ],
                category: [],
                adBanner: '',
                recommendGoods: [],
                floor1: [],
                floor2: [],
                floor3: [],
                floorName: {},
                hotGoods: [],   // 热卖商品 
                swiperOption: {
                    slidesPerView: 3
                }
            }
        },
        created() {
            this._getIndex();
        },
        methods: {
            _getIndex() {
                // const toast = Toast.loading({
                //     mask: true,
                //     message: '加载中...'
                // });
                getIndex().then((res) => {
                    // toast.clear();
                    if (res.data) {
                        this.category = res.data.category;
                        this.adBanner = res.data.advertesPicture;
                        this.recommendGoods = res.data.recommend;
                        this.floor1 = res.data.floor1;
                        this.floor2 = res.data.floor2;
                        this.floor3 = res.data.floor3;
                        this.floorName = res.data.floorName;
                        this.hotGoods = res.data.hotGoods;
                    }
                })
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        },
        components: {
            swiper,
            swiperSlide,
            floorComponet,
            goodsInfoComponent
        }
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background-color: #e5017d;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        padding: 0 5px;
        border: none;
        box-sizing: border-box;
        border-bottom: .5px solid #fff;
        background-color: #e5017d;
        color: #fff;
    }
    .search-btn{
        color: #e5017d;
    }
    .location-icon{
        padding: .2rem 0 0 .3rem;
    }
    
    .swiper-area{
        width:20rem;
        max-height: 9rem;
        clear:both;
        overflow: hidden;
    }
     .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
  .type-bar img{
      width: 3rem;
  }

 .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }
 
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
 
 
 .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
 
 
</style>