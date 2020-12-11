import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: true,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false,
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz,
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            };
        case QUIZ_FINISHED:
            return {
                ...state,
                isFinished: true,
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null,
            };
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
            };
        default:
            return state;
    }
}
