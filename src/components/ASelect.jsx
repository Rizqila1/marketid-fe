import { Form } from "react-bootstrap";

export default function ASelect({
  id,
  label,
  name,
  value,
  handleBlur,
  handleChange,
  keyChange,
  selector,
  isError,
  msgError,
}) {
  return (
    <Form.Group className="mt-lg-0 mt-2 mb-2">
      <Form.Label htmlFor="province" className="mb-2 text-capitalize">
        {label}{" "}
      </Form.Label>
      <Form.Select
        id={id}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={(event) => handleChange(event, keyChange)}
        className={isError ? "border-danger" : "border_color"}
      >
        <option value="">Select</option>
        {selector.map((item) => (
          <option key={`province-${item.name}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      {isError && (
        <small className="text-danger paragraph__3">{msgError}</small>
      )}
    </Form.Group>
  );
}
