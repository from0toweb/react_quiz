import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import fetchQuizes from '../../_store/actions/quiz';
import classes from './QuzList.module.css';

class QuizList extends Component {
    componentDidMount() {
        this.props.fetchQuizes();
    }

    renderTests() {
        return this.props.quizes.map(test => {
            return (
                <li key={test.id}>
                    <NavLink to={'/quiz/' + test.id}>{test.name}</NavLink>
                </li>
            );
        });
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.props.loading ? (
                        <Loader />
                    ) : (
                        <ul>{this.renderTests()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
    };
}

function mapDuspatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    };
}
export default connect(mapStateToProps, mapDuspatchToProps)(QuizList);
