
import { Configuration, OAuth2Api } from "@ory/client"

const config = new Configuration({
  basePath: "http://127.0.0.1:4445"
})

// TODO: change to oauth admin client
export const getHydraAdminOAuth = () => new OAuth2Api(config)
