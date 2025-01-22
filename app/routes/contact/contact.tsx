import {
  Await,
  useFetcher,
  useLoaderData,
  type ClientActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { getContact, updateContact } from "~/data";
import Skeleton from "react-loading-skeleton";
import style from "./contact.module.css";
import { Star } from "~/components/star/star";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  if (typeof params.contactId !== "string") {
    throw new Response("Not found", { status: 404 });
  }
  const contact = getContact(params.contactId);
  if (!contact) {
    throw new Response("Contact not found", { status: 404 });
  }
  return contact;
}

export async function action({ params }: ClientActionFunctionArgs) {
  if (typeof params.contactId !== "string") {
    throw new Response("Not found", { status: 404 });
  }

  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Contact not found", { status: 404 });
  }

  await updateContact(params.contactId, { favorite: !contact.favorite });
  return { ok: true };
}

export default function ContactPage() {
  const contact = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <Suspense
      fallback={
        <article className={style.contact}>
          <div className={style.contactHeader}>
            <Skeleton
              className={style.contactAvatar}
              containerClassName={style.contactAvatarContainer}
            />
            <Skeleton
              className={style.contactRow}
              containerClassName={style.contactRowContainer}
            />
            <Skeleton
              className={style.contactRow}
              containerClassName={style.contactRowContainer}
            />
          </div>
        </article>
      }
    >
      <Await resolve={contact}>
        {(contact) => {
          const isFavorite =
            fetcher.formData?.get("favorite") === "true" || contact?.favorite;

          return (
            contact && (
              <article className={style.contact}>
                <header className={style.contactHeader}>
                  <div className={style.contactAvatarContainer}>
                    <img
                      src={contact.avatar}
                      className={style.contactAvatar}
                      alt={contact.first}
                    />
                  </div>
                  <div className={style.contactRowContainer}>
                    <h4 className={style.contactName}>
                      {(contact.first || contact.last) && (
                        <span>
                          {contact.first} {contact.last}
                        </span>
                      )}
                      {isFavorite && (
                        <Star
                          className={style.contactStar}
                          onClick={() =>
                            fetcher.submit(
                              { favorite: "false" },
                              { method: "POST" },
                            )
                          }
                        />
                      )}
                    </h4>
                  </div>
                  <div className={style.contactRowContainer}>
                    {contact.twitter && (
                      <a
                        href={`https://x.com/${contact.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.contactLink}
                      >
                        {contact.twitter}
                      </a>
                    )}
                  </div>
                </header>
                <div className={style.contactMenu}>
                  <button
                    type="button"
                    onClick={() =>
                      fetcher.submit(
                        { favorite: (!isFavorite).toString() },
                        { method: "POST" },
                      )
                    }
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </div>
              </article>
            )
          );
        }}
      </Await>
    </Suspense>
  );
}
