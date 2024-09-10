import { api } from "./Config"

export const getAllCoins = async () => {
    try {
        let result = await api.get("/pairs")
        return result
    } catch (error: any) {
        console.log(error)
        return
    }
}
