import React, { Component } from 'react'

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: false,
        }
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? 'true' : 'false';
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        // this.props.onSubmit(this.state.name, this.state.status === "true" ? true : false);
        this.props.onSubmit(this.state);
        console.log("Submit state:", this.state);
    }

    render() {
        console.log("State of Task Form:", this.state);
        console.log("Props  of Task Form::", this.props);
        return (
            <div className="pannel panel-warning">
                <div className="pannel panel-heading">
                    <h3 className="panel-title">
                        Thêm Công Việc
                        {/* Button xóa - tắt */}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        >
                        </span>
                    </h3>
                </div>
                <div className="pannel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng thái: </label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br />
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-warning"
                            >
                                <span className="fa fa-plus mr-5"></span>Lưu lại
                            </button>&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onCloseForm}
                            >
                                <span className="fa fa-close mr-5" ></span>Hủy bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default TaskForm;
