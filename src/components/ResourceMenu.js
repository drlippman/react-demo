import React, { Component } from 'react';

class ResourceMenu extends Component {

  render() {
    const resourceLinks = this.props.resources.map((resource,index) =>
      <li key={index}><a href={resource.url}>{resource.title}</a></li>
    );

    return (
      <div className="dropdown">
        <div
            tabIndex="0"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="resource-menu"
            className="dropdown-toggle"
            data-toggle="dropdown"
        >
          <i className="far fa-file-alt bigicon"></i>
        </div>
        <ul id="resource-menu" role="menu" className="dropdown-menu dropdown-menu-right">
          <li className="dropdown-header">Resources</li>
          {resourceLinks}
        </ul>
      </div>
    )
  }
}

export default ResourceMenu;
