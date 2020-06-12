import createDataContext from "./createDataContext";

const seqReducer = (state, action) => {
   switch (action.type) {
      case 'set_current_seq':
         return { ...state, currentSeq: action.payload };
      case 'set_current_task':
         return { ...state, currentTask: action.payload };
      case 'set_current_tasks':
         return { ...state, currentTasks: action.payload };
      default:
         return state;
   }
};

const setCurrentSeq = dispatch => () => {
   dispatch({ type: 'set_current_seq' });
};

const setCurrentTasks = dispatch => (tasks) => {
   dispatch({ type: 'set_current_tasks' });
};

export const { Provider, Context } = createDataContext(
   seqReducer,
   { setCurrentSeq, setCurrentTasks },
   {
      currentSeq: '',
      currentTask: '',
      currentTasks: [],
   }
);
