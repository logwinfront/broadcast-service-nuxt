import { api } from '~/src/plugins/axios'

export default {
  slider: {
    getItems: (params) => api.get('/v1/slider/items/list/', { params }),
  },

  sport: {
    list: (params) => api.get('/v1/broadcast/sport/list/', { params }),
    item: (slug) => api.get(`/v1/sport/${slug}/`),
  },

  broadcasts: {
    list: (params) => api.get('/v1/broadcast/list/', { params }),
  },
}
//
// getSportsList: (params) => {
//   return chainResponse(api.get("/v1/broadcast/sport/list/", { params }));
// },
//
//   getSport: (slug) => {
//   return chainResponse(api.get(`/v1/sport/${slug}/`));
// },
