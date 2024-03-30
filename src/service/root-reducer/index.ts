import { combineReducers } from '@reduxjs/toolkit';

import receipts from '../slices/receipts';

const rootReducer = combineReducers({ receipts });

export default rootReducer;
