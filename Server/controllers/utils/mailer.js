import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: { user: process.env.AUTH_EMAIL, pass: process.env.AUTH_PASS }
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Ready for messages")
    console.log(success)
  }
})

const sendEmail = async (mailOptions) => {
  try {
    const emailSent = await transporter.sendMail(mailOptions)
    return emailSent
  } catch (error) {
    console.log(error.stack)
  }
}

export { sendEmail }
