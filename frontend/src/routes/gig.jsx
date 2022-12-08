import { Form } from "react-router-dom";

export default function Gig() {
    const gig = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        notes: "Some notes",
        favorite: true,
    };

    return (
        <div id="gig">
            <div>
                <img
                    key={gig.avatar}
                    src={gig.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {gig.first || gig.last ? (
                        <>
                            {gig.first} {gig.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite gig={gig} />
                </h1>

                {gig.notes && <p>{gig.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !window.confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
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