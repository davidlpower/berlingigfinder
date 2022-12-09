import axios from 'axios';

export async function getGigs() {
    let gigs = await axios.get('/artists')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    return gigs
}

// export async function createGig() {
//     let gig = { createdAt: Date.now() };
//     return gig;
// }

// export async function getGig(id) {
//     await fakeNetwork(`gig:${id}`);
//     let gigs = await localforage.getItem("gigs");
//     let gig = gigs.find(gig => gig.id === id);
//     return gig ?? null;
// }

// export async function updateGig(id, updates) {
//     await fakeNetwork();
//     let gigs = await localforage.getItem("gigs");
//     let gig = gigs.find(gig => gig.id === id);
//     if (!gig) throw new Error("No gig found for", id);
//     Object.assign(gig, updates);
//     await set(gigs);
//     return gig;
// }

// export async function deleteGig(id) {
//     let gigs = await localforage.getItem("gigs");
//     let index = gigs.findIndex(gig => gig.id === id);
//     if (index > -1) {
//         gigs.splice(index, 1);
//         await set(gigs);
//         return true;
//     }
//     return false;
// }

// function set(gigs) {
//     return localforage.setItem("gigs", gigs);
// }
