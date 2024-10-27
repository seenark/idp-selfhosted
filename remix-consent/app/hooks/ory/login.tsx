import { useOryClient } from "./client"
import { useMemo } from "react"
import * as Login from "../../libs/ory/login"


export function useLogin() {
  const { frontendApi: f } = useOryClient()

  const startFlow = useMemo(() => {
    return Login.startFlow(f)
  }, [f])

  return {
    startFlow
  }

}
