(function ($w) {
    const lib = (() => {
        const customTag = (tagName, fn) => {
            document.createElement(tagName);
            const tagInstances = document.getElementsByTagName(tagName);
            for (let i = 0; i < tagInstances.length; i++) {
                fn(tagInstances[i]);
            }
        }
        const processComponents = (Components) => Components.forEach((item) => { customTag(item.name, item.render, item.action) });

        return {
            "processComponents" : processComponents
        };
    })();

    //setting window
    $w.lib = lib;

})(window);