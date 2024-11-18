import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import locationApiRequest from '@/apiRequests/location';
import bookingApiRequest from '@/apiRequests/booking';
import { BookingType, CreateBookingBodyType } from '@/schemaValidations/booking.schema';

export const useGetBookingList = () => {
    return useQuery({
        queryKey: ['booking-list'],
        queryFn: bookingApiRequest.NextClientToServerGetListBooking
    })
}

export const useAddBookingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: CreateBookingBodyType) => bookingApiRequest.NextClientToServerAddBooking(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['booking-list']
            })
        }
    })
}

export const useGetBooking = ({id,enabled}:{id:number,enabled:boolean}) => {
    return useQuery({
        queryKey: ['get-booking',id],
        queryFn: () => bookingApiRequest.NextClientToServerGetBooking(id),
        enabled
    })
}

export const useUpdateBookingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body:BookingType) => bookingApiRequest.NextClientToServerUpdateBooking(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['booking-list']
            })
        }
    })
}

export const useDeleteBookingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number) => bookingApiRequest.NextClientToServerDeleteBooking(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['booking-list']
            })
        }
    })
}

export const useGetBookingByUser = ({id,enabled}:{id:number,enabled:boolean}) => {
    return useQuery({
        queryKey: ['get-booking-user',id],
        queryFn: () => bookingApiRequest.NextClientToServerGetBookingByUser(id),
        enabled
    })
}