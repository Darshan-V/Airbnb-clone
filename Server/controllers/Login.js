import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
]

function initoAuth2Client() {
  const oAuth2Client = new google.auth.OAuth2(
    "806693077442-60vid5pbpaqhbq94stcfbur3evhln4al.apps.googleusercontent.com",
    "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",
    "http://localhost:8000/auth/google/callback"
  )
  return oAuth2Client
}
initoAuth2Client()

async function getUserEmail(auth) {
  const service = google.people({ version: 1, auth })
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
    scope: SCOPES,
    redirect_uri: "http://localhost:8000/auth/google/callback"
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
  console.log(code)

  try {
    const { tokens } = await oAuth2Client.getToken(code)
    console.log(tokens)
    oAuth2Client.setCredentials(tokens)
  } catch (err) {
    res.status(401).send("please authorize again")
    return
  }

  try {
    const email_addr = await getUserEmail(oAuth2Client)

    console.log("user email: " + email_addr)

    // make a user profile if a new user visit
    const result = await userModel.findOne({ username: email_addr })

    console.log(result)

    if (result) {
      console.log("[LOG] old user login")
      req.session.loggedin = true
      req.session.username = email_addr
      res.redirect("/")
    } else {
      console.log("[LOG] NEW user login")
      req.session.loggedin = true
      req.session.username = email_addr
      res.redirect("/user/account")
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("A server error occurred")
    return
  }
}

export { oauthInitialization, processOauthResponse }
