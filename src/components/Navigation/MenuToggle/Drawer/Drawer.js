import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BackDrop from '../../../UI/BackDrop/BackDrop';
import classes from './Drawer.module.css';

export default class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={() => this.props.menuClose()}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }
    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        let links = [{ to: '/', label: 'Список', exact: true }];

        if (this.props.isAuthenticated) {
            links.push({
                to: '/quiz-creator',
                label: 'Создать тест',
                exact: false,
            });
            links.push({
                to: '/logout',
                label: 'Выйти',
                exact: false,
            });
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: false });
        }
        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>{this.renderLinks(links)}</ul>
                </nav>
                {this.props.isOpen && (
                    <BackDrop menuClose={this.props.menuClose} />
                )}
            </>
        );
    }
}
