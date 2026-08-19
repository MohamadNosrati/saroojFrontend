import { FacebookProvider } from "react-facebook";
import { ReactNode } from "react";

export default function FaceBookProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <FacebookProvider appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}>
      {children}
    </FacebookProvider>
  );
}
