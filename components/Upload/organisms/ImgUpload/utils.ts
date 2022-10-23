export const imageList = (imgList: string[]) =>
  imgList.map((img, idx) => {
    return {
      id: idx + 1,
      src: img,
    };
  });
