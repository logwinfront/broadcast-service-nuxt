import { api } from '~/src/plugins/axios'

export default {
  slider: {
    getItems: (params) => api.get('/v1/slider/items/list/', { params }),
  },
}
