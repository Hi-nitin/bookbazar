
export default function getCookie(name: string) {

  if (typeof document === "undefined") return null

  const cookies = document.cookie.split(";")

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=")

    if (key === name) {
      return value
    }
  }

  return null
}