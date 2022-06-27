const arrayMaker = (sendingData,str) => {
    let arr = []
    Object.keys(sendingData).forEach(key => {
      arr.push(sendingData[key][str])
    })
    return usingFilter(arr)
}
const valueMaker = (sendingData,str) => {
    const s = []
    for(let i=0;i<arrayMaker(str).length;i++){
        let qt = []
        Object.keys(sendingData).forEach(key => {
            if(sendingData[key][str] === arrayMaker(str)[i]){
                qt.push(sendingData[key]['Billed Quantity'])
            }
        })
        const sumEntry = qt.reduce((acc, curr) => acc + curr)
        s.push(sumEntry)
    }
    return s;
}

export {arrayMaker, valueMaker}