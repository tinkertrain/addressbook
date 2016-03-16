import React, { Component } from 'react';
import gravatar from 'gravatar';

export class Gravatar extends Component {
  state = {
    url: ''
  };

  render() {
    let { email } = this.props;

    return (
      <div>
        <img src={this.state.url} alt={`Gravatar for ${email}`} />
      </div>
    );
  }

  componentWillMount() {
    let { email } = this.props;
    let url = gravatar.url(email, {s: '50', d: 'retro'}, false);

    this.setState({ url });
  }

  componentWillReceiveProps(nextProps) {
    let { email } = nextProps;
    let prevEmail = this.props.email;

    if (prevEmail !== email) {
      let url = gravatar.url(email, {s: '50', d: 'retro'}, false);

      this.setState({ url });
    }
  }
}
