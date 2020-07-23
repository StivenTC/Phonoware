import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectTab: this.props.location.pathname
    };
  }

  headerToggle(tab) {
    this.setState({ selectTab: tab });
  }
  render() {
    const { selectTab } = this.state;

    return (
      <nav className={`header-component`}>
        <Link to="/" onClick={() => this.headerToggle('/')} className={`selected-tab ${selectTab === '/' && 'intro'}`}>Home</Link>
        <Link to="/flow" onClick={() => this.headerToggle('/flow')} className={`selected-tab ${selectTab === '/flow' && selectTab.slice(1)}`}>Component</Link>
      </nav>
    );
  }
};

export default withRouter(Header);
