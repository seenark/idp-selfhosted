import { useCallback } from "react";
import { useOryClient } from "./client";


export function useSession() {

  const { frontendApi } = useOryClient()

  const getSession = useCallback(async () => {
    try {
      const session = await frontendApi.toSession().then(res => res())
      return session.data
    } catch (_: unknown) {
      return null
    }
  }, [frontendApi])


  return {
    getSession
  }
}
