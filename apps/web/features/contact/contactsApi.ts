import { baseApi } from '@/lib/api/baseApi';

export interface CreateContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  success: boolean;
  data: Contact[];
  message: string;
}

interface ContactResponse {
  success: boolean;
  data: Contact;
  message: string;
}

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createContact: builder.mutation<
      Contact,
      CreateContactRequest
    >({
      query: (body) => ({
        url: '/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),

    getContacts: builder.query<Contact[], void>({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),

      transformResponse: (
        response: ContactsResponse,
      ) => response.data,

      providesTags: ['Contacts'],
    }),

    getContact: builder.query<Contact, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'GET',
      }),

      transformResponse: (
        response: ContactResponse,
      ) => response.data,

      providesTags: ['Contacts'],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
} = contactsApi;