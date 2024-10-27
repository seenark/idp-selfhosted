import { type FC } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useOidc } from '../../hooks/hydra/oidc-client'

const Page: FC = () => {
  const { userManager } = useOidc()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
          onClick={() => {
            userManager.signinRedirect()
          }}
        >
          Hydra Login
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/login/')({
  component: Page
})
