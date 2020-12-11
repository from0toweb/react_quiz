import { ADD_QUESTION, RESET_QUIZ } from '../actions/actionTypes';

const initialState = {
    quiz: [],
};

export function createReucer(state = initialState, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            };
        case RESET_QUIZ:
            return {
                ...state,
                quiz: [],
            };
        default:
            return state;
    }
}
