import React from 'react';
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getAllArtists, init } from '../gigs'

export async function loader() {
    init();
    const artists = await getAllArtists();
    return { artists };
}

export default function Root() {
    const { artists } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>Berlin Gig Finder</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">Search</button>
                    </form>
                </div>
                <nav>
                    {Object.keys(artists).length ? (
                        <ul>
                            {artists.map(artist =>
                                <li key={artist}>
                                    <Link to={`gigs/${artist}`}>
                                        <>
                                            {artist}
                                        </>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <p>
                            <i>No Gigs</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}