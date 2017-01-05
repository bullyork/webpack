import { Button, Checkbox, Popover } from 'antd';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Fetch from '../lib/fetch.ts';

console.log(new Fetch({
  prefix: 'api'
}));
ReactDOM.render(
    <Button>test</Button>,
    document.getElementById('container'),
);