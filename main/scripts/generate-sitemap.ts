import dirTree from 'directory-tree';
import * as fs from "fs";
import { localisations } from '../src/lib/config';


let baseRoute = "/";
let excludedPaths = [
    /^\/editor\/.*$/,
    /^\/contests\/participated$/,
    /\/question\/submitted/
];

let routes: string[] = []
let date = new Date().toISOString().split('T')[0];
let domain = "https://efrog.pp.ua"

function getSitemapXML(routes: string[]) {
    let sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    sitemap += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\" >\n"
    routes.forEach(route => {
        localisations.forEach((loc)=>{
            sitemap += getSitemapUrl(loc, route);
        })
    });
    sitemap += "\n</urlset>"
    return sitemap;
}


function getSitemapUrl(lang:string, route: string) {
    let url = `<url>\n<loc>${domain}/${lang}${route}</loc>\n`;
    localisations.forEach((loc)=>{
        url += `<xhtml:link rel="alternate" hreflang="${loc}" href="${domain}/${loc}${route}" />\n`
    });
    url += `<lastmod>${date}</lastmod>\n</url>\n`;
    return url
}

function getEndpoints(tree: dirTree.DirectoryTree, route: string) {
    tree.children!.forEach(child => {
        if (child.children != undefined && child.children.length != 0) {
            if(child.name.match(/\[.*\]/)) return;

            let childRoute = route + child.name;
            if (child.children.some(e => e.name === '+page.svelte')) {
                let pageRoute = childRoute.replace(/\/\(.*\)/, "");
                if(!excludedPaths.some(e => e.test(pageRoute))) routes.push(pageRoute);
            }
            getEndpoints(child, childRoute + "/");
        }
    })
}

const tree = dirTree("./src/routes/[lang]")

getEndpoints(tree, baseRoute);

// YOUR_DOMAIN should be like https://example.com
const sitemap = getSitemapXML(routes)

// If you use the script in postbuild mode use
// For vercel deployment use:
//fs.writeFileSync('.vercel/output/static/sitemap.xml', sitemap);
// fs.writeFileSync('.svelte-kit/output/client/sitemap.xml', sitemap);

// If you use the script in prebuild mode use
fs.writeFileSync('static/sitemap.xml', sitemap);