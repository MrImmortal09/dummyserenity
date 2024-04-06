
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESSS,MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { useEffect,useRef,useState } from 'react';
import CompanyCollectionMarketPlace from '../components/companyCollectionMarketplace';

export default function MarketPlace() {
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const [listings,setlistings] = useState([])
  const  listget = async () => {
    const listingssss = await marketplace?.directListings.getAllValid();
     setlistings(listingssss)

  }
  listget();
  


    return (
        <div >
            <div>MarketPlace</div>
            <div >
                {NFT_COLLECTION_ADDRESSS.map((company, i) =>
                    listings && <CompanyCollectionMarketPlace company={company} key={i} listings={listings}/>
                )}
            </div>
        </div>
    );
}