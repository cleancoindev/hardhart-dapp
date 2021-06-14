

export const truncateHash = (hash: string, length = 38) => {

    return hash.replace(hash.substring(6, length), '...');

}