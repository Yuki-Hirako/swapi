import Token from "../../services/Token";
import { cookies } from "next/headers";
import Provider from "../../components/Provider";

export default function Layout({ children }) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <>No Token</>;
  }

  return (
    <Provider>
      <div className="w-full my-20 items-center max-w-6xl lg:pl-64">
        <Token newtoken={token}>{children}</Token>
      </div>
    </Provider>
  );
}
