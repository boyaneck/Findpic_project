const checkImageExists = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.status; // 이미지가 존재하면 200, 아니면 400
  } catch (error) {
    console.error('Error checking image existence:', error);
    return false; // 에러가 발생하면 이미지가 없다고 가정
  }
};

// DB에서 받아온 데이터 배열을 인자로 전달하여
// 불량 데이터를 제외한 데이터를 return 하는 함수
export const isExist = async (fbData: any) => {
  const proceed = await Promise.all(
    fbData.map(async (item: any) => {
      const result = await checkImageExists(item.imgPath);
      if (result === 200) return item;
      else return null;
    })
  );

  return proceed.filter((el) => el !== null);
};
