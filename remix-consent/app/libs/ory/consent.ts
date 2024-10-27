import { Identity, OAuth2Api, OAuth2Client, OAuth2ConsentRequest, OAuth2ConsentSession } from "@ory/client";


export const getConsentChallenge = (searchParams: URLSearchParams) => searchParams.get("consent_challenge")
export const getUserId = (consentRequest: OAuth2ConsentRequest) => consentRequest.subject

export const getConsent = (hydraAdmin: OAuth2Api) => async (consentChallenge: string) => {
  const { data: consentRequest } = await hydraAdmin.getOAuth2ConsentRequest({
    consentChallenge: consentChallenge
  })
  return consentRequest
}

export const getConsentDataToDisplay = (client: OAuth2Client) => {
  const { client_name, client_uri, logo_uri, owner, scope, policy_uri, tos_uri } = client
  return {
    client_name,
    client_uri,
    logo_uri,
    owner,
    scope,
    policy_uri,
    tos_uri,
  }
}

export const getExistingConsent = (hydraAdmin: OAuth2Api) => (userId: string) => {
  return hydraAdmin.listOAuth2ConsentSessions({
    subject: userId
  }).then(res => res.data)
}

// TODO: split this fn into many fns do it own jobs
export const needToConsent = ({ consentRequest, oauth2ConsentSessions }: {
  consentRequest: OAuth2ConsentRequest,
  oauth2ConsentSessions: OAuth2ConsentSession[]
}) => {

  const clientId = consentRequest.client?.client_id
  if (clientId === undefined) return true

  const consentSessionForClientId = oauth2ConsentSessions.find(s => s.consent_request?.client?.client_id)
  if (consentSessionForClientId === undefined) return true

  if (consentRequest.requested_scope === undefined) return true
  return consentRequest.requested_scope.every((scope) => consentSessionForClientId.grant_scope?.includes(scope)) === false
}

export const acceptConsent = (hydraAdmin: OAuth2Api) => async ({ consentChallenge, consentRequest, userData }: {
  consentChallenge: string,
  consentRequest: OAuth2ConsentRequest,
  userData: Identity
}) => {
  return hydraAdmin.acceptOAuth2ConsentRequest({
    consentChallenge: consentChallenge,
    acceptOAuth2ConsentRequest: {
      grant_scope: consentRequest.requested_scope,
      grant_access_token_audience: consentRequest.requested_access_token_audience,
      session: {
        id_token: userData.traits
      },
      remember: false,
    }
  }).then(data => data.data)
}

export const rejectConsent = (hydraAdmin: OAuth2Api) => async (consentChallenge: string) => {
  return hydraAdmin.rejectOAuth2ConsentRequest({
    consentChallenge: consentChallenge
  }).then(data => data.data)
}
