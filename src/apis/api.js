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