import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function HeaderAuth() {
  return (
    <div className="flex items-center">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
