import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Sign In
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Don&apos;t have an account?{" "}
          <Link className="text-indigo-600 font-medium hover:underline" href="/sign-up">
            Sign up
          </Link>
        </p>

        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="block font-medium text-gray-700 mb-2">
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
            <Label htmlFor="password" className="block font-medium text-gray-700 mb-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <div className="text-right mt-2">
              <Link
                className="text-sm text-indigo-600 hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign In
          </SubmitButton>

          <FormMessage message={searchParams} />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-indigo-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
