import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { SCARLET_ADDRESS } from "../const/adresses";
import { Box, Container, Flex, Heading, extendTheme } from "@chakra-ui/react";

const colors = {
    brand: {
        800: "#fwe2332",
        600: "#f12w2332",
        400: "#f24w2332",
        200: "#f2fw2332"
    }
}

const theme = extendTheme({ 
    colors: {},
    fonts: {
      body: "system-ui, sans-serif",
      heading: "Georgia, serif",
      mono: "Menlo, monospace",
    }, })

   
export function ClaimScarlet() {
const { contract } = useContract(SCARLET_ADDRESS);
const { data: metadata } = useContractMetadata(contract);

return (

    <Container maxW={"1200px"}>
<Flex direction={"column"} alignItems={"center"} justifyContent={"center"} h= {"50vh"}>
<Heading>
    Pick Scarlet to start Pimping
</Heading>
<Box borderRadius={"8px"} overflow={"hidden"} my={10}>
<MediaRenderer
src={metadata?.image}
height="300px"
width="300px"
/>

</Box>

<Web3Button
contractAddress={SCARLET_ADDRESS}
action={(contract) => contract.erc1155.claim(0, 1)}
>PIMP ME</Web3Button>

</Flex>

    </Container>
);
}