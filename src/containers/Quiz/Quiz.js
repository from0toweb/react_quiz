import React from 'react';
import { connect } from 'react-redux';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {
    answerClick,
    fetchQuizById,
    quizRetry,
} from '../../_store/actions/quiz';
import classes from './Quiz.module.css';

class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.quizRetry();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {this.props.loading || this.props.quiz.length === 0 ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            returnFun={this.props.quizRetry}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={
                                this.props.quiz[this.props.activeQuestion]
                                    .answers
                            }
                            question={
                                this.props.quiz[this.props.activeQuestion]
                                    .question
                            }
                            onAnswerClick={this.props.answerClick}
                            quizLength={this.props.quiz.length}
                            activeQuestion={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        answerClick: id => dispatch(answerClick(id)),
        quizRetry: () => dispatch(quizRetry()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
