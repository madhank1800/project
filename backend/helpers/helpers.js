exports.success=(res,msg)=>{
    const data={
        status:201,
        msg:msg
    }
    return res.json(data)
}
exports.fail=(res,msg)=>{
    const data={
        status:501,
        msg:msg
    }
    return res.json(data)
}