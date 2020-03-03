import createDataContext from "./createDataContext";
import { AsyncStorage } from 'react-native';

const SequenceReducer = (state, action) => {
   switch (action.type) {
      case 'get_sequences':
         return action.payload;
      case 'add_sequence':
         return action.payload;
      default:
         return state;
   }
};

const getSequences = dispatch => {
   return async () => {
      dispatch({ type: 'get_sequences', payload: res.data })
   };
};

const addSequence = dispatch => {
   return async (title, content, callback) => {
   };
};

export const { Context, Provider } = createDataContext(
   SequenceReducer,
   { addSequence, getSequences },
   []
);