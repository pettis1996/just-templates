import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Reset Your Password
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your registered email to receive reset instructions.
        </p>

        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}