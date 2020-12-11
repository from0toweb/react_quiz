import Axios from '../../_axios/axios-quiz';
import { ADD_QUESTION, RESET_QUIZ } from './actionTypes';

export function addQuestion(item) {
    return {
        type: ADD_QUESTION,
        item,
    };
}

export function resetQuiz() {
    return {
        type: RESET_QUIZ,
    };
}

export function createQuiz() {
    return async (dispatch, getSate) => {
        await Axios.post('/quizes.json', getSate().creator.quiz);
        dispatch(resetQuiz());
    };
}
