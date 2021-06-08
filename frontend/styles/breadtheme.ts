// //breadtheme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import type { GlobalStyleProps, Styles } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

// Setup our light/dark mode global defaults
const styles: Styles = {
    global: (props) => ({
        body: {
            color: mode('gray.900', 'whiteAlpha.900')(props),
            bg: mode('gray.200', 'gray.900')(props)
        }
    })
};


// Setup light/dark mode component defaults
const components = {
    Link: {
        baseStyle: (props: GlobalStyleProps) => ({
            color: mode('blue.400', 'blue.300')(props)
        })
    }
};


const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,

};

const breadTheme = extendTheme({
    config,
    styles
});

export default breadTheme;