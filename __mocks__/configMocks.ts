import { bodyShapes, bottomSizes, condition, topSizes } from '@mocks/basic';
import { colorsData } from '@mocks/colors';
import { fitsData, lengthsData, stylesData } from '@mocks/style';

const styles = { status: 200, data: stylesData };
const bodyShape = { status: 200, data: bodyShapes };
const pollution = { status: 200, data: condition };
const colors = { status: 200, data: { top: colorsData, bottom: colorsData } };
const sizes = { status: 200, data: { top: topSizes, bottom: bottomSizes } };
const lengths = { status: 200, data: lengthsData };
const fits = { status: 200, data: fitsData };

export {
  styles,
  bodyShape as bodyShapes,
  pollution,
  colors,
  sizes,
  lengths,
  fits,
};
