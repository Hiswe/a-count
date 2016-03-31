import fetch from 'isomorphic-fetch'


export const FETCH_QUOTATIONS_REQUEST = 'FETCH_POSTS_REQUEST'

// export fetch_quotations_request
// { type:  }



// {
//   selectedSubreddit: 'frontend',
//   entities: {
//     users: {
//       2: {
//         id: 2,
//         name: 'Andrew'
//       }
//     },
//     posts: {
//       42: {
//         id: 42,
//         title: 'Confusion about Flux and Relay',
//         author: 2
//       },
//       100: {
//         id: 100,
//         title: 'Creating a Simple Application Using React JS and Flux Architecture',
//         author: 2
//       }
//     }
//   },
//   postsBySubreddit: {
//     frontend: {
//       isFetching: true,
//       didInvalidate: false,
//       items: []
//     },
//     reactjs: {
//       isFetching: false,
//       didInvalidate: false,
//       lastUpdated: 1439478405547,
//       items: [ 42, 100 ]
//     }
//   }
// }
