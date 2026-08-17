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

    return;
}

export async function getPolls() {
    const session = await auth();

    if (!session?.user?.id)
        throw new Error("Usuário não autenticado");

    const polls = await prisma.poll.findMany({
        include: {
            options: {
                include: {
                    _count: {
                        select: {
                            votes: true,
                        },
                    },
                },
            },
            creator: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const userVotes = await prisma.vote.findMany({
        where: {
            userId: session.user.id,
        },
        select: {
            pollId: true,
        },
    });

    const votedPollIds = new Set(
        userVotes.map((vote) => vote.pollId)
    );

    return polls.map((poll) => ({
        ...poll,
        hasVoted: votedPollIds.has(poll.id),
    }));
}

export async function vote(pollId: string, optionId: string) {
    const session = await auth();

    if (!session?.user?.id) 
        throw new Error("Usuário não autenticado");

    const option = await prisma.option.findUnique({
        where: {
            id: optionId,
        },
    });

    if (!option) 
        throw new Error("Opção não encontrada");

    if (option.pollId !== pollId) 
        throw new Error("Opção inválida para esta enquete");

    const existingVote = await prisma.vote.findUnique({
        where: {
            userId_pollId: {
                userId: session.user.id,
                pollId,
            },
        },
    });

    if (existingVote) 
        throw new Error("Você já votou nesta enquete");

    const newVote = await prisma.vote.create({
        data: {
            userId: session.user.id,
            pollId,
            optionId,
        },
    });

    return newVote;
}