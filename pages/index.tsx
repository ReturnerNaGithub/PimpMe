import { ConnectWallet, MediaRenderer, useAddress, useContract, useContractRead, useOwnedNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import { NextPage } from "next";
import { Container, Heading, Flex, Spinner, SimpleGrid, Card, Box, Text, Skeleton } from '@chakra-ui/react';
import { PIMP_ADDRESS, SCARLET_ADDRESS, STAKING_ADDRESS, WAGIES_ADDRESS } from "../const/adresses";
import { ClaimScarlet } from "../Components/ClaimScarlet";
import { BigNumber, ethers } from "ethers";
import MyApp from "./_app";
import { Inventory } from "../Components/Inventory";
import { Equipped } from "../Components/Equipped";
const Home: NextPage = () => {
  const address = useAddress();

  const { contract: scarletcontract } = useContract (SCARLET_ADDRESS);
  const { contract: wagiescontract } = useContract (WAGIES_ADDRESS);
  const { contract: stakingcontract } = useContract (STAKING_ADDRESS);
  const { contract: pimptokencontract } = useContract (PIMP_ADDRESS);

const {
data: ownedScarlets,
isLoading: loadingOwnedScarlets } = useOwnedNFTs(
  scarletcontract, address
);

const { data: ownedWagies, isLoading: loadingOwnedWagies } = useOwnedNFTs(wagiescontract,address);

const { data: equippedWagies } = useContractRead(
  stakingcontract,
"getStakeInfo",
[address]

);

const { data: rewardBalance } = useContractRead( pimptokencontract, "balanceOf", [address]);

  if(!address)
{
  return (
    <Container maxW={"1200px"}>
      <Flex direction={"column"} h={"100vh"} justifyContent={"center"}>
      <Heading my={"40px"}>Welcome to: Pimp Me</Heading>
      <ConnectWallet />
      </Flex>
    </Container>
  );
}



if (loadingOwnedScarlets) {
  return(
    <Container maxW={"1200px"}>
<Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
<Spinner />
</Flex>
</Container>
  );
}


if(ownedScarlets?.length === 0) {
  return (
    <Container maxW={"1200px"}>
    <ClaimScarlet />
    </Container >
  )
}

  return (
  
    <Container maxW = {"1200"}>
<SimpleGrid columns={2} spacing={10} >
<Card p={5}>
  <SimpleGrid columns={2} spacing={10}>

<Box>
  {ownedScarlets?.map((nft) => (
    <div key={nft.metadata.id}>
      <MediaRenderer 
      src={nft.metadata.image}
      height="100%"
      width="100%"
      />

    </div>
  ))}
</Box>

<Box>
<Text fontSize={"small"} fontWeight={"bold"}>$ PIMP Balance:</Text>
{rewardBalance && (
  <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
)}
</Box>

  </SimpleGrid>
</Card>
  <Card p={5}>
<Heading>Inventory:</Heading>
<Skeleton isLoaded={!loadingOwnedWagies}>
  <Inventory 
  nft={ownedWagies}
  />


</Skeleton>
  </Card>
</SimpleGrid>

<Card p={5} my={10}>
  <Heading mb={"30px"}>Equiped Wagies</Heading>
  <SimpleGrid column={3} spacing={10}>
    {equippedWagies &&
    equippedWagies[0].map((nft: BigNumber) =>(
<Equipped 
key={nft.toNumber()}
tokenId={nft.toNumber()}
/>
    ))}

  </SimpleGrid>


</Card>


    </Container>
   
  
  )
};

export default Home;
