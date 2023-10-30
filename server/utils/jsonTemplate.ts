type Template = {
  status: "ok" | "error";
  data: object;
  message: string;
};

export default function jsonTemplate({
  status,
  data,
  message,
}: Partial<Template>) {
  return {
    status: status || "ok",
    data: data || {},
    message: message || null,
  };
}
