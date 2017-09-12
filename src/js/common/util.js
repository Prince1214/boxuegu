function getSearch(key) {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split('&');
    var seachObj = {},
        tempArr;

    for (var i = 0; i < searchArr.length; i++) {
        tempArr = searchArr[i].split('=');
        seachObj[tempArr[0]] = tempArr[1];
    }
    return key ? seachObj[key] : seachObj;
}
module.exports.getSearch = getSearch;