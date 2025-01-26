<template>
    <div class="main">
        <h1 style="position: relative; top: 90px; margin-left: 680px;">病人信息列表</h1>
    <el-collapse v-model="activeNames" @change="handleChange" style="position: relative; top: 100px;">
      <el-collapse-item v-for="patient in patients" :title="patient.name" :name="patient.name">
        <div>
            <el-descriptions
                :title="patient.name"
                direction="vertical"
                border
                style="margin-top: 20px"
            >
            <el-descriptions-item
                :rowspan="2"
                :width="140"
                label="影像"
                align="center"
            >
            <img :src="patient.picture" alt="">
            </el-descriptions-item>
            <el-descriptions-item label="姓名"><el-button @click="enterPatient">{{ patient.name }}</el-button></el-descriptions-item>
            <el-descriptions-item label="年龄">{{ patient.age }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ patient.sex }}</el-descriptions-item>
            <el-descriptions-item label="床位"><el-tag>{{ patient.bed }}</el-tag></el-descriptions-item>
            
            </el-descriptions>
        </div>
      </el-collapse-item>
    </el-collapse>
    </div>
</template>

<script setup>
import { getPatientsAPI, getPictureAPI } from '@/apis/api';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const patients = ref([])
const getPatients = async () => {
    patients.value = getPatientsAPI().data
}
const getPicture = async() => {
  const temp = await getPictureAPI();
  for (let i = 0; i < patients.value.length; i++)
{
  patients.value[i].picture = temp.data.result;
}
console.log(temp.data.result)
}
onMounted(()=>{getPatients();getPicture()})

const enterPatient = () => {
    router.push('/patient')
}
// import { ref } from 'vue'
// import router from '@/router'
// import { ElNotification } from 'element-plus'
// import { postN, get } from '@/http'
// import { onMounted } from 'vue'
// const isAllPatient = ref(false)
// const patientList = ref([
//   {
//     name: 'aa',
//     patient_id: 1
//   }
// ])
// const myPatientList = ref([
//   {
//     name: 'aa',
//     patient_id: 1
//   }
// ])
// const selectPatient = ref({
//   name: 'aa',
//   patient_id: 1
// })
// const searchText = ref('')
// const cases = ref()
// const getPatient = (pa) => {
//   selectPatient.value = pa
//   //getCT
//   get(
//     '/medical/get_case',
//     { patient_id: pa.patient_id },
//     (msg) => {
//       cases.value = msg.cases.map((item) => ({
//         ...item, // 展开原有属性
//         show: false // 添加新属性show，并设置初始值为false
//       }))
//     },
//     (error, status) => {
//       ElNotification({ title: error.msg, type: 'error' })
//     }
//   )
// }
// onMounted(() => {
//   get(
//     '/medical/get_all_patient',
//     {},
//     (msg) => {
//       patientList.value = msg.patient_list
//       myPatientList.value = msg.my_patient_list
//       getPatient(patientList.value[0])
//     },
//     (error, status) => {
//       ElNotification({ title: error.msg, type: 'error' })
//     }
//   )
// })

// const searchPatient = () => {
//   if (isAllPatient.value) {
//     patientList.value.forEach((element) => {
//       if (
//         element.patient_id == searchText.value ||
//         element.name == searchText.value
//       ) {
//         getPatient(element)
//         return
//       }
//     })
//   } else {
//     myPatientList.value.forEach((element) => {
//       if (
//         element.patient_id == searchText.value ||
//         element.name == searchText.value
//       ) {
//         getPatient(element)
//         return
//       }
//     })
//   }
// }

// const gotoCase = (item) => {
//   router.push('/patient/' + selectPatient.value.patient_id + '/case/' + item.id)
//   ElNotification({
//     title: '获取图像成功',
//     type: 'success',
//     position: 'bottom-right'
//   })
// }
</script>

<style scoped>
/* el-collapse-item :hover {
    color: #27ba9b;
} */
.main {
    background-image: url("../assets/backgroundlight.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    min-height: 100vh; 
}
/* .overflow-auto {
  overflow-y: auto; 
}
.patient-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}

.case-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
} */
</style>
