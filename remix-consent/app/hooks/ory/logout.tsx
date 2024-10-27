import type { LogoutFlow } from "@ory/client"
import { useCallback, useMemo, useState } from "react"
import { useOryClient } from "./client"

export function useLogout() {
  const { frontendApi } = useOryClient()

  const [logoutFlow, setLogoutFlow] = useState<LogoutFlow | null>(null)

  const logoutToken = useMemo(() => {
    if (logoutFlow === null)
      return null
    return logoutFlow.logout_token
  }, [logoutFlow])

  const startFlow = useCallback(async () => {
    const res = await frontendApi.createBrowserLogoutFlow().then(res => res())
    setLogoutFlow(res.data)
  }, [frontendApi])

  const updateLogoutFlow = useCallback(async () => {
    if (!logoutToken)
      return null
    await frontendApi.updateLogoutFlow(logoutToken).then(res => res())
    return "Ok" as const
  }, [frontendApi, logoutToken])

  return {
    startFlow,
    updateLogoutFlow,
  }
}
