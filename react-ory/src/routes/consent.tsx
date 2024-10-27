import { createFileRoute } from '@tanstack/react-router'
import { FC } from 'react'



const Page: FC = () => {

  return (
    <div>
      <h1 className="text-4xl">
        Consent
      </h1>
    </div>
  )
}

export const Route = createFileRoute('/consent')({
  component: Page
})
