import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { FC } from "react";
import * as Consent from "~/libs/ory/consent";
import * as Identity from "~/libs/ory/kratos/identity"
import { getHydraAdminOAuth } from "~/libs/ory/hydra/client";
import { identityApi } from "~/libs/ory/kratos/client";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const hydraAdmin = getHydraAdminOAuth()
  const url = new URL(request.url)
  const consentChallenge = Consent.getConsentChallenge(url.searchParams)
  if (consentChallenge === null) throw new Response("Consent challenge not found", { status: 400, statusText: "Consent challenge not found" })

  const consentRequest = await Consent.getConsent(hydraAdmin)(consentChallenge)

  if (consentRequest.client === undefined) throw new Response("Client not found", { status: 400, statusText: "Client not found" })

  const userId = Consent.getUserId(consentRequest)
  if (!userId) throw new Response("Subject not found", { status: 400, statusText: "Subject not found" })
  const kratosIdentity = identityApi()
  const userData = await Identity.getIdentity(kratosIdentity)(userId)
  const consentSessions = await Consent.getExistingConsent(hydraAdmin)(userId)

  const needToConsent = Consent.needToConsent({ consentRequest, oauth2ConsentSessions: consentSessions })
  if (needToConsent === false) {
    const res = await Consent.acceptConsent(hydraAdmin)({ consentChallenge, consentRequest, userData })
    console.log({ acceptConsent: res })
    return redirect(res.redirect_to)
  }

  return json({
    client: consentRequest.client,
    consentRequest,
    consentChallenge,
    userId
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get("action") as "accept" | "reject" | null
  const consentChallenge = formData.get("consent_challenge") as string
  console.log({ consentChallenge, action })
  if (!consentChallenge) return null
  console.log("here")

  const hydraAdmin = getHydraAdminOAuth()
  if (action === "reject") {
    console.log("here2")
    const res = await Consent.rejectConsent(hydraAdmin)(consentChallenge)
    console.log({ res })
    return redirect(res.redirect_to)
  }

  if (action === "accept") {
    const consentRequest = await Consent.getConsent(hydraAdmin)(consentChallenge)
    const userId = Consent.getUserId(consentRequest)
    if (userId === undefined) {
      return null
    }
    console.log({ userId })
    const kratosIdentity = identityApi()
    const userData = await Identity.getIdentity(kratosIdentity)(userId)

    const res = await Consent.acceptConsent(hydraAdmin)({ consentChallenge, consentRequest, userData })
    console.log({ acceptConsent: res })

    return redirect(res.redirect_to)
  }

  return null
}

const Page: FC = () => {

  const data = useLoaderData<typeof loader>()

  // const acceptConsent = useCallback(async () => {
  //   const hydraAdmin = getHydraAdminOAuth()
  //   const kratosIdentity = identityApi()
  //   const userId = Consent.getUserId(data.consentRequest)
  //   if (userId === undefined) {
  //     console.log("user id is not exists in consent request")
  //     return
  //   }
  //   const userData = await getIdentity(kratosIdentity)(userId)
  //   const acceptedResponse = await Consent.acceptConsent(hydraAdmin)({
  //     consentRequest: data.consentRequest,
  //     consentChallenge: data.consentChallenge,
  //     userData: userData
  //   })
  //   return acceptedResponse
  // }, [data.consentChallenge, data.consentRequest])

  if (!data) return <div>Not found client data</div>

  const dataToDisplay = Consent.getConsentDataToDisplay(data.client)

  // if (typeof window !== "undefined") {
  // window.location.href = redirect_to
  // }

  return (
    <div className="max-w-[1270px] mx-auto flex flex-col gap-4">
      <h1 className="text-7xl">Consent</h1>
      <div className="flex flex-col justify-center items-start bg-green-50">
        <h2 className="text-xl">Data to display</h2>
        {Object.entries(dataToDisplay).map(([key, value]) => (
          <div key={key} className="flex flex-row gap-4">
            <span>{key}</span>
            <span>{JSON.stringify(value)}</span>
          </div>
        ))}

        <Form method="POST">
          <input name="action" type="hidden" value="accept" />
          <input name="consent_challenge" type="hidden" value={data.consentChallenge} />
          <input name="user_id" type="hidden" value={data.userId} />
          <button className="px-4 py-2 border-green-500 border-2 rounded-full bg-green-300">Allow</button>
        </Form>

        <Form method="POST" >
          <input name="action" type="hidden" value="reject" />
          <input name="consent_challenge" type="hidden" value={data.consentChallenge} />
          <button type="submit" className="px-4 py-2 border-red-500 border-2 rounded-full bg-red-300">Deny</button>
        </Form>

      </div>
      <div className="flex flex-col justify-center items-start bg-slate-100">
        <h2 className="text-xl">All Client data</h2>
        {Object.entries(data.client).map(([key, value]) => (
          <div key={key} className="flex flex-row gap-4">
            <span>Key: {key}</span>
            <span>Value: {JSON.stringify(value)}</span>
          </div>
        ))}
      </div>
    </div>
  )


}

export default Page
