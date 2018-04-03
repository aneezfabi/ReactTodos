import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Link extends Component{
    static contextTypes = {
        route:PropTypes.string,
        linkHandler:PropTypes.func
    }//consuming contexts
    handleClick = (evt) => {
        evt.preventDefault()//for no pageload
//Link comp should update the address bar
//and browser history(back button n all)
// with no reload
//so using browss history api
        /* window.history.pushState(null, '', this.props.to) */
        this.context.linkHandler(this.props.to)//above
    }
    render() {
        const activeClass = this.context.route === this.props.to ? 'active':''
        return <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired
}