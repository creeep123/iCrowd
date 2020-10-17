import axios from 'axios'

const api_key = 'xVH70NU5LWrhA4Ma0Nzs9Bca'
const secret_key = 'sxv7sqALjfpp8B5ZHFztwFEIsdKT8fBy'

export async function fetchConcepts(img) {
    img =  encodeURIComponent(img)
    try {
        let response = await axios({
            method: 'post',
            url: `/baiduTokenApi/token?grant_type=client_credentials&client_id=${api_key}&client_secret=${secret_key}&`,
        })
        let access_token = response.data.access_token
        let result = fetch(`/baiduPicApi/image-classify/v2/advanced_general?access_token=${access_token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `image=${img}`,
        })
        result = (await result).json()
        return result
    } catch (error) {
        return error
    }
}




