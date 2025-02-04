import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              minLength={6}
              required
            />
          </div>

          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-indigo-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}