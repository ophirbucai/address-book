import { getContact, updateContact } from "../../data";
import {
  useFetcher,
  type ClientActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { useIsLoading } from "../../hooks/useIsLoading";
import Skeleton from "react-loading-skeleton";
import style from "./contact.module.css";
import type { Route } from "./+types/contact";
import { Star } from "../../components/star/star";

export async function loader({ params }: LoaderFunctionArgs) {
  if (typeof params.contactId !== "string") {
    throw new Response("Not found", { status: 404 });
  }
  const contact = await getContact(params.contactId);
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

export default function ContactPage({ loaderData }: Route.ComponentProps) {
  const contact = loaderData;
  const fetcher = useFetcher();
  const isFavorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  if (useIsLoading() || !contact) {
    return (
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
    );
  }
  const fullName = [contact.first, contact.last].filter(Boolean).join(" ");
  return (
    <article>
      <header className={style.contactHeader}>
        <div className={style.contactAvatarContainer}>
          <img
            src={contact.avatar}
            className={style.contactAvatar}
            alt={fullName}
          />
        </div>
        <div className={style.contactRowContainer}>
          <h4 className={style.contactName}>
            {fullName}
            {isFavorite && (
              <Star
                className={style.contactStar}
                onClick={() => 
                  fetcher.submit({ favorite: "false" }, { method: "POST" })
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
  );
}
