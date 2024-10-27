import { useMemo } from "react"
import { newFrontendApi } from "../../libs/ory/client"

export function useOryClient() {

  const frontendApi = useMemo(() => newFrontendApi(), [])

  // const identityApi = useMemo(() => {
  //   return IdentityApiFp(new Configuration({
  //     basePath: "http://127.0.0.1:4433",
  //     baseOptions: {
  //       withCredentials: true,
  //     },
  //   }))
  // }, [])

  return {
    frontendApi,
    // identityApi
  }
}
