import Axios from '../../_axios/axios-quiz';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from './actionTypes';

export function fetchSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    };
}
export function fetchError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    };
}

export default function fetchQuizes() {
    return async dispatch => {
        try {
            const response = await Axios.get('/quizes.json');

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                });
            });

            dispatch(fetchSuccess(quizes));
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    };
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        try {
            const response = await Axios.get(`/quizes/${quizId}.json`);

            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz));
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
}
export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
    };
}

export function quizFinished() {
    return {
        type: QUIZ_FINISHED,
    };
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion,
    };
}

export function answerClick(id) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];

            if (state.answerState[key] === 'success') {
                return;
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === id) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            dispatch(quizSetState({ [id]: 'success' }, results));

            const timeout = window.setTimeout(() => {
                if (state.activeQuestion + 1 === state.quiz.length) {
                    dispatch(quizFinished());
                } else {
                    dispatch(state.activeQuestion + 1);
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({ [id]: 'error' }, results));
        }
    };
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY,
    };
}
