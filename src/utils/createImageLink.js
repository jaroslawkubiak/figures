function createImageLink(figure) {
  return {
    defaultUrl: `https://jaroslawkubiak.pl/portfolio/figures/static/media/bricklink.png`,
    url: `https://jaroslawkubiak.pl/portfolio/figures/static/media/${figure.number}.png`,
    description: figure.mainName,
  };
}
export default createImageLink;