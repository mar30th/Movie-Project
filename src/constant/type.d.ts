declare interface HttpResponse<T> {
    statusCode: number,
    message: string,
    content: T,
    dateTime: string,
    messageConstants: string,
}