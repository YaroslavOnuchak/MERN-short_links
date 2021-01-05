import React from "react";
import { Link } from "react-router-dom";

export const LinkList = ({ links }) => {
  if (!links.length) {
    return <p className="center">links not found :(</p>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>origin link</th>
            <th>short link</th>
            <th>open</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={`/detail/${link._id}`}>Open</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
