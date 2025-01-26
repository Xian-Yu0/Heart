import httpRequest from "@/utils/http"

export function getPatientsAPI()
{
    let array = []
    for (let i = 0; i < 6; i++)
    {
        let sex = i % 2 == 0 ? '男' : '女'
        array.push({ name: '此处为' + i + '号病人姓名', age: 20 + i, sex: sex, bed: '1号房1床', photo: 'src/assets/photo.png', picture: 'src/assets/患者心脏影像.png' })
    }
    return {data: array}
}

export function getPictureAPI()
{
    return httpRequest({
        url: '/getPicture/'
    })
}

export function sendNiigzFileAPI(formData, config = {})
{
    // console.log("in api")
    // formData.forEach((value, key) => {
    //     console.log(key, value);
    // });
    return httpRequest({
        url: '/sendNiigzFile/',
        method: 'POST',
        data: formData,
        onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
                // 在此回调中获取上传进度
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                config.onProgress && config.onProgress(progress);  // 如果传入了配置的回调，调用它
            }
        },
    })
}

export function patientRegisterAPI(id, password)
{
    return httpRequest({
        url: '/patientRegister/',
        method: 'POST',
        data: {id, password}
    })
}

export function patientLoginAPI(id, password)
{
    return httpRequest({
        url: '/patientLogin/',
        method: 'POST',
        data: {id, password}
    })
}

export function hasSlicesAPI(id)
{
    return httpRequest({
        url: '/hasSlices/',
        method: 'GET',
        params: { id }
    })
}

export function downloadSlicesAPI(id)
{
    return httpRequest({
        url: '/downloadSlices/',
        method: 'GET',
        responseType: 'blob',
        params: { id }
    })
}