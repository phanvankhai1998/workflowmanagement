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
        };
        // this.showHideModal = React.createRef();
    }
    // showHideModal = () => {
    //     console.log("asfas");
    //     // this.workform.showmodel();

    // }



    componentWillMount() {
        console.log('Component will Mount');
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
        return Math.floor((1 + Math.random() * 0x10000).toString(16).substring(1));
    }

    generateID() {
        return this.s4()
            + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            + '-' + this.s4()
            ;
    }

    onToggleForm = () => {
        console.log();
        this.setState({
            isDisplayFrom: !this.state.isDisplayFrom,
        });
    }

    onCloseForm = () => {
        console.log("Close Form");
        this.setState({
            isDisplayFrom: false,
        });
    }

    render() {
        var { tasks, isDisplayFrom } = this.state;
        console.log("State:", this.state);
        console.log("Props:", this.props);
        var elmTaskForm = isDisplayFrom ? <TaskForm onCloseForm={this.onCloseForm} /> : "";
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
                            <TaskList tasks={tasks} />
                        </div>
                    </div>
                </div>
                {/*  <WorkForm /> */}
            </div>
        )
    }
}


export default App;
