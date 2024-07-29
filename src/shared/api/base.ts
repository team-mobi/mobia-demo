import { BadRequest, NetworkError } from "~shared/core/error/server-error";

export class baseClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new BadRequest();
        case 500:
          throw new NetworkError();
      }
    }
    return await response.json();
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
    option?: RequestInit
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...option,
    });

    return this.handleResponse<TResult>(response);
  }
}
