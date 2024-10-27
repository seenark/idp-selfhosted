import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {" "}
        <Link
          to="/register"
          activeProps={{
            className: "font-bold",
          }}
        >
          Register
        </Link>
        {" "}
        <Link
          to="/login"
          activeProps={{
            className: "font-bold",
          }}
        >
          Login
        </Link>
        {" "}
        <Link
          to="/logout"
          activeProps={{
            className: "font-bold",
          }}
        >
          Logout
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
