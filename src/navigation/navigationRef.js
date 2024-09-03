import { createRef } from 'react';

const navigationRef = createRef();

const ref = () => navigationRef.current;

export default ref;
