import React from "react";
import { useRouter } from "next/router";

import { authService } from "../src/services/auth/auth-service";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    user: "omariosouto",
    password: "safepassword",
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          // onSubmit -> Controller (pega dados do usuário e passa pra um serviço)
          // authService -> Serviço
          event.preventDefault();
          authService
            .login({
              username: values.user,
              password: values.password,
            })
            .then(() => {
              // router.push('/auth-page-static');
              router.push("/auth-page-ssr");
            })
            .catch((err) => {
              console.log(err);
              alert("Usuário ou a senha estão inválidos");
            });
        }}
      >
        <input
          placeholder="Usuário"
          name="user"
          value={values.user}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {/* <pre>
          {JSON.stringify(values, null, 2)}
        </pre> */}
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
