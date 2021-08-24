import React from 'react';

import SocketHelper from '../helper/SocketHelper';

const SocketContext = React.createContext(SocketHelper.getSocket());

export default SocketContext;