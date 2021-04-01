import React, { Component } from 'react'

class TaskForm extends Component {
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        console.log("State:", this.state);
        console.log("props:", this.props);
        return (
            <div className="pannel panel-warning">
                <div className="pannel panel-heading">
                    <h3 className="panel-title">
                        Thêm Công Việc
                        {/* Button xóa - tắt */}
                        <span
                            className="fa fa-times-circle text-right"

                        >
                        </span>
                    </h3>
                </div>
                <div className="pannel-body">
                    <form>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                            />
                        </div>
                        <label>Trạng thái: </label>
                        <select
                            className="form-control"
                            name="status"
                        >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
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
