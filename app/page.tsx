import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { EditStudent } from "./EditStudent";

export default async function Home() {
  const createStudent = async (formData: FormData) => {
    "use server";
    const rawFormData = {
      studentName: formData.get("student-name"),
      studentGrade: formData.get("student-grade"),
    };

    await prisma.student.create({
      data: {
        name: String(rawFormData.studentName),
        grade: Number(rawFormData.studentGrade),
      },
    });

    revalidatePath("/");
  };

  const deleteStudent = async (id: number) => {
    "use server";

    await prisma.student.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  };

  const updateStudent = async (formData: FormData) => {
    "use server";

    const name = formData.get("edit-name")?.toString();
    const grade = Number(formData.get("edit-grade"));
    const id = Number(formData.get("edit-id"));

    console.log({ name, grade, id });

    await prisma.student.update({
      where: {
        id,
      },
      data: {
        grade,
        name,
      },
    });

    revalidatePath("/");
  };

  const students = await prisma.student.findMany();

  return (
    <main className="flex min-h-screen gap-8 flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl font-mono text-sm lg:flex">
        <form
          name="student"
          action={createStudent}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="student-name">Student name</label>
            <input type="text" id="student-name" name="student-name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="student-grade">Student grade</label>
            <input type="text" id="student-grade" name="student-grade" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="z-10 max-w-5xl items-start justify-start font-mono text-sm lg:flex">
        <ul>
          {students.map((student) => (
            <li key={student.id} className="flex flex-row">
              <span>
                {student.name} - {student.grade}
              </span>
              <form
                action={deleteStudent.bind(null, student.id)}
                className="ml-12"
              >
                <button type="submit">Delete</button>
              </form>
              <EditStudent updateStudent={updateStudent} student={student} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
