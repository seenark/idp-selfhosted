import { useMemo } from "react";
import { oidcClient } from "../../libs/oidc/oidc-client";

export function useOidc() {
  const userManager = useMemo(() => {
    return oidcClient
  }, [])

  return {
    userManager
  }
}

