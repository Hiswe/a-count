import  {view, atomic} from './index';

function getAllActive() {
  return view('invoice', 'byTime', {descending: true})
}

export { getAllActive };
