import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()

console.log(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
)
function initoAuth2Client() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URL
  )
  return oAuth2Client
}
// initoAuth2Client()

async function getUserEmail(auth) {
  const service = google.people({ version: "v1", auth })
  const profile = await service.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses"
  })
  return profile.data.emailAddresses[0].value
}

const oauthInitialization = (req, res) => {
  const oAuth2Client = initoAuth2Client()

  const oauth_Url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })

  // redirect to OAuth consent screen
  res.redirect(oauth_Url)
}

const processOauthResponse = async (req, res) => {
  const oAuth2Client = initoAuth2Client()

  const err = req.query.error
  if (err) {
    console.log("Error: " + err)

    if (err === "access_denied") {
      res.status(401).send("Access not granted")
    } else {
      res.status(500).send("A server error occurred.")
    }
  }

  const code = req.query.code
  console.log("🚀 ~ file: Login.js:56 ~ processOauthResponse ~ code", code)

  try {
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)

    console.log(
      "🚀 ~ file: Login.js:60 ~ processOauthResponse ~ tokens",
      tokens
    )
  } catch (err) {
    res.status(401).send("please authorize again")
    return
  }

  try {
    const email_addr = await getUserEmail(oAuth2Client)

    console.log("user email: " + email_addr)
    const result = email_addr
    console.log(result)

    console.log("[LOG] old user login")
    // req.session.loggedin = true
    // req.session.username = email_addr
    res.redirect("http://localhost:5173/home")

    // res.json(email_addr)
  } catch (err) {
    console.log(err)
    res.status(500).send("A server error occurred")
    return
  }
}

export { oauthInitialization, processOauthResponse }
