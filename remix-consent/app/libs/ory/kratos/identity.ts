import { IdentityApi } from "@ory/client";

export const getIdentity = (kratosPublic: IdentityApi) => (userId: string) => kratosPublic.getIdentity({
  id: userId
}).then(data => data.data)
