interface InternalApiResponse<T> {
    data: T
    error: string | undefined
}

export default InternalApiResponse
