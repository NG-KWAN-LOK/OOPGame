var Store = function () {
    this.getPrice = function (usage) {
        console.log("usage "+usage)
        if (usage == 0) {
            return 10;
        }
        return this.getPrice(--usage) + (usage+1) * 10;
    }
}