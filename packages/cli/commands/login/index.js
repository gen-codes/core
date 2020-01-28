import React, {useState, useEffect} from "react"
import {Auth0LoginProcessor} from "../../utils/auth0"
import path from "path"
import useConfig from "../../utils/useConfig"
import fs from "fs-extra"
export default function Login (){
  const [token, setToken] = useState()
  const configFile = useConfig()
  const config = fs.readJSONSync(configFile)
  useEffect(() => {
    async function login(){
      const auth = new Auth0LoginProcessor({
        auth0ClientId: '67nRhCCxr0PSZBYFy3wM8fZpjeBZulvB',
        auth0Domain: 'gen-codes.eu.auth0.com',
        auth0TokenAudience: "",
        auth0TokenScope: 'openid profile email',
        port: 42224,
        timeout: 600000,
        successfulLoginHtmlFile: `<html>successfull<script>window.close()</script></html>`,
        failedLoginHtmlFile: `<html>failed to login with github</html>`
      })
      const authtoken = await auth.runLoginProcess()
      setToken(authtoken.token)
      fs.writeJSONSync(configFile, {
        ...config,
        token: authtoken.token
      })
    }
    
    login()
    return () => {
      
    };
  }, [])

  return token? "Success!": "Please login through the browser!"
}