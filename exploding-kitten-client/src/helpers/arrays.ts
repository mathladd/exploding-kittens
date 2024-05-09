export function shuffle(array: unknown[]) {
  const cp = [...array];
  let currentIndex = cp.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [cp[currentIndex], cp[randomIndex]] = [cp[randomIndex], cp[currentIndex]];
  }
  return cp;
}
