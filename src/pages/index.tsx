import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <button>Login with Google</button>
    </div>
  );
};

export default Login;