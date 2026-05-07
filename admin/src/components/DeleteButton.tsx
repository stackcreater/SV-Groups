"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  type: "blogs" | "projects";
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${type === "blogs" ? "blog post" : "project"}?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/${type}?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 ml-4 flex items-center"
      title="Delete"
    >
      <Trash2 className="w-4 h-4 mr-1" />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
