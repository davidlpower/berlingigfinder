import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getGigs(query) {
    await fakeNetwork(`getGigs:${query}`);
    let gigs = await localforage.getItem("gigs");
    if (!gigs) gigs = [];
    if (query) {
        gigs = matchSorter(gigs, query, { keys: ["first", "last"] });
    }
    return gigs.sort(sortBy("last", "createdAt"));
}

export async function createGig() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let gig = { id, createdAt: Date.now() };
    let gigs = await getGigs();
    gigs.unshift(gig);
    await set(gigs);
    return gig;
}

export async function getGig(id) {
    await fakeNetwork(`gig:${id}`);
    let gigs = await localforage.getItem("gigs");
    let gig = gigs.find(gig => gig.id === id);
    return gig ?? null;
}

export async function updateGig(id, updates) {
    await fakeNetwork();
    let gigs = await localforage.getItem("gigs");
    let gig = gigs.find(gig => gig.id === id);
    if (!gig) throw new Error("No gig found for", id);
    Object.assign(gig, updates);
    await set(gigs);
    return gig;
}

export async function deleteGig(id) {
    let gigs = await localforage.getItem("gigs");
    let index = gigs.findIndex(gig => gig.id === id);
    if (index > -1) {
        gigs.splice(index, 1);
        await set(gigs);
        return true;
    }
    return false;
}

function set(gigs) {
    return localforage.setItem("gigs", gigs);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}