import { useRouter } from "next/router";
import React from "react";

import { HttpClient } from "../src/infra/http-client/http-client";
import { tokenService } from "../src/services/auth/token-service";

export default function LogoutPage() {
  const router = useRouter();

  React.useEffect(async () => {
    try {
      await HttpClient("/api/refresh", {
        method: "DELETE",
      });
      tokenService.delete();
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  }, []);

  return <div>Você será redirecionado em instantes...</div>;
}
