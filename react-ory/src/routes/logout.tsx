import { useEffect, type FC } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useLogout } from "../hooks/ory/logout"
import { useSession } from "../hooks/ory/session"

const Page: FC = () => {


  const nav = useNavigate()
  const { startFlow, updateLogoutFlow } = useLogout()
  const { getSession } = useSession()

  useEffect(() => {
    (async () => {
      try {
        const session = await getSession()
        console.log({ session: session })
        alert("your are logged in")
        nav({
          to: "/"
        })
      } catch (_: unknown) {
        startFlow()
      }
    })()
  }, [getSession, nav, startFlow])

  return (
    <div>
      <h1 className="text-8xl">Logout</h1>
      <button type="button" className="px-4 py-2 bg-red-200" onClick={() => {
        updateLogoutFlow()
        nav({
          to: "/login"
        })
      }}>Logout</button>
    </div>
  )
}

export const Route = createFileRoute("/logout")({
  component: Page,
})
