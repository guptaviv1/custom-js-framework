// utility functions
const createElement = (tagName) => {
    return document.createElement(tagName);
}

// Nav component
const NavBarComponent = {
    render: () => {
        const navEl = createElement('nav');
        const routes = [
            { path: "/create-server", name: "Create Server" },
            { path: "/view-servers", name: "View Servers" },
        ]
        routes.forEach((item) => {
            const aEl = createElement('a');
            aEl.setAttribute('router', item.path)
            aEl.innerText = item.name;
            navEl.append(aEl);
        })
        return navEl.outerHTML;
    }
};

// server form Components
const ServerFormCompnent = {
    render: () => {
        const divEl = createElement('div');
        divEl.className = 'create-server';
        const hEl = createElement('h3');
        hEl.className = 'title'
        hEl.innerText = 'Create new instance'
        divEl.append(hEl);
        const pEl = createElement('p');
        pEl.innerText = 'Machine Name'
        divEl.append(pEl);
        const input = createElement('input')
        input.type = 'text';
        input.name = 'create server';
        input.id = 'serverName';
        divEl.append(input);
        const buttonEl = createElement('button');
        buttonEl.id = 'addBtn'
        buttonEl.innerText = 'Add'
        divEl.append(buttonEl);
        console.log("divEl.outerHTML", divEl.outerHTML);
        return divEl.outerHTML;
    },
    after_render: () => {
        let serversName = [];
        if (window.localStorage.getItem("serverName")) {
            serversName = JSON.parse(window.localStorage.getItem("serverName"));
        }
        document.getElementById("addBtn").addEventListener("click", () => {
            const inputEl = document.getElementById("serverName")
            if (inputEl.value) {
                serversName.push({ name: inputEl.value });
            }
            inputEl.value = '';
            window.localStorage.setItem("serverName", JSON.stringify(serversName));
        })
    }
};

// Server List function
const ServerList = {
    render: () => {
        const divEl = createElement("div");
        const hEl = createElement('h3');
        hEl.className = 'title'
        hEl.innerText = 'Existing servers'
        divEl.append(hEl);
        const ulEl = createElement("ul");
        divEl.append(ulEl);    
        /*@Doc
        **@Thinking to insert child component, leaving this for future development
        const subNavEl = createElement("div");
        subNavEl.innerHTML = '<nav-bar></nav-bar>';
        divEl.append(subNavEl);
        */
        return divEl.outerHTML;
    },
    after_render: () => {
        const serverDetails = JSON.parse(window.localStorage.getItem("serverName")) || [];
        const getUlTag = document.getElementsByTagName("ul");
        let liElements = ""
        const li = createElement("li");
        if (serverDetails.length) {
            serverDetails.forEach((server) => {
                li.innerText = server.name;
                liElements += li.outerHTML;
            })
        } else {
            li.innerText = 'No Data';
            liElements += li.outerHTML;
        }
        getUlTag[0].innerHTML = liElements;
    }
};

// Router function
const routes = [
    { path: "/create-server", component: ServerFormCompnent },
    { path: "/view-servers", component: ServerList }
];

const rootDiv = document.getElementById("root");
const findComponentOnNav = (pathName, routes) => {
    return routes.find((r) => r.path.match(pathName)) || undefined;
}
const highlightCorrectMenuItem = pageName => {
    document
        .querySelectorAll("a")
        .forEach(nav => nav.classList.remove("active"));
    const navElement = document.querySelector(`a[router='${pageName}']`);
    navElement.classList.add("active");
};

const onRoute = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    highlightCorrectMenuItem(pathname);
    const { component } = findComponentOnNav(pathname, routes) || {};
    rootDiv.innerHTML = component.render();
    component.after_render();
}

const addClickEventOnNav = () => {
    const nav = document.querySelectorAll("a");
    nav.forEach((item) => {
        const route = item.getAttribute('router');
        item.addEventListener("click", () => {
            onRoute(route)
        })
    })
}

window.onpopstate = () => {
    onRoute(window.location.pathname);
}

// Window load configuration

window.onload = () => {
    const Components = [
        { name: "nav-bar", route: {}, component: NavBarComponent,  controller: () => {}, action: addClickEventOnNav },
        { name: "server-form-component", route: { path: "/create-server"}, component: ServerFormCompnent, controller: () => {}, action: () => {}},
        { name: "server-list", route: { path: "/view-servers" }, component: ServerList, controller: () => {}, action:() => {} }
    ];
    const Routes = [
        { path: "/create-server", component: ServerFormCompnent },
        { path: "/view-servers", component: ServerList }
    ];
    lib.processComponents(Components);
    const defaultRoute = Routes[0].path;
    onRoute(defaultRoute);
}
