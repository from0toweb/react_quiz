import React from 'react';
import { connect } from 'react-redux';
import Drawer from '../../components/Navigation/MenuToggle/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import classes from './Layout.module.css';

class Layout extends React.Component {
    state = {
        menu: false,
    };

    onToggle = () => {
        this.setState({ menu: !this.state.menu });
    };
    menuClose = () => {
        this.setState({ menu: false });
    };
    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    menuClose={this.menuClose}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle isOpen={this.state.menu} onToggle={this.onToggle} />
                <main>{this.props.children}</main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    };
}

export default connect(mapStateToProps)(Layout);
