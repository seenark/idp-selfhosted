import { useCallback, useMemo, useState } from "react";
import { Configuration, FrontendApiFp, RegistrationFlow } from '@ory/client'
import { useOryClient } from "./client";

export type AttributeNames =
  | "csrf_token"
  | "traits.email"
  | "traits.name.last"
  | "traits.name.first";

type Traits = {
  email: string
  name?: {
    first?: string
    last?: string
  }
}

export function useOryRegister() {

  // const frontendApi = FrontendApiFp(new Configuration({
  //   basePath: "http://127.0.0.1:4433",
  //   baseOptions: {
  //     withCredentials: true,
  //   }
  // }))

  const { frontendApi } = useOryClient()

  const [flow, setFlow] = useState<RegistrationFlow | null>(null)

  const flowId = useMemo(() => {
    if (flow === null) return null
    const url = new URL(flow.ui.action)
    const flowId = url.searchParams.get("flow")
    return flowId
  }, [flow])

  const csrfToken = useMemo(() => {
    if (flow === null) return null
    const csrfNode = flow.ui.nodes.find(n => {
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
  }, [flow])

  const startFlow = useCallback(async () => {
    const res = await frontendApi.createBrowserRegistrationFlow().then(res => res()).then(res => res.data)
    setFlow(res)
    return res
  }, []);

  const getFlow = useCallback(async () => {
    if (flowId === null) return
    const res = await frontendApi.getRegistrationFlow(flowId).then(res => res()).then(res => res.data)
    return res
  }, [flowId])

  const submitRegisterForm = useCallback(
    async (data: { email: string; firstname?: string; lastname?: string, password: string }) => {
      console.log({ flowId })
      if (flowId === null) return
      if (csrfToken === null) return

      try {
        const res = await frontendApi.updateRegistrationFlow(flowId, {
          password: data.password,
          method: "password",
          csrf_token: csrfToken,
          traits: {
            email: data.email,
            name: {
              first: data.firstname,
              last: data.lastname
            }
          } satisfies Traits
        }).then(res => res()).then(res => res.data)
        return res
      } catch (error: any) {
        if (error.response?.status === 400) {
          const data = error.response.data as RegistrationFlow
          const msg = data.ui.nodes.flatMap(n => n.messages)
          return msg
        }
        console.log("submit regis error", error.response)
      } finally {
        setFlow(null)
      }
    },
    [flowId]
  );

  return {
    startFlow,
    submitRegisterForm,
    getFlow
  };
}
