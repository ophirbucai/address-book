import { Await, Form, NavLink } from "react-router";
import type { ContactRecord } from "app/data";
import { Suspense } from "react";
import formStyle from "../../styles/form.module.css";
import { Star } from "../star/star";

type Props = {
  contactList: Promise<ContactRecord[]>;
};

export function Sidebar({ contactList }: Props) {
  // const navRef = useScrollPosition();
  return (
    <>
      <h1>React Router Contacts</h1>
      <div>
        <Form id="search-form" role="search">
          <input
            aria-label="Search contacts"
            id="q"
            name="q"
            placeholder="Search"
            type="search"
            className={formStyle.formInput}
          />
          <div aria-hidden hidden={true} id="search-spinner" />
        </Form>
        <Form method="post">
          <button type="submit" className={formStyle.formButton}>
            New
          </button>
        </Form>
      </div>
      <nav>
        <ul>
          <Suspense>
            <Await resolve={contactList}>
              {(contactList) =>
                contactList.map(({ id, first, last, favorite }) => (
                  <li key={id}>
                    <NavLink prefetch="intent" to={`/contacts/${id}`}>
                      {first} {last}
                      {favorite && <Star />}
                    </NavLink>
                  </li>
                ))
              }
            </Await>
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
