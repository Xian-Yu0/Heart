<template>
    <div class="main" style="overflow: hidden;">
        <h1 style="margin-top: 75px; margin-left: 600px;">病人姓名：病人AAA</h1>
        <el-row>
<el-col :span="12" style="margin-left: 50px;">
  <el-descriptions
    title="Basic Information of Patient"
    direction="vertical"
    :column="4"
    :size="size"
    border
    style="position: relative; top: 110px;"
  >
    <el-descriptions-item label="姓名" >张衡</el-descriptions-item>
    <el-descriptions-item label="电话" >18100000000</el-descriptions-item>
    <el-descriptions-item label="年龄" :span="2">33</el-descriptions-item>
    <el-descriptions-item label="CT文件">
        <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    style="padding-top: 7px; padding-left: 10px;"
    :limit="1"
    :show-file-list="true"
    :auto-upload="false"
  >
  <template #trigger> <el-button type="primary">选择文件</el-button> </template>
  </el-upload>
    </el-descriptions-item>
    <el-descriptions-item label="反馈信息" :width="1000">
      心脏正常
    </el-descriptions-item>
  </el-descriptions>
  <el-button type="primary" style=" position: relative; top: 140px; left: 300px;">
      上传并获取图像
  </el-button>
</el-col>
          <el-col style="margin-top: -200px;">

          
        <div class="banner" ref="target">
          <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
        <el-carousel trigger="click" height="550px" width="350px" >
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../assets/患者心脏影像.png" alt="">
            </el-carousel-item>
        </el-carousel>
        </div>
        </el-col>
        </el-row>
    </div>

    <div class="large" :style="[
      {
        backgroundImage: `url(../assets/患者心脏影像.png)`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside">
   </div>
</template>
<script setup>
import { ref,watch } from 'vue'
import { useMouseInElement } from '@vueuse/core';

const top = ref(0)
const left = ref(0)
const target = ref(null)
const {elementX, elementY, isOutside} = useMouseInElement(target)
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
    
if(isOutside.value) {
  return
}
console.log(elementX.value)
console.log(elementY.value)
console.log(!(isOutside.value))
if (elementX.value > 100 && elementX.value < 400){
    left.value = elementX.value - 100
}
if (elementY.value > 100 && elementY.value < 400){
    top.value = elementY.value - 100
}
if (elementX.value < 100){
    left.value = 0
}
if (elementX.value > 400){
    left.value = 300
}
if (elementY.value < 100){
    top.value = 0
}
if (elementY.value > 400){
    top.value = 300
}
positionX.value = -left.value * 2
positionY.value = -top.value * 2
})

const fileList = ref([])
</script>

<style scoped lang="scss">
.main {
    background-image: url("../assets/backgroundlight.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    min-height: 100vh; 
}

.banner {
  width: 500px;
  height: 500px;
//    position: absolute;
//   left: 0;
//   top: 0;
 //  z-index: 98;
  margin: 20px auto;
  margin-bottom: 200px;
  margin-right: 150px;
  img {
    width: 100%;
    height: 500px;
  }
}
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 500px;
    height: 500px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}




.imgCard {
  display: flex;
  justify-content: center;
  align-items: center;
}
.topbar {
  height: 10vh;
  display: flex;
  align-items: end;
}
.selectBox {
  width: 200px;
  margin-left: 6vw;
}
.blue-border {
  border-color: blue !important; /* 使用!important来确保覆盖Vuetify的默认样式 */
}
.red-border {
  border-color: red !important; /* 使用!important来确保覆盖Vuetify的默认样式 */
}
.main {
  height: 90vh;
}
.pointCard {
  height: 50vh;
}
.backtrigger {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>