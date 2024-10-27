import { Configuration, FrontendApi, FrontendApiFp, IdentityApi, IdentityApiFp } from "@ory/client";

export const config = () => new Configuration({
  basePath: "http://127.0.0.1:4433",
  baseOptions: {
    withCredentials: true,
  },
})

export const newFrontendApi = () => new FrontendApi(config())
export const newFrontendApiFp = () => FrontendApiFp(config())
export const identityApi = () => new IdentityApi(config())
export const identityApiFp = () => IdentityApiFp(config())
