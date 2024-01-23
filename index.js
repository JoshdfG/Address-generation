const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Sample addresses
const addresses = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44d',
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44a',
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44b'
];


const leaves = addresses.map(address => SHA256(address));


const merkleTree = new MerkleTree(leaves, SHA256);

const merkleRoot = merkleTree.getRoot().toString('hex');

console.log('Merkle Root:', merkleRoot);

function verify(address) {
  const leaf = SHA256(address);
  const proof = merkleTree.getProof(leaf)
  return merkleTree.verify(proof, leaf, merkleRoot);
}


console.log(verify('0x742d35Cc6634C0532925a3b844Bc454e4438f440'));
console.log(verify('0x742d35Cc6634C0532925a3b844Bc454e4438f44f'));