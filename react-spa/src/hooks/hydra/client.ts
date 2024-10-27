import { useMemo } from "react"
import { hydraPublicClientFp } from "../../libs/hydra/client"

export function useOryHydraClient() {

  const publicClient = useMemo(() => {
    return hydraPublicClientFp
  }, [])

  return {
    publicClient
  }
}
