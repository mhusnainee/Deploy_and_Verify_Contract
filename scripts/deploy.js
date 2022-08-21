const { ethers, run, network } = require("hardhat");


async function main() {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await contractFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract deployed to address: ${simpleStorage.address}`);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {

    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
    console.log("Congratulations! Contract is verified");

  }

  const currentNumber = await simpleStorage.retrieve();
  console.log(`Current number is: ${currentNumber}`);

  console.log("Changing number value to 434");
  const waiting = await simpleStorage.store("434");
  await waiting.wait(1);
  const newValue = await simpleStorage.retrieve();
  console.log(`New number is: ${newValue}`);
}

async function verify (contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    }
    else {
      console.log(e);
    }
  }

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});