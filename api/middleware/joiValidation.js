
const joiValidation =(schema)=>{
    return (req,res,next)=>{
        const {error} = schema.validate(req.body)
        if(error){
            console.log(error.details[0].message)
            return res.status(400).json(error.details[0].message)
        }
        next()
    }
}
export default joiValidation