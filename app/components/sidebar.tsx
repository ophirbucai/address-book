import { Form, Link } from "react-router";
import type { ContactRecord } from "app/data";

type Props = {
  contactList: ContactRecord[];
};

export function Sidebar({ contactList = [] }: Props) {
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
          />
          <div aria-hidden hidden={true} id="search-spinner" />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        <ul>
          {contactList.map(({ id, first, last }) => (
            <li key={id}>
              <Link to={`/contacts/${id}`}>
                {first} {last}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
