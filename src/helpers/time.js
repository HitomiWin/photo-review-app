export const firebaseTimestampToString = time => {
  if (!time) return null

  const dateTs = new Date(time.toMillis())
  return `${dateTs?.toLocaleDateString()}/${dateTs?.toLocaleTimeString()}`
}