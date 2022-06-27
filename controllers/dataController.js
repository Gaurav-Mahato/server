const sendData = (req,res) => {
    const {zoneDetails,branchDetails, plantDetails} = req
    console.log(zoneDetails)
    console.log(branchDetails)
    console.log(plantDetails)
    res.send({
        zone: zoneDetails,
        branch: branchDetails,
        plant: plantDetails
    })
}

export {sendData}