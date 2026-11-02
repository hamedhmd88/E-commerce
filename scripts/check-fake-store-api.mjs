const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";
const endpoints = [
  "/products",
  "/products/1",
  "/products/categories",
  "/products/category/electronics",
];
let failed = false;

for (const endpoint of endpoints) {
  const url = new URL(endpoint, baseUrl);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    const contentType = response.headers.get("content-type") || "unknown";
    const challenge = response.headers.get("cf-mitigated") === "challenge";
    console.log(
      `${response.status} ${url} (${contentType}${challenge ? ", Cloudflare challenge" : ""})`,
    );
    if (!response.ok || !contentType.includes("json")) failed = true;
    if (response.ok && contentType.includes("json")) {
      const data = await response.json();
      console.log(
        `  JSON: ${Array.isArray(data) ? `${data.length} items` : "object"}`,
      );
    }
  } catch (error) {
    failed = true;
    console.error(
      `${url}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (failed) process.exitCode = 1;
