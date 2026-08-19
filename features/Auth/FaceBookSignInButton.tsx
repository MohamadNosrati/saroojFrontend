import { Login } from "react-facebook";

export default function FaceBookSignInButton() {
  return (
    <Login
      onError={(error) => console.error("Login failed:", error)}
      onSuccess={(response) => console.log("Login success:", response)}
    >
      Login with Facebook
    </Login>
  );
}
