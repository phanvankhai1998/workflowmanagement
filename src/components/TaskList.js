import React, { Component } from 'react';
import TaskItems from './TaskItems';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1    //all : -1, active: 1, deactive: 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterName' ? value : this.state.filterStatus,
        )

        this.setState({
            [name]: value
        });

        //gọi props truyền ra ngoài

    }

    render() {
        var { tasks } = this.props;      // var tasks = this.props.tasks;

        var { filterName, filterStatus } = this.state;

        var elmTasks = tasks.map((task, index) => {
            return <TaskItems
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        });

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <table className="table table-bordered table-hover mt-15">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="text"
                                    className="form-control"
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onChange}
                                />
                            </td>
                            <td>
                                <select
                                    className="form-control"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChange}
                                >
                                    <option values={-1}>Tất cả</option>
                                    <option values={0}>Ẩn</option>
                                    <option values={1}>Kích Hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {/* <TaskItems />
                        <TaskItems />
                        <TaskItems /> */}
                        {elmTasks}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;