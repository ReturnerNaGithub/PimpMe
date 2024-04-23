import { BasicNFTInput, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { STAKING_ADDRESS, WAGIES_ADDRESS } from "../const/adresses";
import {Text, Card, Box,Flex, Stack } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
interface EquippedProps {
    tokenId: number;
};

export const Equipped = (props: EquippedProps) => {
const address = useAddress();

const { contract: stakingContract } = useContract(STAKING_ADDRESS);
const { contract: wagiesContract } = useContract(WAGIES_ADDRESS);

const { data: nft } = useNFT(wagiesContract, props.tokenId);

const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [props.tokenId,address]
);

return(
    <Box>
{nft && (
    <Card className={styles.equipcontainer} p={5}>
<Flex>
<Box>
<MediaRenderer
src={nft.metadata.image}
height="80%"
width="80%"
/>
</Box>
<Stack spacing={1}>
    <Text fontSize={"2xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
<Text>Equipped: {ethers.utils.formatUnits(claimableRewards[0], 0)}</Text>
<Web3Button
contractAddress={STAKING_ADDRESS}
action={(contract) => contract.call("withdraw", [props.tokenId, 1])}
className={styles.unequipbutton}
>Pull Out</Web3Button>

</Stack>


</Flex>
<Box mt={5}>
<Text>Claimable PIMP:</Text>
<Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
<Web3Button 
contractAddress={STAKING_ADDRESS}
action={(contract) => contract.call("claimRewards", [props.tokenId])}
>Claim PIMP</Web3Button>

</Box>

    </Card>
)}

    </Box>
)

};