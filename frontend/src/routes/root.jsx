import React from 'react';
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getGigs } from '../gigs'

export async function loader() {
    const gigs = await getGigs();
    return { gigs };
}

export default function Root() {
    const { gigs } = useLoaderData();
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
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    { gigs && gigs.length ? (
                        <ul>
                            {gigs.map((gig) => (
                                <li key={gig.id}>
                                    <Link to={`gigs/${gig.id}`}>
                                        {gig.first || gig.last ? (
                                            <>
                                                {gig.first} {gig.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {gig.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
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