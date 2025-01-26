<template>
    <div class="main" style="overflow: hidden;">
        <h1 style="margin-top: 75px; margin-left: 600px;">病人姓名：张衡</h1>
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
    multiple
    style="padding-top: 7px; padding-left: 12px;"
    :limit="1"
    :show-file-list="true"
    :auto-upload="false"
  >
  <template #trigger> <el-button type="primary" @click="chooseFile">选择文件</el-button> </template>
  </el-upload>
  <!-- <input type="file" ref="fileInput" @change="handleFileUpload" /> -->
    </el-descriptions-item>
    <el-descriptions-item label="反馈信息" :width="1000">
      心脏正常
    </el-descriptions-item>
  </el-descriptions>
  
  <el-button @click="uploadFile" type="primary" style="position: relative; top: 140px; left: 250px;">上传文件</el-button>
  <el-button @click="downloadSlices" type="primary" style="position: relative; top: 140px; left: 250px;">下载切片</el-button>
  <!-- <el-button type="primary" style=" position: relative; top: 140px; left: 300px;">
      上传并获取图像
  </el-button> -->
</el-col>
          <el-col style="margin-top: -200px;">

          
        <div class="banner" ref="target">
          <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
        <el-carousel trigger="click" height="550px" width="350px" >
            <el-carousel-item v-for="png in pngs">
                <!-- <img :src="png" alt=""> -->
                <img :src="`${png}?t=${new Date().getTime()}`" alt="">
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
   <div v-if="uploadProgress != null" style="height: 20px; position: relative; bottom: 200px; left: 50px; z-index: 2000; font-size: 16px;">
      文件上传中，当前进度{{ uploadProgress }}%
   </div>
   <div v-if="uploadProgress == 100" style="height: 20px; position: relative; bottom: 200px; left: 50px; z-index: 2000; font-size: 16px;">
      上传完成，分析中
   </div>
   <div v-if="uploadProgress == 100 && pngs != null" style="height: 20px; position: relative; bottom: 200px; left: 50px; z-index: 2000; font-size: 16px;">
    分析完成，切片图像见右
   </div>
</template>
<script setup>
import { ref,watch } from 'vue'
import { useMouseInElement } from '@vueuse/core';
import { downloadSlicesAPI, hasSlicesAPI, sendNiigzFileAPI } from '@/apis/api';
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message-box.css';
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
// console.log(elementX.value)
// console.log(elementY.value)
// console.log(!(isOutside.value))
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

const chooseFile = () => {

}

const fileList = ref([])
const uploadProgress = ref(0)
const pngs = ref([])
const route = useRoute();
const uploadFile = async() => {
  console.log("122313213123123123121111")
  ElMessageBox.confirm(
    '确认上传吗？上传后，之前上传的文件将被覆盖',
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
    )
    .then(async () => {
      await uploadFunc()
    })
    .catch(() => {ElMessage({type: 'error',message: '取消操作',})})
}
const uploadFunc = async () => {
  pngs.value = null
  const formData = new FormData();
  formData.append("account", route.params.id)
  formData.append("niigzFile", fileList.value[0].raw)
  const temp = await sendNiigzFileAPI(formData, {
          onProgress: (progress) => {
            uploadProgress.value = progress;  // Update the progress
          },
        })
  pngs.value = temp.data.result
  for (let i = 0; i < pngs.value.length; i++)
  {
    pngs.value[i] = 'http://124.70.67.210:8000' + pngs.value[i]
  }
  if (pngs.value.length > 10) {
  pngs.value = pngs.value.slice(4, pngs.value.length - 3);
  }
  fileList.value = []
}

const downloadSlices = async () => 
{
  const hasSlices = await hasSlicesAPI(route.params.id)
  if (!hasSlices.data.has)
{
  ElMessage({type: 'error', message: '你还未上传过CT文件'})
  return
}
await downloadSlicesAPI(route.params.id).then(response => {
    const blob = response.data;
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'mySlices.zip');  // 设置下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}
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