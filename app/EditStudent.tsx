"use client";

import { useState } from "react";

type Props = {
  updateStudent: (formData: FormData) => void;
  student: {
    id: number;
    name: string;
    grade: number;
  };
};

export const EditStudent = ({ updateStudent, student }: Props) => {
  const [idToEdit, setIdToEdit] = useState<number | null>(null);
  return (
    <form action={updateStudent} className="ml-12">
      <input type="hidden" value={student.id} name="edit-id" id="edit-id" />
      {idToEdit === student.id && (
        <>
          <input
            type="text"
            id="edit-name"
            name="edit-name"
            defaultValue={student.name}
          />
          <input
            type="text"
            id="edit-grade"
            name="edit-grade"
            defaultValue={student.grade}
          />
        </>
      )}
      {idToEdit === student.id ? (
        <button type="submit">Save</button>
      ) : (
        <button type="button" onClick={() => setIdToEdit(student.id)}>
          Edit
        </button>
      )}
    </form>
  );
};
