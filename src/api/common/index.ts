import request from '@/request'

export const uploadApi = (data: FormData) => request.post('/api/upload', data)
