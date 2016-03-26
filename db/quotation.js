import  {view, atomic}  from './index';
import  config          from '../shared/config';

function getAllActive() {
  return view('quotation', 'byTime', {descending: true})
}

export {
  getAllActive
};
