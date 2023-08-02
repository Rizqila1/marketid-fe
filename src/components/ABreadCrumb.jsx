import { Breadcrumb } from "react-bootstrap";

export default function ABreadcrumb(props) {
  return (
    <Breadcrumb className="mt-5">
      {props.options.map((item, index) => (
        <Breadcrumb.Item
          key={`breadcrumb-${index}`}
          href={item.href}
          active={item.active}
        >
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
