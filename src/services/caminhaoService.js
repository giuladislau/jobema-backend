import caminhaoRepository from "../repositories/caminhaoRepository.js";

// lista caminhões
async function listTrucks() {
    const trucks = await caminhaoRepository.findAll();

    return trucks;
}

export default {
    listTrucks,
};