
import { FacebookProvider, Login } from 'react-facebook';


export default function FaceBookSignInButton() {
  return (

      <Login
        onSuccess={(response) => console.log("Login success:", response)}
        onError={(error) => console.error("Login failed:", error)}
      >
        Login with Facebook
      </Login>
  );
}
