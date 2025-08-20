export default async (ms, data) => {
    return new Promise(resolve => setTimeout(() => resolve(data), ms))
}