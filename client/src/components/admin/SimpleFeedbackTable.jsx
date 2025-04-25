import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Inuput";

// Dummy Data
const dummyFeedbacks = [
  {
    _id: "1",
    subject: "Performance Error",
    feedback: "Great app! Really helped me organize.",
    rating: 5,
    comment: "Thank you! We're glad you're enjoying the performance.",
    createdAt: "2025-04-20T10:00:00Z",
  },
  {
    _id: "2",
    subject: "Glitch",
    feedback: "Could be better. Needs more features.",
    rating: 3,
    comment: "We're looking into this issue. Could you provide more details?",
    createdAt: "2025-04-21T08:30:00Z",
  },
  {
    _id: "3",
    subject: "Testing",
    feedback: "Love the design and usability!sdfsdfasfasfasdfasdfsadfsadf",
    rating: 4,
    comment: "",
    createdAt: "2025-04-22T15:45:00Z",
  },
  {
    _id: "4",
    subject: "Performance Errorsdfsafsafsadfsafsadfsadfasdfsdf",
    feedback: "The new update is buggy.",
    rating: 2,
    comment: "",
    createdAt: "2025-04-23T12:10:00Z",
  },
  {
    _id: "5",
    subject: "Support",
    feedback: "Excellent support and documentation.",
    rating: 5,
    comment: "",
    createdAt: "2025-04-24T09:00:00Z",
  },
];

const SimpleFeedbackTable = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minRating, setMinRating] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [sortBy, setSortBy] = useState([]);

  const filteredData = useMemo(() => {
    return dummyFeedbacks.filter((item) => {
      const lower = search.toLowerCase();
      const textMatch =
        item.subject.toLowerCase().includes(lower) ||
        item.comment.toLowerCase().includes(lower);

      const created = new Date(item.createdAt);
      const afterStart = startDate ? created >= new Date(startDate) : true;
      const beforeEnd = endDate ? created <= new Date(endDate) : true;
      const ratingMatch = minRating ? item.rating >= parseInt(minRating) : true;

      return textMatch && afterStart && beforeEnd && ratingMatch;
    });
  }, [search, startDate, endDate, minRating]);

  const paginatedData = useMemo(() => {
    const start = pageIndex * 25;
    return filteredData.slice(start, start + 25);
  }, [filteredData, pageIndex]);

  const handleDelete = (id) => {
    alert(`Deleting feedback with ID: ${id}`);
  };

  const handleView = (feedback) => {
    alert(`Feedback: ${feedback.feedback}\nRating: ${feedback.rating}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "feedback",
        header: "Feedback",
      },
      {
        accessorKey: "rating",
        header: "Rating",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        accessorKey: "comment",
        header: "Comment",
        cell: (info) => {
          const comment = info.row.original.comment;
          return comment.trim() === "" ? (
            <span className="text-yellow-600 font-medium">Pending</span>
          ) : (
            <span className="text-green-600 font-medium">Replied</span>
          );
        },
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="default" onClick={() => handleView(row.original)}>
              View
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: {
      pagination: { pageIndex, pageSize: 25 },
      sorting: sortBy,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortBy,
  });

  return (
    <div className="p-4 space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search subject or comment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Ratings</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-2 text-left cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${
                      header.column.id === "subject"
                        ? "w-[150px]"
                        : header.column.id === "feedback"
                        ? "w-[250px]"
                        : header.column.id === "rating"
                        ? "w-[80px]"
                        : header.column.id === "createdAt"
                        ? "w-[120px]"
                        : header.column.id === "comment"
                        ? "w-[100px]"
                        : header.column.id === "actions"
                        ? "w-[160px]"
                        : ""
                    }`}
                    onClick={() => {
                      const isDesc = header.column.getIsSorted() === "desc";
                      setSortBy([{ id: header.column.id, desc: !isDesc }]);
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            No feedback found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(filteredData.length / 25)}
        </span>
        <Button
          onClick={() =>
            setPageIndex((prev) =>
              prev + 1 < Math.ceil(filteredData.length / 25) ? prev + 1 : prev
            )
          }
          disabled={pageIndex + 1 >= Math.ceil(filteredData.length / 25)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SimpleFeedbackTable;
