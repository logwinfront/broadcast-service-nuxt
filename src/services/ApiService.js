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
    item: (id) => api.get(`/v1/broadcast/${id}/`),
    listBySport: (params) => api.get(`/v1/broadcast/tournament/`, { params }),
    top: () => api.get('/v1/broadcast/top/'),
  },

  tournament: {
    list: (params) => api.get('/v1/broadcast/tournament/list/', { params }),
  },

  news: {
    list: (params) => api.get(`/v1/news/`, { params }),
    item: (slug) => api.get(`/v1/news/${slug}/`),
  },

  article: {
    list: (params) => api.get(`/v1/articles/`, { params }),
    item: (slug) => api.get(`/v1/articles/${slug}/`),
  },

  settings: {
    info: () => api.get('/v1/settings/'),
  },

  page: {
    item: (slug) => api.get(`/v1/pages/${slug}/`),
  },
}
