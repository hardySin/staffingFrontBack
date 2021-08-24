import React from 'react';

import SocketHelper from '../helper/SocketHelper';

// always need to check out the  create context till understand properly
const SocketContext = React.createContext(SocketHelper.getSocket());

export default SocketContext;