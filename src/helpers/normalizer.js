import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const wscale = SCREEN_WIDTH / 375;
const hscale = SCREEN_HEIGHT / 667;

const normalize = (size, landscape = false) => {
    const newSize = landscape ? size * hscale : size * wscale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export default normalize;
export { SCREEN_WIDTH, SCREEN_HEIGHT };
