export async function generateHash(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export const generateValidationValue = (key: string, payload: object) => {
  const stringify = JSON.stringify(payload)
  const jointValue = stringify.length + stringify.slice(-1) + stringify + key
  return generateHash(jointValue)
}
