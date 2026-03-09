"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { ChangeEvent, useState } from "react"

import LoadingSpinner from "@/components/loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {



  const [loading, setLoading] = useState<boolean>(false)
  const [alertShow, setAlertShow] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>("")
  const [alertDescription, setAlertDescription] = useState<string>("")
  type logindatatype = {

    email: String
    password: String

  }

  const [formdata, setformdata] = useState<logindatatype>({

    email: "",
    password: ""

  });


  const handle_input_changed = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setformdata(prevData => ({

      ...prevData,
      [name]: value

    }));

  }

  
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setAlertTitle("Login Failed")
        setAlertDescription(data.message || "Invalid credentials")
        setAlertShow(true)
        return
      }

      setAlertTitle("Login Successful");

      try {
        document.cookie = `token_value=${data.token}; path=/; max-age=86400`
        setAlertDescription("Redirecting to dashboard...")
      } catch (e) {
        setAlertDescription("failed to set cookies");
        setAlertShow(true)
        return;
      }

      setAlertShow(true)

    } catch (error) {
      setAlertTitle("Error")
      setAlertDescription("Something went wrong")
      setAlertShow(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn(" relative flex flex-col gap-6", className)} {...props}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}

      {alertShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>
              {alertDescription}
              <Button
                className="mt-4"
                onClick={() => setAlertShow(false)}
              >
                Close
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>

                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handle_input_changed}
                  name="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" onChange={handle_input_changed} required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
