import { UserProvider } from "@/context/UserContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>{children}</UserProvider>
  );
}
