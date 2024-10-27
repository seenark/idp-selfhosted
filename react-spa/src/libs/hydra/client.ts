import { Configuration, OAuth2Api, OAuth2ApiFp } from "@ory/hydra-client";

export const config = new Configuration({
  basePath: "http://localhost:4444"
})

export const hydraPublicClientFp = OAuth2ApiFp(config)
export const hydraPublicClient = new OAuth2Api(config)
