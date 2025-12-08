const { data } = require("react-router-dom")
const userModel = require ("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const brevo = require("@getbrevo/brevo")
const {signUpTemplate,forgotPasswordTemplate} = require("../controller/signUpEmail")



exports.homepage = (req,res)=>{
    try {
        res.json("Welcome to my API")
    } catch (error) {
    }
}


exports.createUser = async (req,res)=>{
    try {
    const {firstName,lastName,email,password} = req.body

    if (!firstName) {
        return res.status(400).json({
            message: `First name is required`
        })
    }

    if (!lastName) {
        return res.status(400).json({
            message: `Last name is required`
        })
    }

    if (!email) {
        return res.status(400).json({
            message: `Email is required`
        })
    }

    if (!password) {
        return res.status(400).json({
            message: `Password is required`
        })
    }

    const checkuser = await userModel.findOne({email:email.trim().toLowerCase(),})
    if(checkuser) {
        return res.status(400).json({
            message:`user with this email already exists`
        })
    }

    const otp = Math.round(Math.random() * 1e6)
    const saltPassword = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password,saltPassword)
    const userinfo = {
        firstName:firstName.trim().charAt(0).toUpperCase()+firstName.trim().slice(1),
        lastName:lastName.trim().charAt(0).toUpperCase()+lastName.trim().slice(1),
        email:email.trim().toLowerCase(),
        password:hashpassword,
        otp
    }

        const user = await userModel.create(userinfo)
        res.status(200).json({
            message:`user created successfully`,
            data:user
        })
        const emailInstance = new brevo.TransactionalEmailsApi()
emailInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey,process.env.brevo_Api_Key)

const sendEmail = new brevo.SendSmtpEmail()
sendEmail.subject = `Verify your email`
sendEmail.to=[{email : user.email}]
sendEmail.sender = { name: 'Trust Us', email: 'youngdee50@gmail.com'}

sendEmail.htmlContent = signUpTemplate(otp,user.firstName)

await emailInstance.sendTransacEmail(sendEmail)

    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})
}
}


exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body

        const checkuser = await userModel.findOne({email:email.trim().toLowerCase()})

        if(!checkuser.isVerified){
            return res.status(400).json({
                message:"Email not verified"
            })
        }

        if(!checkuser){
            return res.status(404).json({
                message: `user not found`
            })
        }

        const checkPassword = await bcrypt.compare(password,checkuser.password)
        if(!checkPassword){
            return res.status(400).json({
                message:"Invalid password"
            })
        }

        const token = jwt.sign({id: checkuser._id,},"Benson",{expiresIn:"1d"})

        return res.status(200).json({
            message: `Login successful`,
            data:checkuser,
            token
        })

    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message 
        })
    }
}



exports.verifyEmail = async (req,res)=>{
    try {
        const {email,otp} = req.body
        const checkEmail = await userModel.findOne({email:email.trim().toLowerCase()})
        if(!checkEmail){
            return res.status(400).json({
                message:"user not found"
            })
        }
        if(otp !==checkEmail.otp){
            res.status(400).json({
                message:"Otp invalid"
            })
        }

        checkEmail.isVerified = true
        checkEmail.save()
        res.status(200).json({
            message:"Email successfully verified"
        })
    } catch (error) {
        res.status(500).json({
            messages:"Something went wrong",
            error: error.message
        })
    }
}

exports.resetPassword = async (req,res)=>{
    try {
        const {email} = req.body
        const checkEmail = await userModel.findOne({email:email.trim().toLowerCase()})
        if(!checkEmail){
            return res.status(400).json({
                message:"Email does not exist"
            })
        }
        const Otp = Math.round(Math.random() * 1e6)
        checkEmail.otp = Otp
        checkEmail.save()

        const emailInstance = new brevo.TransactionalEmailsApi()
        emailInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey,process.env.brevo_Api_Key)
        

        const sendEmail = new brevo.SendSmtpEmail()
        sendEmail.subject = `Reset your password`
        sendEmail.to=[{email : checkEmail.email}]
        sendEmail.sender = { name: 'Trust Us', email: 'youngdee50@gmail.com'}

        sendEmail.htmlContent = forgotPasswordTemplate(Otp,checkEmail.firstName)
        await emailInstance.sendTransacEmail(sendEmail)

        res.status(200).json({
            message:"Password reset otp sent to your email"
        })
    } catch (error) {

        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}

exports.resetPass = async (req,res)=>{
    try {
        const {email, otp, newPassword} = req.body
        const checkUser = await userModel.findOne({email:email.trim().toLowerCase()})

        console.log(otp)
        console.log(checkUser.otp)
        if(otp !== checkUser.otp || otp === null){
            return res.status(400).json({
                message:"Invalid otp"
            })
        }

        const saltPassword = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(newPassword,saltPassword)
        checkUser.password = hashpassword
        checkUser.otp = null
        await checkUser.save()


        res.status(200).json({
            message:"Password reset successful"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}
    
    