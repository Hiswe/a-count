import React    from 'react';
import omit     from 'lodash.omit';

var Floating = React.createClass({
  render: function () {
    let name  = this.props.name;
    let type  = this.props.type ? this.props.type : 'text';
    console.log(this.props.value)
    let value = this.props.value ? this.props.value : null;
    let input;
    if (type === 'textarea') {
      input = (<textarea name={name} id={name} value={value} />);
    } else {
      input = (<input name={name} id={name} value={value} type={type} />);
    }

    return (
      <div className="input-float">
        <label htmlFor={name}>{name}</label>
        {input}
      </div>
    );
  }
});

var Input = React.createClass({
  render: function () {
    let name  = this.props.name;
    let id    = this.props.id ? this.props.id : name;
    let label = this.props.label ? this.props.label : id;
    let type  = this.props.type ? this.props.type : 'text';
    let value = this.props.value ? this.props.value : null;
    let additionalFields = omit(this.props, ['name', 'value', 'label'])
    let input;
    if (type === 'textarea') {
      input = (<textarea name={name} id={id} value={value} />);
    } else {
      input = (<input className="field" name={name} id={id} defaultValue={value} {...additionalFields} />);
    }
    return (
      <div className="input">
        <label className="item" htmlFor={id}>{label}</label>
        {input}
      </div>
    );
  }
});

export {Floating, Input};
