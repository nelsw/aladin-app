import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from '../../../components/Image/Image';
import Input from '../../../components/InputControls/Input/Input';
import Button from '../../../components/InputControls/Button/Button';

class SecretKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: false,
      copied: false,
    };
  }

  onCopyHandler = () => {
    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
  };

  render() {
    const { accept, copied } = this.state;
    const { open, mnemonic } = this.props;

    return (
      <div>
        <div className="password-a mt-3 ">
          <div className=" d-block">
            <p>12 - Words Recovery Key</p>
            <textarea className="form-control" disabled="disabled">
              {mnemonic}
            </textarea>
          </div>
          <div className="pos-relative mt-3">
            <CopyToClipboard text={mnemonic} onCopy={this.onCopyHandler}>
              <a style={{ display: 'block', cursor: 'pointer' }}>
                <Image
                  src={require('../../../assets/img/copy-icon.png')}
                  className="mb-3 pos-absolute"
                />
                <span className="form-control">
                  {copied ? 'Copied' : 'Copy'} Secret Recovery Key
                </span>
              </a>
            </CopyToClipboard>
          </div>
        </div>

        <Button
          className="btn btn-primary mt-3 request_demo_send width-100"
          type="button"
          // data-toggle="modal"
          // data-target="#modalsubmitForm"
          onClick={open}
        >
          Confirm
        </Button>
      </div>
    );
  }
}
SecretKey.propTypes = {
  open: PropTypes.func,
  mnemonic: PropTypes.string,
};

export default SecretKey;
