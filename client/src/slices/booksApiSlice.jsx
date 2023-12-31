import { BOOKS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: BOOKS_URL
            }),
            keepUnusedDataFor: 5
        }),
        getBookDetails: builder.query({
            query: (bookID) => ({
                url: `${BOOKS_URL}/${bookID}`
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetBooksQuery, useGetBookDetailsQuery } = booksApiSlice