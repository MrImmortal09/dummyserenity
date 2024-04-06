import { useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";

import { useEffect, useState } from 'react';
import Link from "next/link";
export default function CompanyCollectionMarketPlace({ company, listings }) {
    const { contract } = useContract(company?.address);
    const [metadata, setMetadata] = useState(null);
    useEffect(() => {
        getMetaData();
    }, [contract, metadata])
    const getMetaData = async () => {
        let metadata = await contract?.metadata.get();
        setMetadata(metadata);
    }
    const stocks = listings?.filter(item=> {return (item?.assetContractAddress === company?.address) });
    stocks.length && console.log(stocks)
    // console.log(company)
    return (
        <Link
            href={`/token/${company?.address}/${stocks[0]?.tokenId}`}
            key={company}
        >
            <div >
                {metadata &&
                    <div >
                        <ThirdwebNftMedia
                            metadata={metadata}
                            height={"18vw"}
                            width={"18vw"}
                        />
                        <div >{company?.name}</div>
                        <div>
                            <div >
                                <span>Price</span>
                                <span className="currentMarketPrice">0.0002 ETH</span>
                            </div>
                            <div >
                                <span>Change</span>
                                <span>+0.00002 (10%)</span>
                            </div>
                        </div>
                    </div>
                    || <div>Loading...</div>
                }
            </div></Link>

    );
}