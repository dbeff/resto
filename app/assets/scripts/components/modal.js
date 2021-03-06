import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

import FormNewFolder from "./form-new-folder";
import FormNewFolderItem from "./form-new-folder-item";

class Modal extends Component {

    constructor(props){
        super(props);

        this.state = {
            show:false,
            type: ("type" in props.modal) ? this.props.modal.type : "",
            data: ("data" in props.modal) ? this.props.modal.data : {},
            title: ("title" in props.modal) ? this.props.modal.title : "",
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.addKeyboardEvents = this.addKeyboardEvents.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.addKeyboardEvents();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show: true,
            type: nextProps.modal.type,
            data: ("data" in nextProps.modal) ? nextProps.modal.data : {},
            title: ("title" in nextProps.modal) ? nextProps.modal.title : ""
        })
    }

    addKeyboardEvents(){
        document.addEventListener("keyup",(e) => {
            if (e.keyCode == 27) {
                this.onComplete();
            }
        })
    }

    onComplete(){
        const modal = document.querySelector(".component-modal");
        const form = modal.querySelector("form");
        this.setState({show:false});
    }

    onClickClose(e){
        var hasClass = e.target.classList.contains("component-modal")
        if (hasClass) this.setState({show:false})
    }

    render() {
        var showClass = (this.state.show)? "-open": "";

        return (
            <div className={`component-modal ${showClass}`} onClick={this.onClickClose}>
                <div className="panel">
                    {(this.state.type == "newFolder" && this.state.show) ? <FormNewFolder title={this.state.title} data={this.state.data} onComplete={this.onComplete} /> : null}
                    {(this.state.type == "newFolderItem" && this.state.show) ? <FormNewFolderItem title={this.state.title} data={this.state.data} onComplete={this.onComplete} /> : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps({modal}){
    return {modal};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Modal);
