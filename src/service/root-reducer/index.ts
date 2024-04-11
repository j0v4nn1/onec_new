import { combineReducers } from '@reduxjs/toolkit';
import receipts from '../slices/receipts';
import modal from '../slices/modal';
import general from '../slices/general';

const rootReducer = combineReducers({ receipts, modal, general });

export default rootReducer;
