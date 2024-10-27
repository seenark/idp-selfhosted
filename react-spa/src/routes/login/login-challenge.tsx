import { createFileRoute, useRouter } from '@tanstack/react-router'
import { FC, useLayoutEffect } from 'react'
import { handleLoginChallenge } from '../../libs/hydra/login'

const Page: FC = () => {

  const router = useRouter()

  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(router.latestLocation.search)
    const res = handleLoginChallenge(searchParams)
    console.log({ res })
    if (res === null) return
    if (typeof window !== 'undefined') {
      window.location.href = res.redirect_browser_to
    }
  }, [router.latestLocation.search])

  return (
    <div>Login Challenge</div>
  )
}


export const Route = createFileRoute('/login/login-challenge')({
  component: Page
})
