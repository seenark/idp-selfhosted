import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";


export function useOryHydraLogin() {

  const router = useRouter()

  const handleCallback = useCallback(() => {
    const searchParams = new URLSearchParams(router.latestLocation.search)

    console.log({ router: router.latestLocation })
    console.log({ q: searchParams.toString() })
    if (window) {
      window.location.href = `http://127.0.0.1:3000/login?${searchParams.toString()}`
    }


  }, [router])

  return {
    handleCallback
  }
}
