exports.homepage = (req,res)=>{
    try {
        res.json("Welcome to my API")
    } catch (error) {
        console.log(error)
    }
}
