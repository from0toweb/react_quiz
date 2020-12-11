import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import createControl, {
    validate,
    validateForm,
} from '../../form/formFramework';
import { addQuestion, createQuiz } from '../../_store/actions/creator';
import classes from './QuizCreator.module.css';

function createOptionControl(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number,
        },
        { required: true }
    );
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым',
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = () => {
        const quiz = [...this.props.quiz];
        const index = quiz.length + 1;

        const {
            question,
            option1,
            option2,
            option3,
            option4,
        } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { value: option1.value, id: option1.id },
                { value: option2.value, id: option2.id },
                { value: option3.value, id: option3.id },
                { value: option4.value, id: option4.id },
            ],
        };

        this.props.addQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
    };

    createQuizHandler = () => {
        this.props.createQuiz();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName];

                return (
                    <React.Fragment key={controlName + index}>
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={event =>
                                this.changeHandler(
                                    event.target.value,
                                    controlName
                                )
                            }
                        />
                        {index === 0 ? <hr /> : null}
                    </React.Fragment>
                );
            }
        );
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value,
        });
    };

    render() {
        const select = (
            <Select
                label="Выберите правильный ответ"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        );
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.creator.quiz,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: item => dispatch(addQuestion(item)),
        createQuiz: () => dispatch(createQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
