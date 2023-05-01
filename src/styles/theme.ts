import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: '#E8804C'
        },
        background: {
            primary: '#FFFFFF',
            secondary: '#F3F3F3',
            disabled: '#C8C8C8',
            pending: '#EDEDED',
            success: '#E0FBEC',
            error: '#FFDEDA',
            warning: '#FFECBA'
        },
        border: {
            item: '#D1D1D1'
        },
        content: {
            primary: '#454545',
            error: '#E85F4C',
            description: '#D1D1D1',
            disabled: '#9C9C9C',
            pending: '#979797',
            success: '#69C091',
            warning: '#FFB800'
        }
    }
})