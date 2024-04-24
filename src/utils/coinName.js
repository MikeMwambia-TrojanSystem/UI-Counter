const coinNameF = (symbol) =>(symbol ==='_BNB')?'BNB':(symbol ==='_ETH')?'Ethereum':(symbol ==='_POLY')?'Matic':undefined;

export default coinNameF;