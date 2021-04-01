import React, { Component } from 'react';

class WorkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        };
    }

    onShowHideModal = () => {
        console.log("asfas");
        this.setState({
            isShowModal: !this.state.isShowModal,
        });

    }


    render() {
        return (
            <div className="work-modal" style={{
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'fixed',
                backgroundColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: this.state.isShowModal ? 'block' : 'none'
            }}>
                <div className="container" style={{
                    paddingTop: '30px',
                    backgroundColor: '#FFFFFF',
                    marginTop: '100px'
                }}>

                    <div className="pannel panel-warning">

                        <div className="pannel panel-heading">
                            <h3 className="panel-title">
                                Thêm Công Việc
                                {/* Button xóa - tắt */}
                                <span className="fa fa-times-circle text-right"></span>
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

                                    <label>Mô tả công việc: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                    />

                                    <label>Trạng thái: </label>
                                    <select
                                        className="form-control"
                                        name="status"
                                    >
                                        <option value={true}>Kích hoạt</option>
                                        <option value={false}>Ẩn</option>
                                    </select><br />

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-warning"
                                            onClick={this.onShowHideModal}
                                        >
                                            Thêm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkForm;