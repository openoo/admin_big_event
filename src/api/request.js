import axios from "axios"

const service = axios.create({
	timeout: 10000,
	baseURL: "https://big-event-vue-api-t.itheima.net",
})

service.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(resp) => {
		return resp.data
	},
	(error) => {
		return {
			data: null,
		}
	}
)

export default service
