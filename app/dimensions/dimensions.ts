import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const centerVertical = (boxSize: number) => (windowHeight / 4) - boxSize / 2 
export const centerHorizontal = (boxSize: number) => (windowWidth / 2) - (boxSize / 2) 