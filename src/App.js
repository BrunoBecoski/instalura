import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';


class App extends Component {
  render(store) {    
    return (
    <div id="root">
      <div className="main">
        <Header store={this.context.store} login={this.props.params.login}/>
        <Timeline login={this.props.params.login}/>
      </div>
    </div>
    );
  }
}

App.contextTypes = {
  store : React.PropTypes.object.isRequired
}

export default App;
