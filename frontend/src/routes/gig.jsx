import React from 'react';
import { Form } from "react-router-dom";

export default function Gig() {
    const gig = {
        artist: "Son Lux",
        venue: "Festsaal Kreuzberg",
        avatar: "/son_lux.jpeg",
        date: "03.06.2022",
        status: "Still on",
    };

    const favorite = true;

    return (
        <div id="gig">
            <div>
                <img class="artist-photo"
                    key={gig.avatar}
                    src={gig.avatar || null}
                />
            </div>
            <div>
                <h1>
                    {gig.artist ? (
                        <>
                            {gig.artist}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite gig={gig} />
                </h1>
                <div>
                    {gig.venue ? (
                        <>
                            <b>Venue:</b> {gig.venue}
                        </>
                    ) : (
                        <i>No Venue Set</i>
                    )}
                </div>
                <div>
                    {gig.date ? (
                        <>
                            <b>Date:</b> {gig.date}
                        </>
                    ) : (
                        <i>No Date Set</i>
                    )}
                </div>
            </div>
        </div>
    );
}

function Favorite({ gig }) {
    let favorite = gig.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}