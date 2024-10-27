
function getLoginChallenge(searchParams: URLSearchParams): string | null {
  return searchParams.get("login_challenge")
}

export function handleLoginChallenge(searchParams: URLSearchParams) {
  const loginChallenge = getLoginChallenge(searchParams)
  if (loginChallenge === null) return null
  return {
    redirect_browser_to: `http://127.0.0.1:3002/login?${searchParams.toString()}`
  }
}

function getLoginError(searchParams: URLSearchParams) {
  return searchParams.get("error")
}

function getLoginErrorDescription(searchParams: URLSearchParams) {
  return searchParams.get("error_description")
}

export function isLoginError(searchParams: URLSearchParams): {
  isError: false;
  error: null;
} | {
  isError: true;
  error: {
    error: string;
    errorDescription: string | null;
  };
} {
  const error = getLoginError(searchParams)
  const errorDescription = getLoginErrorDescription(searchParams)

  if (error === null) return {
    isError: false as const,
    error: null
  }

  return {
    isError: true as const,
    error: {
      error,
      errorDescription
    }
  }
}
