
// text-1
// const isVerify = "" ;

// if(isVerify == true){
// console.log("user is verify")
// }
// else{
//     console.log(' user is not verify')
// }
// console.log(`${isVerify === true ? "user is verify" : "user is not verify" }`)

//2

function getTimeSpend(time){
    //get our and rest second 

    const hour = parseInt(time/3600) ;
    const remainigSecond = parseFloat(time % 3600)
    const minite = parseInt( remainigSecond / 60) ;
    second = remainigSecond % 60 ;

    return `${hour} hour  ${minite} minute   ${second} second ago`  ;
}

console.log(getTimeSpend(7865)) ;