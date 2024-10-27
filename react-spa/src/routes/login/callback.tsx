import { createFileRoute, useRouter } from "@tanstack/react-router"
import { FC, useLayoutEffect, useState } from "react"
import { isLoginError } from "../../libs/hydra/login"
import { useOidc } from "../../hooks/hydra/oidc-client"


const Page: FC = () => {

  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const oidc = useOidc()


  useLayoutEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(router.latestLocation.search)

      const isError = isLoginError(searchParams)
      if (isError.isError) {
        setErrorMsg(isError.error.error)
      }

      const metadata = await oidc.userManager.metadataService.getMetadata()
      console.log({ metadata })

      const res = await oidc.userManager.signinCallback()
      console.log({ res })
    })()


  }, [oidc.userManager, router.latestLocation.search])

  return (
    <>
      <div>/auth/callback!</div>
      {errorMsg && (
        <span>There is Error: {errorMsg}</span>
      )}
    </>
  )
}

export const Route = createFileRoute("/login/callback")({
  component: Page
})
