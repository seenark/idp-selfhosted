/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as LoginLoginChallengeImport } from './routes/login/login-challenge'
import { Route as LoginCallbackImport } from './routes/login/callback'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const LoginLoginChallengeRoute = LoginLoginChallengeImport.update({
  path: '/login/login-challenge',
  getParentRoute: () => rootRoute,
} as any)

const LoginCallbackRoute = LoginCallbackImport.update({
  path: '/login/callback',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/login/callback': {
      id: '/login/callback'
      path: '/login/callback'
      fullPath: '/login/callback'
      preLoaderRoute: typeof LoginCallbackImport
      parentRoute: typeof rootRoute
    }
    '/login/login-challenge': {
      id: '/login/login-challenge'
      path: '/login/login-challenge'
      fullPath: '/login/login-challenge'
      preLoaderRoute: typeof LoginLoginChallengeImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login/login-challenge': typeof LoginLoginChallengeRoute
  '/login': typeof LoginIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login/login-challenge': typeof LoginLoginChallengeRoute
  '/login': typeof LoginIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login/login-challenge': typeof LoginLoginChallengeRoute
  '/login/': typeof LoginIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/login/callback'
    | '/login/login-challenge'
    | '/login'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/login/callback' | '/login/login-challenge' | '/login'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/login/callback'
    | '/login/login-challenge'
    | '/login/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  LoginCallbackRoute: typeof LoginCallbackRoute
  LoginLoginChallengeRoute: typeof LoginLoginChallengeRoute
  LoginIndexRoute: typeof LoginIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  LoginCallbackRoute: LoginCallbackRoute,
  LoginLoginChallengeRoute: LoginLoginChallengeRoute,
  LoginIndexRoute: LoginIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/login/callback",
        "/login/login-challenge",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login/callback": {
      "filePath": "login/callback.tsx"
    },
    "/login/login-challenge": {
      "filePath": "login/login-challenge.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */