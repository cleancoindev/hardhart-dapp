import React from 'react';

import { Button, VStack, Heading, Center, Image } from '@chakra-ui/react';
// @ts-ignore-next
import Router, { useRouter } from 'next/router';



interface IProps{}

const Error: React.FunctionComponent<IProps> = (props) => {

    const router = useRouter();

    return (
        <Center 
            width={["100vw","90vw", "90vw", "70vw"]}
            {...{
                background: "black",
                borderRadius: "2px",
            }}
        >
            <VStack spacing={8} p={10}>
                <Heading
                    as="h3"
                    {...{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "24px",
                        color: "#FFFFFF",
                    }}
                    >
                        uh oh, something went wrong -_-
                    </Heading>
                    {/* image here  */}
                    <Button
                        {...{
                            border: "1px solid #FFFFFF",
                            boxSizing: "border-box",
                            color: "#FFFFFF",
                            fontFamily: "Helvetica",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "16px"
                        }}
                        _hover={{ border: "1px solid grey" }}
                        width={350}
                        height={"56px"}
                        variant="outline"
                        onClick={(): void => {
                            router.back();
                        }}
                        >
                            Try again?
                        </Button>
            </VStack>
        </Center>
    );
};

export { Error };