
import { UserManager } from "oidc-client-ts"


export const oidcClient = new UserManager({
  authority: "http://127.0.0.1:4444",
  // client_id: "a50fc9c5-cda4-4cdd-b7ae-34da88c202e1",
  client_id: "18877daf-ec39-4457-ad39-d09cf3ed3b33",
  // client_secret: ".SQ~2H5KxQ4A8N6CXLr4RzyUhu",
  client_authentication: undefined,
  // redirect_uri: "http://127.0.0.1:3001/login/login-challenge",
  redirect_uri: "http://127.0.0.1:3001/login/callback",
  response_type: "code",
  scope: "offline openid",
  automaticSilentRenew: true,
  loadUserInfo: true,
})


