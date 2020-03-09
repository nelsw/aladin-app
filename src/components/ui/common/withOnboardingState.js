import React from 'react';
import { ShellContext } from '../containers/shell-parent';

const withShellContext = Component => props => (
  <ShellContext.Consumer>
    {shellState => <Component {...shellState} {...props} />}
  </ShellContext.Consumer>
);

export { withShellContext };
