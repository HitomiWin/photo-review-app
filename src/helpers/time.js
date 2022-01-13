export const firebaseTimestampToString = time => {
  if (!time) return null

  const dateTs = new Date(time.toMillis()) // because serverTimestamp not return nillis
  return `${dateTs?.toLocaleDateString()}/${dateTs?.toLocaleTimeString()}`
}