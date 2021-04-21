(function ($w) {
    const lib = (() => {
        const renderTag = (element, cp) => {
            if (element) {
                element.innerHTML = cp.component.render();
            }
        }
        const customTag = (cp) => {
            const tagName = cp.name;
            const tagInstances = document.getElementsByTagName(tagName);
            for (let i = 0; i < tagInstances.length; i++) {
                renderTag(tagInstances[i],cp);
            }
        }
        const processComponents = (Components) => Components.forEach((cp) => { 
            customTag(cp);
            cp.controller();
            cp.action();
        });

        return {
            "processComponents" : processComponents
        };
    })();

    //setting window,
    $w.lib = lib;

})(window);