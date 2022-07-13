const genders = ['여성', '남성'];
const bodyForms = ['마름', '보통', '통통', '뚱뚱'];
const topSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const bottomSizes = [...Array.from({ length: 16 }, (_, i) => `${22 + i}`)];

export { genders, bodyForms, topSizes, bottomSizes };
