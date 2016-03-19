import React    from 'React';

var Floating = React.createClass({
  render: function () {
    let name  = this.props.name;
    let type  = this.props.type ? this.props.type : 'text';
    let value = this.props.value ? this.props.value : null;
    let input;
    if (type === 'textarea') {
      input = (<textarea name={name} id={name} value={value} />);
    } else {
      input = (<input name={name} id={name} value={value} type={type} />);
    }

    return (
      <div className="input-float">
        <label for={name}>{name}</label>
        {input}
      </div>
    );
  }
})

export {Floating as default};
