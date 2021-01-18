function truncateString(str, size) {
    return (str.length > size) ? str.substr(0, size-1) + '...' : str;
}

function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {truncateString, capitalizeString};