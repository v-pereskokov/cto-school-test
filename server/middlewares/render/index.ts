export default (function () {
    if (process.env.__DEV__) {
        return require('./hot').default;
    }

    return [require('./render').default];
})();
