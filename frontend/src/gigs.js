import localforage from "localforage";
import axios from 'axios';

const artistList = 'artistList';

export async function init() {
    let response = await axios.get('/artists')
        .then(function (response) {
            // handle success
            Object.keys(response.data).forEach((key) => (
                set(key, response.data[key])
            ));
            set(artistList, Object.keys(response.data));
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error.data.error);
        });

    return response
}

export async function getGigsforArtist(id) {
    let gigs = await localforage.getItem(id);
    return gigs ?? null;
}

export async function getAllArtists() {
    let artists = await localforage.getItem(artistList);
    return artists ?? null;
}

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

function set(artist, gigs) {
    return localforage.setItem(artist, gigs);
}
