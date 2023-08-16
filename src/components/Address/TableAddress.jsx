import { Button, Table } from "react-bootstrap";

export default function TableAddress(props) {
  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length !== 0 &&
          props.data.map((address, index) => (
            <tr key={`table-${index}`}>
              <td className="w-25 fw-bold">{index + 1}</td>
              <td className="w-50 text-capitalize fw-bold">{address.name}</td>
              <td className="w-25 text-end">
                <section className="d-flex justify-content-end m-0 p-0">
                  <Button
                    variant="primary"
                    className="fw-semibold me-2"
                    style={{ width: "6rem" }}
                    onClick={() => props.handleEdit(address._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={{ width: "6rem" }}
                    className="fw-semibold"
                    onClick={() => props.handleDelete(address._id)}
                  >
                    Delete
                  </Button>
                </section>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
