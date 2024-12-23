export const wrapContract = {
    address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    abi: [
        "function balanceOf(address addr) view returns (uint256)",
        "function deposit() returns (uint256)",
        "function withdraw(uint256) returns (uint256)",
    ],
    token: {
        name: "Wrapped Ether",
        symbol: "WETH",
        decimals: 18,
    }
}