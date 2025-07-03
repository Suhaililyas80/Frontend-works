// function to handle csv download

export function handleCSV(users) {
  if (!users || users.lenght === 0) return;
  // define headers
  const headers = [
    "Id",
    "Name",
    "email",
    "Email Verified",
    "Roles",
    "Creted_at",
    "Created_by",
    "Updated_at",
  ];
  const rows = users.map((user) => [
    user.id,
    user.name,
    user.email,
    user.email_verified_at ? "Yes" : "No",
    user.role_names,
    user.created_at,
    user.createdby,
    user.updated_at ?? "-",
  ]);

  // create csv text
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\r\n");
  // trigger download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.csv";
  a.click();

  URL.revokeObjectURL(url);
}
