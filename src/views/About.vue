<template>
  <div class="w">
    <div class="title">声纹比对</div>
    <el-menu
      default-active="/register"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="/register">
        <i class="el-icon-menu"></i>
        <span slot="title">声纹注册</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <i class="el-icon-setting"></i>
        <span slot="title">声纹比对</span>
      </el-menu-item>
    </el-menu>
    <!-- 主体 -->
    <div class="mainbody">
      <div class="history_title">
        <p>当前校验客户</p>
      </div>
      <div class="situationBox">
        <div class="situation_left">
          今日已校验__位用户 王XX、李XX等__人校验结果异常
        </div>
        <div class="situation_right">当前接入__人</div>
      </div>
      <div class="box" id="nowResult">
        <!-- 姓氏头像 -->
        <div class="box" id="nameIcon">
          <h2 class="colorFont">吉</h2>
        </div>
        <!-- 信息列表 -->
        <div class="nameInfo" style="width: 464px">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="14">
                <el-form-item label="客户姓名:"> 吉XX </el-form-item>
                <el-form-item label="注册时间:">
                  2021.10.13 12:03
                </el-form-item></el-col
              >
              <el-col :span="10">
                <el-form-item label="手机号码:"> 12312312312 </el-form-item>
                <el-form-item label="声纹注册:">
                  已注册
                  <img
                    class="icons"
                    src="../assets/img/bofang2.png"
                    alt=""
                  /> </el-form-item
              ></el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 通话状态 -->
        <div class="callStatu">
          <div class="iconImg">
            <img class="icons" src="../assets/img/tongxun.png" alt="" />
          </div>
          <p>通话中</p>
        </div>
      </div>
      <div class="history_title">
        <p>历史记录</p>
      </div>
      <!-- 历史记录 -->
      <div class="box" id="history_record">
        <!-- 姓氏头像 -->
        <div class="box" id="nameIcon">
          <h2 class="colorFont">吉</h2>
        </div>
       
        <div class="nameInfo" style="width:76%" >
          <el-form ref="form"   :model="form" label-width="100px">
            <el-row>
              <el-col :span="7">
                <el-form-item label="客户姓名:" ><span class="sp">吉XX </span> </el-form-item>
                <el-form-item label="手机号码:"> 12312312312 </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="注册时间:">
                  2021.10.13 12:03
                </el-form-item>
                <el-form-item label="校验时间:">
                  2021.10.13 12:03
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="声纹注册:">
                  已注册
                  <img class="icons" src="../assets/img/bofang2.png" alt="" />
                </el-form-item>
                <el-form-item label="通话时长:">
                  00:03
                  <img class="icons" src="../assets/img/tongxun.png" alt="" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="resultImg">
          <img style="width:30px;height:30px;margin-left:30px" src="../assets/img/zhengque.png" alt=""></div>      </div>
    </div>
    <div class="footer">
      <div class="content">
        版权所有© 2021 南京龙垣信息科技有限公司
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2021036408 "
          >苏ICP备2021036408号</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        name: "",
        time: "",
        num: "",
        statu: "",
      },
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(this.$route.path);
      if (this.$route.path !== key) {
        this.$router.push(key);
      }

      console.log(key, keyPath);
    },
  },

  mounted() {},
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.w {
  width: 100%;
  height: 55rem;
  min-height: 99vh;
  min-width: 94.6875rem;
  overflow-y: hidden;
  position: relative;
  background-image: url("../assets/img/mainbg.png");

  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;

  /* text-align: center; */
}
.sp{
  margin-left: 1px;
}
/* 菜单栏 */
.el-menu-vertical-demo {
  float: left;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 50px;
  margin-left: 20px;
  width: 150px;
}
.el-menu-item span {
  color: rgb(7, 185, 230);
}
.situationBox {
  width: 800px;
  margin-top: 20px;
  margin-left: 200px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(215, 215, 215, 0.1);
}
.title {
  padding-top: 1.25rem;
  color: #fff;
  font-size: 28px;
}

.mainbody {
  padding-top: 100px;
  width: 1200px;
  margin: 0 auto;
  /* width: 1354px;
  padding-top: 4rem;
  display: flex;
 flex-direction: column;
  justify-content: space-evenly; */
  /* align-items: center; */
}

#nowResult {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 800px;
  height: 160px;
  margin: 0 auto;
}
.history_title {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 200px;
  /* padding-left: 30px; */
  width: 800px;
}
.history_title p {
  border-left: 3px solid #ccc;
  padding-left: 20px;
  font-size: 20px;
  color: #fff;
}
/* 历史记录 */
#history_record {
  display: flex;
  width: 800px;
  height: 104px;
      margin: 0 auto;
    align-content: stretch;
    flex-direction: row;
    align-items: center;
}
#nameIcon {
  width: 50px;
  height: 50px;
  margin-top: -1px;
  /* border: 1px solid #000; */
  border-radius: 12px;
  line-height: 25px;
  margin-left: 26px;
  /* font-size: 25px;
  font-weight: 600; */
}
.colorFont {
  background: linear-gradient(to bottom, #bca5d6, #9163bb, #4aeaff);
  -webkit-background-clip: text;
  color: transparent;
}
/* 客户信息 */
.nameInfo {
  width: 400px;
  color: #fff;
  /* border: 1px solid red; */
}
.icons {
  margin-left: 5px;
  width: 25px;
  height: 25px;
}
.callStatu {
  color: #fff;
  font-size: 13px;
}
#mid_top {
  position: relative;
  display: flex;
  height: 13rem;
  justify-content: center;
  /* align-items: center; */
  margin-top: 10.5rem;
  /* margin: 0 auto; */
}

#mid_top::before {
  position: absolute;
  top: -33%;
  left: -14%;
  content: url("../assets/img/up2.png");
}

#mid_bottom {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  /* margin-top: 1.375rem; */
  height: 13rem;
}

@keyframes glow {
  0% {
    border-color: #ccc;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2),
      inset 0 0 5px rgba(194, 197, 204, 0.1), 0 1px 0 #ccc;
  }

  100% {
    border-color: #fff;
    box-shadow: 0 0 20px rgba(194, 197, 204, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.4), 0 1px 0 #fff;
  }
}

.box {
  width: 21.25rem;
  height: 16.5625rem;
  display: inline-block;
  /* background-color: #ffffff; */
  border-radius: 4px;
  /* border: 1px solid #c2c5cc; */
  box-shadow: 0 0 22px #c2c5cc inset;
  margin-top: 1.25rem;
  padding-top: 0.9375rem;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 37%;
  line-height: 15px;
}

.content {
  line-height: 40px;
  bottom: 0;
  width: 100%;
  text-align: center;
  /* background: #002454; */
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  width: 26.875rem;
}
.content a {
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
}
</style>