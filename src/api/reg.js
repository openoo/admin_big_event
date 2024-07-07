import service from "./request"

export default async function reg(userInfo) {
	return await service.post("/api/reg", userInfo)
}
