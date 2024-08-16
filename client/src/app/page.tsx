import { loginUrl } from "@/config/urls";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a
        href={`https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/login?client_id=65u34livlolumvk8adv9bjs2fl&response_type=code&scope=email+openid&redirect_uri=${encodeURI(
          loginUrl
        )}`}
      >
        Login
      </a>
    </main>
  );
}
