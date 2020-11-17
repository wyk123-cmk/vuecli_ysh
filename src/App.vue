<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <mt-popup v-model="isShowActive" style="background:none;width:100%;">
      <div>
        <span @click="isShowActive=false" style="position: absolute;left: 75%;top: 5%;padding:11px 11px;z-index:1;"></span>
        <img :src="imgUrl" style="margin:0 auto;display:block;position:relative;" @click="btnimg" :style="isPC==true?'width:40%':'width:90%'"/>    
      </div>
    </mt-popup>
	<mt-popup v-model="isShowYhq" style="background:none;width:100%;">
	  <div>
	    <span @click="isShowYhq=false" style="position: absolute;left: 75%;top: 5%;padding:11px 11px;z-index:1;"></span>
	    <img :src="imgUrls" style="margin:0 auto;display:block;position:relative;" @click="btnimgYhq"/>    
	  </div>
	</mt-popup>
  </div>
</template>

<script>
import { activeUrl } from "../src/common/js/config";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isShowActive: false,
	  isShowYhq:false,
      imgUrl: '../static/img/SFsx.png',
	  imgUrls:'../static/img/yhq (1).png',
	  isPC:false
    };
  },
  created() {
    if (this.$router.currentRoute.path.indexOf("login") > -1) {
      this.isShowActive = false;
    } else {
      let IsOpen = localStorage.getItem("IsFirstOpen");
	  let Isopenyhq=localStorage.getItem("IsFirstOpenYhq");
      if (IsOpen == "show") {
        this.isShowActive = false;
		if (Isopenyhq == "show") {
		  this.isShowYhq = false;
		} else {
		  this.isShowYhq = true;
		}
		localStorage.setItem("IsFirstOpenYhq", "show");
      } else {
        this.isShowActive = true;
      }
      localStorage.setItem("IsFirstOpen", "show");
	
    }
	if(this.$util.IsPC()){
		this.isPC=true
	}
	else{
		this.isPC=false;
	}
  },
  methods: {
    btnimg(){
      this.isShowActive=false;
       this.$router.push({
          path: "/express",
          query: {
            redirect: "jkd",
            pageType:"small"
          }
        });
    },
	btnimgYhq(){
		this.isShowYhq=false;
		 this.$router.push({
		    path: "/yhq",
		    query: {
		      redirect: "jkd",
		      pageType:"home"
		    }
		  });
	},
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  components: {}
};
</script>
