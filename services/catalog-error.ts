import axios from "axios";

export class CatalogRequestError extends Error {
  readonly status: number | undefined;
  readonly challenged: boolean;

  constructor(status: number | undefined, challenged: boolean) {
    super(
      challenged
        ? "Fake Store API requires a browser challenge for this server request."
        : status
          ? `Fake Store API returned HTTP ${status}.`
          : "Fake Store API could not be reached.",
    );
    this.name = "CatalogRequestError";
    this.status = status;
    this.challenged = challenged;
  }
}

export function normalizeCatalogError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    throw new CatalogRequestError(
      error.response?.status,
      error.response?.headers?.["cf-mitigated"] === "challenge",
    );
  }
  throw error;
}
