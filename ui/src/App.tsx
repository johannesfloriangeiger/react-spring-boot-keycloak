import React from 'react';
import './App.css';
import {action, makeObservable, observable} from "mobx";
import {observer} from "mobx-react";

export class App extends React.Component<{}> {

    message = 'Loading...';

    constructor(props: {}) {
        super(props);

        makeObservable(this, {
            message: observable,
            setMessage: action
        })

        setTimeout(() => fetch('/api/hello')
            .then(response => response.text())
            .then(message => this.setMessage(message))
            .catch(reason => {
                    if (reason.message === 'Failed to fetch') {
                        window.location.replace(`${process.env.REACT_APP_BACKEND_URL}?redirect_to=${encodeURI(window.location.href)}`);
                    } else {
                        console.error(reason);
                    }
                }
            ), 1000);
    }

    setMessage(message: string) {
        this.message = message;
    }

    render() {
        return (
            <div className="App">
                <b>Message: </b><span id='message'>{this.message}</span>
            </div>
        )
    }
}

export default observer(App);
