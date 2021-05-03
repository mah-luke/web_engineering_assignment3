// TODO: implement class
export function retrieve(searchParam) {
    if(searchParam in localStorage) {
        let ret = JSON.parse(localStorage[searchParam]);
        return ret;
    }
}

export function store(searchResult) {
    localStorage[searchResult.searchParam] = JSON.stringify(searchResult);
}