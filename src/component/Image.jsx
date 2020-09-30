import React from 'react';

function Image(){
    return(
        <img src={require('../img/banner1.jpg')} alt='Burwood Campus' width = '100%'  ></img>
    )
}
function Image2(){
    return(
        <img src={require('../img/banner2.jpg')} alt='Burwood Campus' width = '100%'  ></img>
    )
}

function Image3(){
    return(
        <img src={require('../img/banner3.jpg')} alt='Burwood Campus' width = '100%'  ></img>
    )
}

function Image4(){
    return(
        <img src={require('../img/banner4.jpg')} alt='Burwood Campus' width = '100%'  ></img>
    )
}

function Logo(){
    return(
        <img src={require('../img/avatar.png')} alt='Burwood Campus' width = '100%'  ></img>
    )
}

export default Image
export {Image2,Image3,Image4,Logo}