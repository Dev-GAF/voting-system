"use client";

import { useState } from "react";
import { vote } from "@/app/actions/polls";

type PollCardProps = {
    poll: {
        id: string;
        title: string;
        description: string | null;
        options: {
            id: string;
            text: string;
        }[];
    };
};

export default function PollCard({ poll }: PollCardProps) {
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleVote() {
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

            {poll.description && (
                <p className="mt-2 text-gray-600">{poll.description}</p>
            )}

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
                            checked={selectedOption === option.id}
                            onChange={(event) =>
                                setSelectedOption(event.target.value)
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

            {message && (
                <p className="mt-3 text-sm text-gray-600">{message}</p>
            )}
        </div>
    );
}