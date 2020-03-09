import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Qrcode from 'qrcode.react';
// import Image from '../../../../components/Image/Image';

function HexCodeBarCode(props) {
  const { qrCode, hexCode, onCopy, copied } = props;
  // console.log(props);
  return (
    <div className="row pada-40">
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
        {/* <Image src={qrCode} className="d-block mx-auto" />
         */}
        <Qrcode value={hexCode} />
      </div>
      <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 mx-auto ">
        <div className="row ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card-c text-center ">
              <div className=" view-pad1  clearfix">
                <CopyToClipboard text={hexCode} onCopy={onCopy}>
                  <a
                    style={{
                      display: 'block',
                      cursor: 'pointer',
                    }}
                    title="Copy Code"
                  >
                    <div className="sub-title d-flex align-items-center justify-content-center text-center">
                      Recovery Code {copied ? 'Copied' : 'Copy'}
                      <svg
                        width="22"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        style={{
                          enableBackground: 'new 0 0 20 20',
                        }}
                        className="ml-3"
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <path
                              className="st3"
                              d="M19.2,0H5C4.3,0,4.2,0.1,4.2,0.8c0,0.5,0,1,0,1.5l0,1l-1.3,0c-0.3,0-0.6,0-0.9,0c-0.4,0-0.8,0-1.2,0
                                          C0.2,3.4,0,3.5,0,4.2v15.1C0,19.8,0.2,20,0.8,20l14.2,0c0.8,0,0.9-0.1,0.9-0.9l0-2.5l1.2,0c0.7,0,1.4,0,2.1,0
                                          c0.7,0,0.8-0.2,0.8-0.8v-15C20,0.1,19.9,0,19.2,0z M14.7,18.9H1.2V4.5h13.5V18.9z M18.8,15.5h-3l0-11.1c0-0.9-0.1-1-1-1H5.3V1.1
                                          h13.6V15.5z M4.7,15.4c2.2,0,4.3,0,6.5,0c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.1-0.2,0.1-0.4c0-0.2-0.1-0.5-0.7-0.5
                                          c-0.7,0-1.5,0-2.2,0l-1,0l-1,0c-0.3,0-0.7,0-1,0c-0.4,0-0.8,0-1.3,0c-0.4,0-0.7,0.2-0.7,0.5c0,0.2,0.1,0.3,0.2,0.4
                                          C4.3,15.3,4.5,15.4,4.7,15.4z M4.7,9.1C4.7,9.1,4.7,9.1,4.7,9.1c1.4,0,2.8,0,4.2,0l2.1,0c0.6,0,0.7-0.3,0.7-0.5
                                          c0-0.3-0.1-0.5-0.7-0.5c-0.8,0-1.6,0-2.4,0L7.9,8l-1,0C6.6,8,6.3,8,6,8C5.6,8,5.1,8,4.7,8C4.5,8,4.3,8.1,4.2,8.2
                                          C4.1,8.3,4,8.4,4,8.6C4.1,8.7,4.1,9.1,4.7,9.1z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </a>
                </CopyToClipboard>
              </div>
              <div className="view-pad  border-top qr-back-color ">
                <p className="color-red" style={{ wordBreak: 'break-all' }}>
                  {hexCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HexCodeBarCode;
