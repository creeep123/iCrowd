// const { ClarifaiStub } = require("clarifai-nodejs-grpc");
// const grpc = require("@grpc/grpc-js");
// const stub = ClarifaiStub.json();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key c6b235a8680a476f92eed433c17ed02a");


// export async function fetchConcepts(img) {
//     let conceptsList = []
//     stub.PostModelOutputs(
//         {
//             inputs: [{ data: { image: { url: "https://samples.clarifai.com/metro-north.jpg" } } }]
//         },
//         metadata,
//         (err, response) => {
//             if (err) {
//                 console.log("Error: " + err);
//                 return 
//             }

//             if (response.status.code !== 10000) {
//                 console.log("Received failed status: " + response.status.description + "\n" + response.status.details)
//                 return 
//             }


//             for (const c of response.outputs[0].data.concepts) {
//                 conceptsList.push(c.name + ": " + c.value)
//             }
//         }
//     );
//     return conceptsList
// }

import axios from 'axios'

const access_token = 'xVH70NU5LWrhA4Ma0Nzs9Bca'
const request_url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general'
const api_key = 'xVH70NU5LWrhA4Ma0Nzs9Bca'
const secret_key = 'sxv7sqALjfpp8B5ZHFztwFEIsdKT8fBy'

export async function fetchConcepts(img) {
    // fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${api_key}&client_secret=${secret_key}&`, {
    //     method: "POST",
    //     // headers: {
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     //     // "Accept": 'application/json,text/plain,*/*'
    //     // },
    // })
    //     // .then((res) => res.json())
    //     .then((data) => {
    //         ///////////////////////////////////////////////////////////
    //         // fetch(`${request_url}?access_token=${access_token}`, {
    //         //     method: "POST",
    //         //     headers: {
    //         //         'Content-Type': 'application/x-www-form-urlencoded',
    //         //         // "Accept": 'application/json,text/plain,*/*'
    //         //     },
    //         //     body: {
    //         //         image: "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"
    //         //     }
    //         // })
    //         //     .then((res) => res.json())
    //         //     .then((data) => {
    //         //         console.log("baidu:>>" + data)
    //         //     })
    //         //     .catch(e => console.log('Error :>> ', e))
    //         // console.log("baidu:>>" + data)
    //         ////////////////////////////////////////////////////////////
    //         console.log(data)
    //     })
    //     .catch(e => console.log('Error :>> ', e))

    axios({
        method: 'post',
        url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=xVH70NU5LWrhA4Ma0Nzs9Bca&client_secret=sxv7sqALjfpp8B5ZHFztwFEIsdKT8fBy&',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      })
      .then( (response)=>{
        console.log(response)
      })
      .catch( (error)=>{
        console.log(error)
      });
}




