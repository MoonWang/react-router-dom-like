import React, { Component } from 'react';
import ThemeContext from './context';

class Lifecycle extends React.Component {
    componentDidMount() {
      if (this.props.onMount) this.props.onMount.call(this, this);
    }
    render() {
      return null;
    }
}

export default class Redirect extends Component {
    constructor() {
        super();
    }

    render() {
        let { to } = this.props;
        return (
            <ThemeContext.Consumer>
                {
                    // context => <Lifecycle onMount = {() => context.history.push(to.pathname)} />
                    context => <Lifecycle onMount = {() => context.history.push(to)} />
                }
            </ThemeContext.Consumer>
        );
    }
}