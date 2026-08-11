"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createPoll(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) 
        throw new Error("Usuário não autenticado");

    const title = formData.get("title");
    const description = formData.get("description");

    const options = formData.getAll("options");

    if (typeof title !== "string" || title.trim() === "") 
        throw new Error("O título da enquete é obrigatório");

    if (typeof description !== "string" && description !== null) 
        throw new Error("Descrição inválida");

    const validOptions = options.filter(
        (option): option is string =>
            typeof option === "string" && option.trim() !== ""
    );

    if (validOptions.length < 2) 
        throw new Error("A enquete deve possuir pelo menos 2 opções");

    const poll = await prisma.poll.create({
        data: {
            title: title.trim(),
            description:
                typeof description === "string" ? description.trim() : null,

            creatorId: session.user.id,

            options: {
                create: validOptions.map((option) => ({
                    text: option.trim(),
                })),
            },
        },

        include: {
            options: true,
        },
    });

    console.log("Enquete criada:", poll);

    return;
}

export async function getPolls() {
    const polls = await prisma.poll.findMany({
        include: {
            options: true,
            creator: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return polls;
}