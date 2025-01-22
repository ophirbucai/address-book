import { Suspense } from "react";
import {
  Await,
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router";
import { getContacts, type ContactRecord } from "~/data";
import formStyle from "~/styles/form.module.css";
import { Star } from "~/components/star/star";
import style from "./sidebar.module.css";

export function loader() {
  return { contactList: getContacts() };
}

export default function SidebarLayout() {
  const { contactList } = useLoaderData<typeof loader>();

  return (
    <>
      <Sidebar contactList={contactList} />
      <Outlet />
    </>
  );
}

function Sidebar({ contactList }: { contactList: Promise<ContactRecord[]> }) {
  const navigate = useNavigate();
  function deselectActiveLink(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.currentTarget.ariaCurrent === "page") {
      e.preventDefault();
      navigate("/");
    }
  }

  return (
    <div className={style.sidebar}>
      <h1 className={style.sidebarTitle}>React Router Contacts</h1>
      <div className={style.sidebarActions}>
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
      <nav className={style.sidebarNavigation}>
        <ul className={style.sidebarLinks}>
          <Suspense>
            <Await resolve={contactList}>
              {(contactList) =>
                contactList.map(({ id, first, last, favorite }) => (
                  <li key={id}>
                    <NavLink
                      className={style.sidebarLink}
                      prefetch="intent"
                      to={`/contacts/${id}`}
                      onClick={deselectActiveLink}
                    >
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
      <div className={style.sidebarFooter}>
        <Link to="/about" className={style.sidebarLink}>
          About this app
        </Link>
      </div>
    </div>
  );
}
