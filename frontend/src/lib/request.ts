export type TRequestBody = Record<string, unknown> | null | undefined;

export type RequestOpts = Omit<RequestInit, "body"> & {
  url: string;
  body?: TRequestBody;
};

const TIMEOUT_MS = 10_000;

export const request = async <TData>({
  url,
  body,
  ...options
}: RequestOpts): Promise<TData> => {
  try {
    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: prepareBody(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new Error("Request timeout");
    } else if (error instanceof SyntaxError) {
      throw new Error("Response parsing error");
    } else if (error instanceof Error) {
      throw error;
    }

    throw new Error("Network error");
  }
};

const prepareBody = (body: TRequestBody) => {
  if (typeof body === "object" && body !== null) {
    return JSON.stringify(body);
  }

  return body as unknown as string;
};
