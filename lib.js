//python3 -m http.server 3000
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
        });

        return {
            "processComponents" : processComponents
        };
    })();

    //setting window, python3 -m http.server 3000
    $w.lib = lib;

})(window);