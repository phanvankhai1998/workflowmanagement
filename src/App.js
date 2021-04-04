import React, { Component } from 'react';
import Control from './components/Control';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
// import WorkForm from './components/WorkForm';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            // isShowModal: false,
            isDisplayFrom: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1,
            }
        };
        // this.showHideModal = React.createRef();
    }
    // showHideModal = () => {
    //     console.log("asfas");
    //     // this.workform.showmodel();

    // }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    onGenereteData = () => {
        var tasks = [
            {
                id: this.generateID(),
                name: 'Học lập trình',
                status: true,
            },
            {
                id: this.generateID(),
                name: 'Học chơi',
                status: false,
            },
            {
                id: this.generateID(),
                name: 'Học chạy',
                status: true,
            }
        ];
        this.setState({
            tasks: tasks
        });
        // console.log("State tasks:", this.state);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            ;
    }

    onToggleForm = () => {  //Thêm task
        if (this.state.isDisplayFrom && this.state.taskEditing !== null) {
            console.log("ths1");
            this.setState({
                isDisplayFrom: true,
                taskEditing: null,
            });
        } else {
            this.setState({
                isDisplayFrom: !this.state.isDisplayFrom,
                taskEditing: null,
            });
        }
    }

    onCloseForm = () => {
        console.log("Close Form");
        this.setState({
            isDisplayFrom: false,
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state; //tasks = this.state.tasks
        console.log("This is data: ", data);
        if (data.id === '') {
            data.id = this.generateID();
            tasks.push(data);

        } else {
            //Editing
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null,
        });
        localStorage.setItem('Tasks', JSON.stringify(tasks))
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        console.log("ID:", id);
        console.log("INDEX:", index);

        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id); //Tìm index
        if (index !== -1) {
            tasks.splice(index, 1)  //truyền vào index và số lượng phần tử muốn xóa
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onShowForm = () => {
        this.setState({
            isDisplayFrom: true
        })
    }

    onUpdate = (id) => {
        //console.log("ID:", id);//log xem có lấy đc ID hay ko

        //Tìm index
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        // console.log("onFilter", filterName, ' - ', filterStatus);
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus,
            }
        });
        // console.log(typeof filterStatus);
    }


    render() {
        var { tasks, isDisplayFrom, taskEditing, filter } = this.state;

        // console.log("State:", this.state);
        // console.log("Props:", this.props);

        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            if (filter.status)  // !== null  !== undefined !== 0
                tasks = tasks.filter((task) => {
                    if (filter.status === -1) {
                        return task;
                    } else {
                        return task.status === (filter.status === 1 ? true : false)
                    }
                });
        }

        var elmTaskForm = isDisplayFrom
            ? <TaskForm
                onCloseForm={this.onCloseForm}
                onSubmit={this.onSubmit}
                task={taskEditing}
            />
            : "";
        // var task = this.state.tasks;
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>Quản lý công việc</h1><br />
                    </div>
                    <div className="row">
                        <div className={isDisplayFrom ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                            {/* <TaskForm /> */}
                            {elmTaskForm}
                        </div>
                        <div className={isDisplayFrom ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.onToggleForm}
                            >
                                <span className="fa fa-plus mr-5"></span>
                                Thêm Công Việc
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger ml-5"
                                onClick={this.onGenereteData}
                            >
                                Generate Data
                             </button>

                            {/*Search - SORT */}
                            <Control />
                            {/* List */}
                            <TaskList
                                tasks={tasks}
                                onUpdateStatus={this.onUpdateStatus}
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
                {/*  <WorkForm /> */}
            </div>
        )
    }
}


export default App;
