"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vote } from "@/app/actions/polls";

type PollCardProps = {
    poll: {
        id: string;
        title: string;
        description: string | null;
        hasVoted: boolean;

        options: {
            id: string;
            text: string;
            _count: {
                votes: number;
            };
        }[];
    };
};

export default function PollCard({ poll }: PollCardProps) {
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const totalVotes = poll.options.reduce((total, option) => total + option._count.votes, 0);

    async function handleVote() 
    {
        if (!selectedOption) 
        {
            setMessage("Selecione uma opção");
            return;
        }

        try 
        {
            setLoading(true);
            setMessage("");

            await vote(poll.id, selectedOption);

            setMessage("Voto registrado com sucesso!");

            router.refresh();
        } 
        catch (error) 
        {
            if (error instanceof Error)
                setMessage(error.message);
            else
                setMessage("Erro ao registrar voto");
        } 
        finally 
        {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{poll.title}</h2>

            {poll.description && (<p className="mt-2 text-gray-600">{poll.description}</p>)}

            {!poll.hasVoted ? (
                <>
                    <div className="mt-4 space-y-2">
                        {poll.options.map((option) => (
                            <label
                                key={option.id}
                                className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer transition ${
                                    selectedOption === option.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`poll-${poll.id}`}
                                    value={option.id}
                                    checked={
                                        selectedOption === option.id
                                    }
                                    onChange={(event) =>
                                        setSelectedOption(
                                            event.target.value
                                        )
                                    }
                                />

                                <span>{option.text}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleVote}
                        disabled={loading}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "Votando..." : "Votar"}
                    </button>
                </>
            ) : (
                <>
                    <div className="mt-5 space-y-4">
                        {poll.options.map((option) => {
                            const percentage =
                                totalVotes === 0
                                    ? 0
                                    : (option._count.votes /
                                          totalVotes) *
                                      100;

                            return (
                                <div key={option.id}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">{option.text}</span>

                                        <span className="text-sm text-gray-500">{percentage.toFixed(0)}%</span>
                                    </div>

                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {option._count.votes}{" "}
                                        {option._count.votes === 1
                                            ? "voto"
                                            : "votos"}
                                    </p>
                                </div>
                            );
                        })}

                        <p className="text-sm text-gray-500">
                            {totalVotes}{" "}
                            {totalVotes === 1
                                ? "voto"
                                : "votos"}{" "}
                            no total
                        </p>

                        <p className="text-sm text-green-600 font-medium"> ✓ Você já votou nesta enquete</p>
                    </div>
                </>
            )}

            {message && (<p className="mt-3 text-sm text-gray-600">{message}</p>)}
        </div>
    );
}