export const getImageType = (mimetype: string) => {
  let slashIndex = mimetype.indexOf('/');

  return mimetype.slice(++slashIndex);
}
