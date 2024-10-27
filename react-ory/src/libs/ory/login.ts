import type { FrontendApi, LoginFlow } from "@ory/client"
import { AxiosError } from "axios"

export const extractFlowIdFromActionUrl = (actionUrl: string): string | null => {
  const newUrl = new URL(actionUrl)
  const flowId = newUrl.searchParams.get("flow")
  return flowId
}

export const extractActionUrlFromLoginFlow = (loginFlow: LoginFlow) => {
  return loginFlow.ui.action
}

export const extractCsrfToken = (loginFlow: LoginFlow) => {
  const csrfNode = loginFlow.ui.nodes.find((n) => {
    if (n.attributes.node_type === "input" && n.attributes.name === "csrf_token") {
      return true
    }
    return false
  })

  if (!csrfNode) return null
  if (csrfNode.attributes.node_type === "input" && csrfNode.attributes.name === "csrf_token") {
    return csrfNode.attributes.value as string || null
  }

  return null
}

export const extractLoginChallengeFromUrl = (url: string): string | null => {
  const newUrl = new URL(url)
  const searchParams = newUrl.searchParams
  return searchParams.get("login_challenge")
}

export const updateFlowForNormalLogin = (api: FrontendApi) => ({ flowId, csrfToken }: {
  flowId: string;
  csrfToken: string;
}) => async (data: { password: string, email: string }) => {
  const res = await api.updateLoginFlow({
    flow: flowId,
    updateLoginFlowBody: {
      method: "password",
      csrf_token: csrfToken,
      password: data.password,
      identifier: data.email,
    }
  })
  return {
    _tag: "Normal" as const,
    data: res.data
  }
}

export const updateFlowForOAuth = (api: FrontendApi) => ({ flowId, csrfToken }: {
  flowId: string;
  csrfToken: string;
}) => async (data: { password: string, email: string }) => {
  try {
    await api.updateLoginFlow({
      flow: flowId,
      updateLoginFlowBody: {
        method: "password",
        csrf_token: csrfToken,
        password: data.password,
        identifier: data.email,
      }
    })
    /* 
      so return null is ok because
      In OAuth expected status == 422
      expected go in cache due to OAuth will return 422 status which is axios consider to be error
    */
    return null
  } catch (error: unknown) {
    if ((error instanceof AxiosError) === false) throw error
    const data = handleUpdateFlowRedirect(error)
    const redirect_browser_to = data?.redirect_browser_to
    if (!redirect_browser_to) return null
    return {
      _tag: "OAuth" as const,
      redirect_browser_to
    }
  }
}

type UpdateFlowRedirect = {
  error: {
    id: "browser_location_change_required",
    code: 422,
    status: "Unprocessable Entity",
    reason: `In order to complete this flow please redirect the browser to: ${string}`,
    message: "browser location change required"
  },
  redirect_browser_to: string
}

export const handleUpdateFlowRedirect = (error: AxiosError) => {
  if (error.status === 422) {
    const data = error.response?.data as UpdateFlowRedirect | undefined
    if (data?.redirect_browser_to === undefined) return null
    return {
      redirect_browser_to: data.redirect_browser_to,
    }
  }
  throw error
}

export const getFlow = (api: FrontendApi) => (flowId: string) => async () => {
  const res = await api.getLoginFlow({ id: flowId })
  return res.data
}

export const startFlowForOAuth = (api: FrontendApi) => async (loginChallenge: string) => {

  const res = await api.createBrowserLoginFlow({
    loginChallenge: loginChallenge
  })

  const loginFlow = res.data
  const csrfToken = extractCsrfToken(loginFlow)
  const actionUrl = extractActionUrlFromLoginFlow(loginFlow)
  const flowId = extractFlowIdFromActionUrl(actionUrl)
  if (!flowId || !csrfToken) return null

  return {
    _tag: "OAuth" as const,
    updateFlow: updateFlowForOAuth(api)({ flowId, csrfToken }),
    getFlow: getFlow(api)(flowId),
  }
}

export const startFlowForNormalLogin = async (api: FrontendApi) => {
  const res = await api.createBrowserLoginFlow()

  const loginFlow = res.data
  const csrfToken = extractCsrfToken(loginFlow)
  const actionUrl = extractActionUrlFromLoginFlow(loginFlow)
  const flowId = extractFlowIdFromActionUrl(actionUrl)
  if (!flowId || !csrfToken) return null

  return {
    _tag: "Normal" as const,
    updateFlow: updateFlowForNormalLogin(api)({ flowId, csrfToken }),
    getFlow: getFlow(api)(flowId),
  }
}

export const startFlow = (api: FrontendApi) => async (url: string) => {
  const loginChallenge = extractLoginChallengeFromUrl(url)
  if (loginChallenge === null) return startFlowForNormalLogin(api)
  return startFlowForOAuth(api)(loginChallenge)
}
