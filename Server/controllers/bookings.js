import { getBookingData } from "../models/bookingsModel.js"
import { sendEmail } from "./utils/mailer.js"

async function sendBookingToEmail(options) {
  try {
    sendEmail(options)
  } catch (error) {
    console.log(error.stack)
    res.sendStatus(500)
  }
}

async function getUserBooking(req, res) {
  try {
    const userId = req.userId
    const email = req.userEmail
    const bookingId = req.params.bookingId
    const finalStatus = await getBookingData(userId, bookingId)
    const options = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "test",
      html: ` <div>
              <span>hello</span>
              <p>This is a test email don't respond</p>
            </div>`
    }
    await sendBookingToEmail(options)
    res.json(finalStatus)
  } catch (error) {
    console.log(error.stack)
    res.sendStatus(500)
  }
}

export { getUserBooking }
