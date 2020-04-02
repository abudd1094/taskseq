import { Dimensions } from 'react-native';

export const container = {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
};

export const defaultMargin = {
   marginTop: "1rem",
   marginRight: "1rem",
   marginBottom: "1rem",
   marginLeft: "1rem"
};

export const defaultMarginBottom = {
   marginBottom: "1rem"
};

export const defaultMarginTop = {
   marginTop: "1rem"
};

export const flexBottom = {
   alignSelf: "flex-end"
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
