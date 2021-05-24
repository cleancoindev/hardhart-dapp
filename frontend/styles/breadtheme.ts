// //breadtheme.ts
import { extendTheme } from '@chakra-ui/react';


const config = {
    initialColorMode: "light",
    useSystemColorMode: false,

}

const breadTheme = extendTheme({ config })

export default breadTheme;