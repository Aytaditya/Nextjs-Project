import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "4a4e051b657fe9",
//         pass: "b1a91cfc6ead8a"
//     }
// });


// emailtype is verifyEmail or forgotPassword type email depending what we have to do
export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpire: Date.now() + 36000000 })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 36000000 })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4a4e051b657fe9",
                pass: "b1a91cfc6ead8a"
            }
        })
        

        const mailOptions={
            from:'adityaaryan531@gmail.com',
            to:email,
            subject: emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password',
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify' : 'reset'} 
            or copy and paste the following link in your browser.<br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse=await transporter.sendMail(mailOptions)

        return mailresponse;

    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}