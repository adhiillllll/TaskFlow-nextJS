import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { title, description } = body;

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },

      data: {
        title,
        description,
      },
    });

    return Response.json(updatedTask);
  } catch (error) {
    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}