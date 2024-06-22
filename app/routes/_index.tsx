import { experimental_useObject as useObject } from '@ai-sdk/react'
import type { MetaFunction } from '@remix-run/cloudflare'
import ReactMarkdown from 'react-markdown'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  Textarea,
} from '~/components/ui'
import { schema } from '~/schema'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix CF Streaming Chat' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!',
    },
  ]
}

export default function Index() {
  const { setInput, object } = useObject({ api: '/resources/api', schema })

  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] gap-4 p-4">
      <h1 className="text-3xl">generate Artifacts using gpt-4o</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const message = String(formData.get('message'))
          setInput(message)
        }}
      >
        <HStack>
          <Textarea name="message" className="flex-1" />
          <Button name="intent" value="generate" type="submit">
            Generate
          </Button>
        </HStack>
      </form>

      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4 overflow-auto">
        {object?.shortReply && <div>{object?.shortReply}</div>}

        <div className="grid grid-cols-3 gap-4">
          {object?.artifacts?.map((object) => {
            return (
              <Card key={object?.title} className="">
                <CardHeader>
                  <CardTitle>{object?.title}</CardTitle>
                  <CardDescription>{object?.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown>{object?.contnet}</ReactMarkdown>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {object?.callToAction && (
          <Card>
            <CardHeader>
              <CardDescription>{object?.callToAction?.message}</CardDescription>
            </CardHeader>
            <CardContent>
              <HStack>
                {object?.callToAction?.candidates?.map((object) => {
                  return (
                    <Button size="sm" key={object?.buttonText}>
                      {object?.buttonText}
                    </Button>
                  )
                })}
              </HStack>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
