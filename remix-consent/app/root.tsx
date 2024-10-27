import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>

      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
        >
          Home
        </Link>
        {" "}
        <Link
          to="/register"
        >
          Register
        </Link>
        {" "}
        <Link
          to="/login"
        >
          Login
        </Link>
        {" "}
        <Link
          to="/logout"
        >
          Logout
        </Link>
        {" "}
        <Link
          to="/consent"
        >
          Consent
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
